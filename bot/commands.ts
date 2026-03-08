import * as db from "../lib/db";
import { notifyTasksChanged } from "../lib/pubsub";

export async function handleAddTask(username: string, args: string[]): Promise<string> {
  const title = args.join(" ").trim();
  if (!title) return `@${username} Usage: !addtask <title>`;

  let owner = await db.getOwnerByName(username);
  if (!owner) owner = await db.createOwner(username);

  await db.createTask(title, owner.id);
  await notifyTasksChanged();
  return `@${username} Task added: "${title}"`;
}

export async function handleDone(username: string, args: string[]): Promise<string> {
  const position = parseInt(args[0]);
  if (isNaN(position) || position < 1) return `@${username} Usage: !done <task number>`;

  const task = await db.completeTaskByPosition(username, position);
  if (!task) return `@${username} No task at position ${position}.`;
  await notifyTasksChanged();
  return `@${username} Task ${position} marked as done!`;
}

export async function handleDelTask(username: string, args: string[]): Promise<string> {
  const position = parseInt(args[0]);
  if (isNaN(position) || position < 1) return `@${username} Usage: !deltask <task number>`;

  const task = await db.deleteTaskByPosition(username, position);
  if (!task) return `@${username} No task at position ${position}.`;
  await notifyTasksChanged();
  return `@${username} Task ${position} deleted.`;
}

export async function handleTasks(username: string): Promise<string> {
  const tasks = await db.getTasksByOwnerName(username);
  if (tasks.length === 0) return `@${username} You have no tasks. Use !addtask <title> to add one.`;

  const list = tasks
    .map((t, i) => `${i + 1}. ${t.completed ? "✓" : "○"} ${t.title}`)
    .join(" | ");
  return `@${username} Tasks: ${list}`;
}
