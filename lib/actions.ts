"use server";

import { revalidatePath } from "next/cache";
import * as db from "./db";
import { notifyTasksChanged } from "./pubsub";

export async function getOwners() {
  return db.getOwners();
}

export async function createOwner(name: string) {
  await db.createOwner(name);
  revalidatePath("/admin");
}

export async function getLatestOwner() {
  return db.getLatestOwner();
}

export async function getTasksByOwner(ownerId: string) {
  return db.getTasksByOwnerId(ownerId);
}

export async function addTask(title: string, ownerId: string) {
  await db.createTask(title, ownerId);
  await notifyTasksChanged();
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function toggleTask(id: string, completed: boolean) {
  await db.toggleTask(id, completed);
  await notifyTasksChanged();
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteTask(id: string) {
  await db.deleteTask(id);
  await notifyTasksChanged();
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateTaskTitle(id: string, title: string) {
  await db.updateTaskTitle(id, title);
  await notifyTasksChanged();
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function tidyUp(ownerId: string) {
  await db.deleteCompletedTasks(ownerId);
  await notifyTasksChanged();
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function clearTasks(ownerId: string) {
  await db.deleteAllTasks(ownerId);
  await notifyTasksChanged();
  revalidatePath("/");
  revalidatePath("/admin");
}
