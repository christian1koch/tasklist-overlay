import prisma from "./prisma";
import { notifyTasksChanged } from "./pubsub";

// Owners
export async function getOwners() {
  return prisma.owner.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getOwnerByName(name: string) {
  return prisma.owner.findUnique({ where: { name } });
}

export async function getLatestOwner() {
  const task = await prisma.task.findFirst({
    orderBy: { createdAt: "desc" },
    include: { owner: true },
  });
  return task?.owner ?? null;
}

export async function createOwner(name: string) {
  return prisma.owner.create({ data: { name } });
}

// Tasks
export async function getTasksByOwnerId(ownerId: string) {
  return prisma.task.findMany({
    where: { ownerId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getTasksByOwnerName(name: string) {
  return prisma.task.findMany({
    where: { owner: { name } },
    orderBy: { createdAt: "asc" },
  });
}

export async function createTask(title: string, ownerId: string) {
  return prisma.task.create({ data: { title, ownerId } });
}

export async function updateTaskTitle(id: string, title: string) {
  return prisma.task.update({ where: { id }, data: { title } });
}

// TODO: add !undone/!unfinished bot command — looks up by position among completed tasks, calls toggleTask(id, false)
export async function toggleTask(id: string, completed: boolean) {
  return prisma.task.update({
    where: { id },
    data: { completed, completedAt: completed ? new Date() : null },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}

export async function deleteCompletedTasks(ownerId: string) {
  return prisma.task.deleteMany({ where: { ownerId, completed: true } });
}

export async function deleteAllTasks(ownerId: string) {
  return prisma.task.deleteMany({ where: { ownerId } });
}

export async function completeTaskByPosition(ownerName: string, position: number) {
  const incompleteTasks = await prisma.task.findMany({
    where: { owner: { name: ownerName }, completed: false },
    orderBy: { createdAt: "asc" },
  });
  const task = incompleteTasks[position - 1];
  if (!task) return null;
  return prisma.task.update({
    where: { id: task.id },
    data: { completed: true, completedAt: new Date() },
  });
}

export async function deleteTaskByPosition(ownerName: string, position: number) {
  const incompleteTasks = await prisma.task.findMany({
    where: { owner: { name: ownerName }, completed: false },
    orderBy: { createdAt: "asc" },
  });
  const task = incompleteTasks[position - 1];
  if (!task) return null;
  return prisma.task.delete({ where: { id: task.id } });
}
