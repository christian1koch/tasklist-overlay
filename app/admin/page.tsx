import { getOwners, getTasksByOwner } from "@/lib/actions";
import { AdminView } from "@/components/admin-view";

type Props = {
  searchParams: Promise<{ owner?: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  const { owner: ownerId } = await searchParams;
  const owners = await getOwners();
  const selectedOwner = owners.find((o) => o.id === ownerId) ?? null;
  const tasks = selectedOwner ? await getTasksByOwner(selectedOwner.id) : [];

  return (
    <main className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-lg rounded-xl border bg-card p-4 shadow-md">
        <h1 className="mb-4 text-lg font-bold text-primary">Admin</h1>
        <AdminView owners={owners} selectedOwner={selectedOwner} tasks={tasks} />
      </div>
    </main>
  );
}
