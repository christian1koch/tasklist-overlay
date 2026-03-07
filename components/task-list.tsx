import { TaskItem } from "./task-item";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
};

export function TaskList({ tasks }: Props) {
  const sorted = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="flex flex-col gap-1">
      {sorted.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
