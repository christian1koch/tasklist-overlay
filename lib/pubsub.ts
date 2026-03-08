import { Client } from "pg";
import { requireEnv } from "./utils";

const CHANNEL = "tasks_changed";

export async function notifyTasksChanged() {
  const client = new Client({ connectionString: requireEnv("DATABASE_URL") });
  await client.connect();
  await client.query(`NOTIFY ${CHANNEL}`);
  await client.end();
}

export async function listenForTaskChanges(onNotify: () => void): Promise<() => void> {
  const client = new Client({ connectionString: requireEnv("DATABASE_URL") });
  await client.connect();
  await client.query(`LISTEN ${CHANNEL}`);
  client.on("notification", onNotify);

  return async () => {
    await client.end();
  };
}
