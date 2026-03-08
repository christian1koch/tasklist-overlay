import { TaskList } from "./task-list";

type Task = {
    id: string;
    title: string;
    completed: boolean;
    completedAt: Date | null;
    createdAt: Date;
};

type Props = {
    ownerName: string;
    tasks: Task[];
};

export function TasklistCard({ ownerName, tasks }: Props) {
    return (
        <div className="animate-in fade-in absolute right-0 bottom-0 m-10 min-h-130 w-full max-w-xs rounded-xl border bg-black/90 p-4 shadow-md duration-500">
            <h1 className="text-primary mb-4 text-center text-2xl font-bold">
                {ownerName}&apos;s Tasks
            </h1>
            <TaskList tasks={tasks} />
        </div>
    );
}
