"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Opens an SSE connection and refreshes the page whenever tasks change
export function TaskStreamListener() {
  const router = useRouter();

  useEffect(() => {
    const source = new EventSource("/api/tasks/stream");

    source.onmessage = (event) => {
      if (event.data === "tasks_changed") {
        router.refresh();
      }
    };

    return () => source.close();
  }, [router]);

  return null;
}
