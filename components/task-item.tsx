"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
};

export function TaskItem({ task, onToggle }: Props) {
    return (
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggle(task.id)}
                id={task.id}
                className="cursor-pointer"
            />
            <label
                htmlFor={task.id}
                className={cn(
                    "cursor-pointer text-sm leading-none font-medium",
                    task.completed &&
                        "text-muted-foreground line-through opacity-50"
                )}
            >
                {task.title}
            </label>
        </div>
    );
}
