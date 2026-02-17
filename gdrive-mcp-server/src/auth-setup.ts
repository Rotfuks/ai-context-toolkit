/**
 * One-time OAuth consent flow.
 * Run this on the host machine (not in the container) to authenticate:
 *   npm run auth-setup
 *
 * It will:
 * 1. Read credentials.json from ~/.config/gdrive-mcp/
 * 2. Open your browser for Google consent
 * 3. Listen on localhost for the redirect
 * 4. Save tokens to ~/.config/gdrive-mcp/tokens.json
 */
import { google } from "googleapis";
import http from "node:http";
import { URL } from "node:url";
import { loadCredentials, saveTokens, SCOPES, CONFIG_DIR } from "./auth.js";
import fs from "node:fs/promises";

async function main() {
  console.log(`\nGoogle Drive MCP — OAuth Setup`);
  console.log(`Config directory: ${CONFIG_DIR}\n`);

  // Verify credentials file exists
  try {
    await fs.access(`${CONFIG_DIR}/credentials.json`);
  } catch {
    console.error(
      `Error: credentials.json not found in ${CONFIG_DIR}\n` +
        `\nTo set up:\n` +
        `  1. Go to https://console.cloud.google.com/apis/credentials\n` +
        `  2. Create an OAuth 2.0 Client ID (Desktop app type)\n` +
        `  3. Download the JSON and save it as ${CONFIG_DIR}/credentials.json\n` +
        `  4. Make sure Google Drive API is enabled for your project\n`
    );
    process.exit(1);
  }

  const { clientId, clientSecret } = await loadCredentials();
  const redirectUri = "http://localhost:3000/callback";

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // Always show consent to get refresh_token
  });

  // Start a local server to catch the redirect
  const server = http.createServer(async (req, res) => {
    if (!req.url?.startsWith("/callback")) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const url = new URL(req.url, "http://localhost:3000");
    const code = url.searchParams.get("code");

    if (!code) {
      res.writeHead(400);
      res.end("No authorization code received");
      return;
    }

    try {
      const { tokens } = await oauth2Client.getToken(code);
      await saveTokens(tokens);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<html><body><h2>Authentication successful!</h2>" +
          "<p>You can close this tab and return to your terminal.</p></body></html>"
      );

      console.log("\nAuthentication successful!");
      console.log(`Tokens saved to ${CONFIG_DIR}/tokens.json`);
      console.log(
        "\nYou can now build and run the MCP server container."
      );

      // Give the response time to send, then shut down
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 500);
    } catch (err) {
      res.writeHead(500);
      res.end("Error exchanging authorization code");
      console.error("Token exchange failed:", err);
    }
  });

  server.listen(3000, () => {
    console.log("Opening browser for Google consent...\n");
    console.log(`If the browser doesn't open, visit:\n${authUrl}\n`);

    // Open browser (works on macOS, Linux, Windows)
    const openCmd =
      process.platform === "darwin"
        ? "open"
        : process.platform === "win32"
          ? "start"
          : "xdg-open";

    import("node:child_process").then(({ exec }) => {
      exec(`${openCmd} "${authUrl}"`);
    });
  });
}

main().catch((err) => {
  console.error("Auth setup failed:", err);
  process.exit(1);
});
