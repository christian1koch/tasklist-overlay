import { listenForTaskChanges } from "@/lib/pubsub";

export async function GET() {
  let closed = false;
  const stream = new ReadableStream({
    async start(controller) {
      const encode = (data: string) => new TextEncoder().encode(`data: ${data}\n\n`);

      // Tell the client the connection is established
      controller.enqueue(encode("connected"));

      // Subscribe to Postgres NOTIFY — fires whenever tasks change
      const cleanup = await listenForTaskChanges(() => {
        if (!closed) controller.enqueue(encode("tasks_changed"));
      });

      // Keep-alive ping every 30s to prevent the connection from dropping
      const interval = setInterval(() => {
        if (!closed) controller.enqueue(encode("ping"));
      }, 30000);

      // Called when the client disconnects
      return () => {
        closed = true;
        clearInterval(interval);
        cleanup();
      };
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
