import { getLatestOwner, getTasksByOwner } from "@/lib/actions";
import { TaskList } from "@/components/task-list";
import { TaskStreamListener } from "@/components/task-stream-listener";

export default async function Home() {
  const owner = await getLatestOwner();
  const tasks = owner ? await getTasksByOwner(owner.id) : [];

  return (
    <main className="flex min-h-screen items-start justify-center p-8">
      <TaskStreamListener />
      <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-md">
        {owner ? (
          <>
            <h1 className="mb-4 text-lg font-bold text-primary">{owner.name}&apos;s Tasks</h1>
            <TaskList tasks={tasks} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No tasks yet. Add some in /admin.</p>
        )}
      </div>
    </main>
  );
}
