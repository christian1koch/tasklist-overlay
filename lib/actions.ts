"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export async function getOwners() {
  return prisma.owner.findMany({ orderBy: { createdAt: "asc" } });
}

export async function createOwner(name: string) {
  await prisma.owner.create({ data: { name } });
  revalidatePath("/admin");
}

export async function getLatestOwner() {
  const task = await prisma.task.findFirst({
    orderBy: { createdAt: "desc" },
    include: { owner: true },
  });
  return task?.owner ?? null;
}

export async function getTasksByOwner(ownerId: string) {
  return prisma.task.findMany({
    where: { ownerId },
    orderBy: { createdAt: "asc" },
  });
}

export async function addTask(title: string, ownerId: string) {
  await prisma.task.create({ data: { title, ownerId } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function toggleTask(id: string, completed: boolean) {
  await prisma.task.update({ where: { id }, data: { completed } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateTaskTitle(id: string, title: string) {
  await prisma.task.update({ where: { id }, data: { title } });
  revalidatePath("/");
  revalidatePath("/admin");
}
