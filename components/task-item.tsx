import { cn } from "@/lib/utils";

type Props = {
    task: {
        id: string;
        title: string;
        completed: boolean;
    };
    position: number | null;
};

export function TaskItem({ task, position }: Props) {
    return (
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-xl">
            <span className="text-primary w-4 text-right font-bold">
                {position ?? ""}
            </span>
            <span
                className={cn(
                    "flex-1 text-lg leading-none font-medium",
                    task.completed && "text-pink-200 line-through opacity-50"
                )}
            >
                {task.title}
            </span>
        </div>
    );
}
