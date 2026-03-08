import { getLatestOwner, getTasksByOwner } from "@/lib/actions";
import { TaskStreamListener } from "@/components/task-stream-listener";
import { TasklistCard } from "@/components/tasklist-card";

export default async function Home() {
    const owner = await getLatestOwner();
    const tasks = owner ? await getTasksByOwner(owner.id) : [];

    return (
        <main className="flex aspect-video w-screen items-start justify-center p-8">
            <TaskStreamListener />
            {owner && <TasklistCard ownerName={owner.name} tasks={tasks} />}
        </main>
    );
}
