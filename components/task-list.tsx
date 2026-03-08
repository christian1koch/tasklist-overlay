"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskItem } from "./task-item";

type Task = {
    id: string;
    title: string;
    completed: boolean;
    completedAt: Date | null;
    createdAt: Date;
};

type Props = {
    tasks: Task[];
};

export function TaskList({ tasks }: Props) {
    const [parent] = useAutoAnimate();

    const incomplete = tasks
        .filter((t) => !t.completed)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const completed = tasks
        .filter((t) => t.completed)
        .sort(
            (a, b) =>
                (a.completedAt?.getTime() ?? 0) -
                (b.completedAt?.getTime() ?? 0)
        );

    return (
        <div ref={parent} className="flex flex-col">
            {incomplete.map((task, i) => (
                <TaskItem key={task.id} task={task} position={i + 1} />
            ))}
            {completed.map((task) => (
                <TaskItem key={task.id} task={task} position={null} />
            ))}
        </div>
    );
}
