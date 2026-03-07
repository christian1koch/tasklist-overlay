"use client";

import { Task } from "@/lib/types";
import { TaskItem } from "./task-item";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
};

export function TaskList({ tasks, onToggle }: Props) {
  const sorted = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="flex flex-col gap-1">
      {sorted.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
}
