"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { TaskList } from "@/components/task-list";

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Set up overlay layout", completed: false },
  { id: "2", title: "Connect to Twitch API", completed: false },
  { id: "3", title: "Add task persistence", completed: false },
  { id: "4", title: "Build Twitch bot commands", completed: false },
  { id: "5", title: "Deploy to production", completed: true },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleToggle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <main className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-md">
        <h1 className="mb-4 text-lg font-bold text-primary">Stream Tasks</h1>
        <TaskList tasks={tasks} onToggle={handleToggle} />
      </div>
    </main>
  );
}
