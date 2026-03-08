import { config } from "./config";

type TwitchRefreshResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope?: string[];
};

function toOAuthToken(token: string): string {
  return token.startsWith("oauth:") ? token : `oauth:${token}`;
}

async function refreshAccessToken(): Promise<TwitchRefreshResponse> {
  const refreshToken = config.twitch.refreshToken;
  if (!refreshToken) throw new Error("TWITCH_REFRESH_TOKEN is not set");

  const body = new URLSearchParams({
    client_id: config.twitch.clientId,
    client_secret: config.twitch.clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Token refresh failed (${response.status}): ${errorBody}`);
  }

  return (await response.json()) as TwitchRefreshResponse;
}

export async function resolveTwitchIrcPassword(): Promise<string> {
  try {
    const refreshed = await refreshAccessToken();
    const expiresInMinutes = Math.floor(refreshed.expires_in / 60);
    console.log(`Refreshed Twitch access token (expires in ~${expiresInMinutes}m).`);

    if (refreshed.refresh_token && refreshed.refresh_token !== config.twitch.refreshToken) {
      console.log("Twitch returned a new refresh token. Update TWITCH_REFRESH_TOKEN in .env.");
    }

    return toOAuthToken(refreshed.access_token);
  } catch (error) {
    const oauthToken = config.twitch.oauthToken;
    if (!oauthToken) throw error;

    console.warn("Could not refresh token, falling back to TWITCH_OAUTH_TOKEN.");
    return toOAuthToken(oauthToken);
  }
}
