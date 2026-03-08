import "dotenv/config";
import tmi from "tmi.js";
import { config } from "./config";
import { handleAddTask, handleDone, handleDelTask, handleTasks, handleTidyUp, handleClear } from "./commands";
import { resolveTwitchIrcPassword } from "./twitch-auth";

async function main() {
  const password = await resolveTwitchIrcPassword();

  const client = new tmi.Client({
    identity: {
      username: config.twitch.botUsername,
      password,
    },
    channels: [config.twitch.channel],
  });

  client.on("message", async (channel, tags, message, self) => {
    if (self) return;

    const username = tags.username!;
    const [command, ...args] = message.trim().split(/\s+/);

    let response: string | null = null;

    switch (command.toLowerCase()) {
      case "!addtask":
        response = await handleAddTask(username, args);
        break;
      case "!done":
        response = await handleDone(username, args);
        break;
      case "!deltask":
        response = await handleDelTask(username, args);
        break;
      case "!tasks":
        response = await handleTasks(username);
        break;
      case "!tidyup":
        response = await handleTidyUp(username);
        break;
      case "!clear":
        response = await handleClear(username);
        break;
    }

    if (response) client.say(channel, response);
  });

  client.on("connected", (addr, port) => {
    console.log(`Bot connected to ${addr}:${port}`);
    console.log(`Listening in #${config.twitch.channel}`);
  });

  await client.connect();
}

main().catch((error) => {
  console.error("Bot failed to start:", error);
  process.exitCode = 1;
});
