"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export async function getTasks() {
  return prisma.task.findMany({ orderBy: { createdAt: "asc" } });
}

export async function addTask(title: string) {
  await prisma.task.create({ data: { title } });
  revalidatePath("/");
}

export async function toggleTask(id: string, completed: boolean) {
  await prisma.task.update({ where: { id }, data: { completed } });
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id } });
  revalidatePath("/");
}

export async function updateTaskTitle(id: string, title: string) {
  await prisma.task.update({ where: { id }, data: { title } });
  revalidatePath("/");
}
