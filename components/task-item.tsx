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
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <span className="text-primary w-4 text-right text-sm font-bold">
                {position ?? ""}
            </span>
            <span
                className={cn(
                    "flex-1 text-sm leading-none font-medium",
                    task.completed &&
                        "text-muted-foreground line-through opacity-50"
                )}
            >
                {task.title}
            </span>
        </div>
    );
}
