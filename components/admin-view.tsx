"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addTask, createOwner } from "@/lib/actions";
import { TaskList } from "./task-list";

type Owner = { id: string; name: string };
type Task = { id: string; title: string; completed: boolean };

type Props = {
  owners: Owner[];
  selectedOwner: Owner | null;
  tasks: Task[];
};

export function AdminView({ owners, selectedOwner, tasks }: Props) {
  const router = useRouter();
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newTask, setNewTask] = useState("");

  function selectOwner(id: string) {
    router.push(`/admin?owner=${id}`);
  }

  async function handleNewOwner(e: React.FormEvent) {
    e.preventDefault();
    if (newOwnerName.trim()) {
      await createOwner(newOwnerName.trim());
      setNewOwnerName("");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Owner selector */}
      <div className="flex flex-wrap gap-2">
        {owners.map((o) => (
          <button
            key={o.id}
            onClick={() => selectOwner(o.id)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              o.id === selectedOwner?.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary/20"
            }`}
          >
            {o.name}
          </button>
        ))}
        <form onSubmit={handleNewOwner} className="flex gap-1">
          <input
            value={newOwnerName}
            onChange={(e) => setNewOwnerName(e.target.value)}
            placeholder="New owner..."
            className="w-28 rounded-full border bg-background px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
          >
            +
          </button>
        </form>
      </div>

      {/* Task list for selected owner */}
      {selectedOwner ? (
        <>
          <TaskList tasks={tasks} />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (newTask.trim() && selectedOwner) {
                await addTask(newTask.trim(), selectedOwner.id);
                setNewTask("");
              }
            }}
            className="flex gap-2"
          >
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a task..."
              className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              Add
            </button>
          </form>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Select or create an owner above.</p>
      )}
    </div>
  );
}
