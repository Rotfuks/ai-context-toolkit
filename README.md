# GitHub AI Toolkit

A collection of AI-assisted workflows, Cursor commands, and context documents for working with GitHub APIs, generating reports, and creating content.

## What's in here

| Directory | What it does |
|-----------|-------------|
| `.cursor/commands/` | Cursor slash commands for GitHub reports, issue creation, LinkedIn posts, and more |
| `.cursor/skills/` | Cursor agent skills for Google Drive integration (MCP + rclone) |
| `context/` | Reference materials and prompt engineering context (GitHub API guide, one-pager creation, talk abstract creation) |
| `issue-report-app/` | TypeScript app that generates issue reports from GitHub Projects (Node + React) |
| `gdrive-mcp-server/` | Custom MCP server for reading Google Drive files (Docs, Sheets, PDFs, images) |
| `workbench/` | Gitignored scratch space for session artifacts and temporary files |

## Cursor Commands

- **my-issues-report** — Report of all open GitHub issues assigned to me
- **issue-pings-report** — Unanswered GitHub mentions/pings
- **alerts-report** — Alerts summary from a Google Drive document
- **platform-area-report** — Meeting notes summary from Google Drive
- **create-issue** — Guided issue creation with quality checklist
- **linkedin-post** — LinkedIn ghostwriter with voice cloning

## Getting Started

### Issue Report App
```bash
cd issue-report-app
cp env.example .env  # add your GitHub token
./start.sh
```

### Google Drive MCP Server
```bash
cd gdrive-mcp-server
npm run auth-setup   # one-time OAuth flow
npm run build && npm start
```

See each subdirectory's README for detailed setup.

## License

MIT
