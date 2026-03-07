"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toggleTask, deleteTask, updateTaskTitle } from "@/lib/actions";

type Props = {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
};

export function TaskItem({ task }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  async function handleTitleSubmit() {
    if (title.trim() && title !== task.title) {
      await updateTaskTitle(task.id, title.trim());
    } else {
      setTitle(task.title);
    }
    setEditing(false);
  }

  return (
    <div className="group flex items-center gap-3 rounded-md px-3 py-2">
      <Checkbox
        checked={task.completed}
        onCheckedChange={(checked) => toggleTask(task.id, !!checked)}
        id={task.id}
        className="cursor-pointer"
      />
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTitleSubmit();
            if (e.key === "Escape") { setTitle(task.title); setEditing(false); }
          }}
          className="flex-1 bg-transparent text-sm font-medium outline-none"
        />
      ) : (
        <span
          onClick={() => !task.completed && setEditing(true)}
          className={cn(
            "flex-1 cursor-pointer text-sm font-medium leading-none",
            task.completed && "text-muted-foreground line-through opacity-50"
          )}
        >
          {task.title}
        </span>
      )}
      <button
        onClick={() => deleteTask(task.id)}
        className="invisible text-muted-foreground hover:text-destructive group-hover:visible"
      >
        ✕
      </button>
    </div>
  );
}
