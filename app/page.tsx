import { getTasks, addTask } from "@/lib/actions";
import { TaskList } from "@/components/task-list";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-md">
        <h1 className="mb-4 text-lg font-bold text-primary">Stream Tasks</h1>
        <TaskList tasks={tasks} />
        <form
          action={async (formData) => {
            "use server";
            const title = formData.get("title") as string;
            if (title?.trim()) await addTask(title.trim());
          }}
          className="mt-3 flex gap-2"
        >
          <input
            name="title"
            placeholder="Add a task..."
            className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
