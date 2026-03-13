import { LiveChat } from "youtube-chat";
import { config } from "./config";
import { handleAddTask, handleDone, handleDelTask, handleTasks, handleTidyUp, handleClear } from "./commands";

function getMessageText(message: Array<{ text?: string }>): string {
  return message.map((item) => item.text ?? "").join("");
}

export async function startYouTubeBot() {
  const channelId = config.youtube.channelId;
  if (!channelId) return;

  const liveChat = new LiveChat({ channelId });

  liveChat.on("start", (liveId) => {
    console.log(`YouTube bot connected to live stream: ${liveId}`);
  });

  liveChat.on("end", (reason) => {
    console.log(`YouTube live stream ended: ${reason ?? "unknown"}`);
  });

  liveChat.on("error", (err) => {
    console.error("YouTube bot error:", err);
  });

  liveChat.on("chat", async (chatItem) => {
    const username = chatItem.author.name;
    const text = getMessageText(chatItem.message as Array<{ text?: string }>);
    const [command, ...args] = text.trim().split(/\s+/);

    switch (command.toLowerCase()) {
      case "!addtask":
        await handleAddTask(username, args);
        break;
      case "!done":
        await handleDone(username, args);
        break;
      case "!deltask":
        await handleDelTask(username, args);
        break;
      case "!tasks":
        await handleTasks(username);
        break;
      case "!tidyup":
        await handleTidyUp(username);
        break;
      case "!clear":
        await handleClear(username);
        break;
    }
  });

  const ok = await liveChat.start();
  if (!ok) {
    console.error("YouTube bot: failed to start — channel may not be live.");
  }
}
