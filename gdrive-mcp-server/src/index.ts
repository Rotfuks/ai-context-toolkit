import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { searchSchema, searchTool } from "./tools/search.js";
import { listFolderSchema, listFolderTool } from "./tools/list-folder.js";
import { readFileSchema, readFileTool } from "./tools/read-file.js";

const server = new McpServer({
  name: "gdrive-mcp",
  version: "1.0.0",
});

// Register tools
server.tool(
  "search",
  "Search for files and folders in Google Drive by name or content. Returns file names, IDs, types, parent folders, and modification dates.",
  searchSchema,
  async (args) => searchTool(args)
);

server.tool(
  "list_folder",
  "List the contents of a Google Drive folder. Defaults to root if no folder ID is given. Returns file names, IDs, types, parent folders, and modification dates.",
  listFolderSchema,
  async (args) => listFolderTool(args)
);

server.tool(
  "read_file",
  "Read the content of a file from Google Drive. Supports Google Docs (text), Sheets (CSV), Slides (text), PDFs (extracted text), images (visual), and text/code files. Videos and unsupported binary files return a Drive link instead.",
  readFileSchema,
  async (args) => readFileTool(args)
);

// Connect via stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});
