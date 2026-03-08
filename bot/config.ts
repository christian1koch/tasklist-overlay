import "dotenv/config";
import { optionalEnv, requireEnv } from "../lib/utils";

export const config = {
  twitch: {
    botUsername: requireEnv("TWITCH_BOT_USERNAME"),
    oauthToken: optionalEnv("TWITCH_OAUTH_TOKEN"),
    channel: requireEnv("TWITCH_CHANNEL"),
    clientId: requireEnv("TWITCH_CLIENT_ID"),
    clientSecret: requireEnv("TWITCH_CLIENT_SECRET"),
    refreshToken: optionalEnv("TWITCH_REFRESH_TOKEN"),
  },
};
