import type { drive_v3 } from "googleapis";

interface FileWithParent {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  parents?: string[];
  parentFolderName?: string;
}

/**
 * Resolves parent folder IDs to their names via batched lookups.
 * Caches results to avoid redundant API calls within a single request.
 */
export async function resolveParentNames(
  drive: drive_v3.Drive,
  files: drive_v3.Schema$File[]
): Promise<FileWithParent[]> {
  // Collect unique parent IDs
  const parentIds = new Set<string>();
  for (const file of files) {
    if (file.parents?.[0]) {
      parentIds.add(file.parents[0]);
    }
  }

  // Fetch parent names
  const parentNameMap = new Map<string, string>();
  const fetchPromises = [...parentIds].map(async (id) => {
    try {
      const res = await drive.files.get({
        fileId: id,
        fields: "name",
        supportsAllDrives: true,
      });
      parentNameMap.set(id, res.data.name ?? "Unknown");
    } catch {
      parentNameMap.set(id, "Unknown");
    }
  });
  await Promise.all(fetchPromises);

  return files.map((file) => ({
    id: file.id ?? "",
    name: file.name ?? "Untitled",
    mimeType: file.mimeType ?? "unknown",
    modifiedTime: file.modifiedTime ?? "",
    size: file.size ?? undefined,
    parents: file.parents ?? undefined,
    parentFolderName: file.parents?.[0]
      ? parentNameMap.get(file.parents[0])
      : undefined,
  }));
}

/**
 * Formats a list of files into a readable text response.
 */
export function formatFileList(
  files: FileWithParent[],
  nextPageToken?: string | null
): string {
  if (files.length === 0) {
    return "No files found.";
  }

  const lines = files.map((f) => {
    const icon = f.mimeType === "application/vnd.google-apps.folder" ? "📁" : "📄";
    const parentInfo = f.parentFolderName
      ? ` [in: ${f.parentFolderName} (${f.parents?.[0]})]`
      : "";
    const modified = f.modifiedTime
      ? ` | modified: ${f.modifiedTime}`
      : "";
    return `${icon} ${f.name} (ID: ${f.id})${parentInfo}${modified}`;
  });

  let result = lines.join("\n");

  if (nextPageToken) {
    result += `\n\n--- More results available. Use pageToken: "${nextPageToken}" to fetch the next page. ---`;
  }

  return result;
}
