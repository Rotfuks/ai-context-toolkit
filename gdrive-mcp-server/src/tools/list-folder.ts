import { z } from "zod";
import { getDriveClient } from "../auth.js";
import { resolveParentNames, formatFileList } from "./shared.js";

export const listFolderSchema = {
  folderId: z.string().optional().default("root").describe("Folder ID to list (defaults to root)"),
  pageSize: z.number().min(1).max(100).optional().default(20).describe("Number of results to return (max 100)"),
  pageToken: z.string().optional().describe("Token for fetching the next page of results"),
};

export async function listFolderTool(args: {
  folderId?: string;
  pageSize?: number;
  pageToken?: string;
}) {
  const drive = await getDriveClient();
  const folderId = args.folderId || "root";

  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    pageSize: args.pageSize ?? 20,
    pageToken: args.pageToken,
    fields:
      "nextPageToken, files(id, name, mimeType, modifiedTime, parents, size)",
    orderBy: "folder, name",
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
