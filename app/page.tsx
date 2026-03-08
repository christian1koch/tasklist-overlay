import { getLatestOwner, getTasksByOwner } from "@/lib/actions";
import { TaskList } from "@/components/task-list";
import { TaskStreamListener } from "@/components/task-stream-listener";

export default async function Home() {
    const owner = await getLatestOwner();
    const tasks = owner ? await getTasksByOwner(owner.id) : [];

    return (
        <main className="flex aspect-video w-screen items-start justify-center p-8">
            <TaskStreamListener />
            <div className="absolute right-0 bottom-0 m-10 w-full max-w-xs rounded-xl border bg-black/90 p-4 shadow-md">
                {owner ? (
                    <>
                        <h1 className="text-primary mb-4 text-center text-2xl font-bold">
                            {owner.name}&apos;s Tasks
                        </h1>
                        <TaskList tasks={tasks} />
                    </>
                ) : (
                    <p className="text-muted-foreground text-xl">
                        No tasks yet. Add some in /admin.
                    </p>
                )}
            </div>
        </main>
    );
}
