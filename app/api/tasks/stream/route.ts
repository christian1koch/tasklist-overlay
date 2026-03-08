import { listenForTaskChanges } from "@/lib/pubsub";

export async function GET() {
  const encode = (data: string) => new TextEncoder().encode(`data: ${data}\n\n`);
  let cleanup: (() => void) | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    async start(controller) {
      // Tell the client the connection is established
      controller.enqueue(encode("connected"));

      // Subscribe to Postgres NOTIFY — fires whenever tasks change
      cleanup = await listenForTaskChanges(() => {
        controller.enqueue(encode("tasks_changed"));
      });

      // Keep-alive ping every 30s to prevent the connection from dropping
      interval = setInterval(() => {
        controller.enqueue(encode("ping"));
      }, 30000);
    },

    // Called when the client disconnects
    cancel() {
      if (interval) clearInterval(interval);
      if (cleanup) cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
