import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import fs from "node:fs/promises";
import path from "node:path";

// In the container, credentials are mounted at /config/
// On the host (auth-setup), they live in ~/.config/gdrive-mcp/
const CONFIG_DIR =
  process.env.GDRIVE_MCP_CONFIG_DIR ??
  (process.env.CONTAINER === "true"
    ? "/config"
    : path.join(
        process.env.HOME ?? process.env.USERPROFILE ?? ".",
        ".config",
        "gdrive-mcp"
      ));

const CREDENTIALS_PATH = path.join(CONFIG_DIR, "credentials.json");
const TOKENS_PATH = path.join(CONFIG_DIR, "tokens.json");

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

interface Credentials {
  installed?: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
  web?: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

interface Tokens {
  access_token?: string | null;
  refresh_token?: string | null;
  scope?: string;
  token_type?: string | null;
  expiry_date?: number | null;
  id_token?: string | null;
}

async function loadCredentials(): Promise<{
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}> {
  const raw = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  const creds: Credentials = JSON.parse(raw);

  const config = creds.installed ?? creds.web;
  if (!config) {
    throw new Error(
      "credentials.json must contain an 'installed' or 'web' key"
    );
  }

  return {
    clientId: config.client_id,
    clientSecret: config.client_secret,
    redirectUri: config.redirect_uris?.[0] ?? "http://localhost:3000/callback",
  };
}

async function loadTokens(): Promise<Tokens | null> {
  try {
    const raw = await fs.readFile(TOKENS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveTokens(tokens: Tokens): Promise<void> {
  await fs.mkdir(path.dirname(TOKENS_PATH), { recursive: true });
  await fs.writeFile(TOKENS_PATH, JSON.stringify(tokens, null, 2));
}

/**
 * Creates an authenticated OAuth2 client for Google Drive API.
 * Reads credentials and tokens from the config directory.
 * Automatically refreshes expired access tokens.
 */
export async function getAuthenticatedClient(): Promise<OAuth2Client> {
  const { clientId, clientSecret, redirectUri } = await loadCredentials();

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  const tokens = await loadTokens();
  if (!tokens?.refresh_token) {
    throw new Error(
      "No tokens found. Run 'npm run auth-setup' on the host to authenticate first."
    );
  }

  oauth2Client.setCredentials(tokens);

  // Listen for token refresh events to persist updated tokens
  oauth2Client.on("tokens", async (newTokens) => {
    const merged = { ...tokens, ...newTokens };
    await saveTokens(merged);
  });

  return oauth2Client;
}

/**
 * Returns an authenticated Google Drive API v3 client.
 */
export async function getDriveClient() {
  const auth = await getAuthenticatedClient();
  return google.drive({ version: "v3", auth });
}

// Exported for auth-setup script
export {
  loadCredentials,
  saveTokens,
  SCOPES,
  CONFIG_DIR,
  CREDENTIALS_PATH,
  TOKENS_PATH,
};
