import { z } from "zod";
import { getDriveClient } from "../auth.js";
import { resolveParentNames, formatFileList } from "./shared.js";

export const searchSchema = {
  query: z.string().describe("Search query (uses Google Drive search syntax, e.g. name contains 'report')"),
  pageSize: z.number().min(1).max(100).optional().default(20).describe("Number of results to return (max 100)"),
  pageToken: z.string().optional().describe("Token for fetching the next page of results"),
};

export async function searchTool(args: {
  query: string;
  pageSize?: number;
  pageToken?: string;
}) {
  const drive = await getDriveClient();

  const res = await drive.files.list({
    q: `${args.query} and trashed = false`,
    pageSize: args.pageSize ?? 20,
    pageToken: args.pageToken,
    fields:
      "nextPageToken, files(id, name, mimeType, modifiedTime, parents, size)",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
  });

  const files = res.data.files ?? [];
  const filesWithParents = await resolveParentNames(drive, files);
  const text = formatFileList(filesWithParents, res.data.nextPageToken);

  return {
    content: [{ type: "text" as const, text }],
  };
}
