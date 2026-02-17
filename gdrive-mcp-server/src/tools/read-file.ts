import { z } from "zod";
import { getDriveClient } from "../auth.js";
import pdfParse from "pdf-parse";

export const readFileSchema = {
  fileId: z.string().describe("The Google Drive file ID to read"),
};

// Google Workspace MIME types that need export (not download)
const EXPORT_MIME_MAP: Record<string, { mimeType: string; label: string }> = {
  "application/vnd.google-apps.document": {
    mimeType: "text/plain",
    label: "Google Doc",
  },
  "application/vnd.google-apps.spreadsheet": {
    mimeType: "text/csv",
    label: "Google Sheet",
  },
  "application/vnd.google-apps.presentation": {
    mimeType: "text/plain",
    label: "Google Slides",
  },
};

// MIME types we treat as images
const IMAGE_MIMES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
]);

// MIME types we treat as video
const VIDEO_MIMES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
  "video/x-matroska",
  "video/mpeg",
  "video/3gpp",
]);

// MIME types we treat as readable text
function isTextMime(mimeType: string): boolean {
  if (mimeType.startsWith("text/")) return true;
  const textTypes = [
    "application/json",
    "application/xml",
    "application/javascript",
    "application/typescript",
    "application/x-yaml",
    "application/yaml",
    "application/x-sh",
    "application/xhtml+xml",
    "application/sql",
  ];
  return textTypes.includes(mimeType);
}

export async function readFileTool(args: { fileId: string }) {
  const drive = await getDriveClient();

  // First, get file metadata to determine type
  const meta = await drive.files.get({
    fileId: args.fileId,
    fields: "id, name, mimeType, size, modifiedTime, webViewLink",
    supportsAllDrives: true,
  });

  const { name, mimeType, webViewLink } = meta.data;
  if (!mimeType) {
    throw new Error("Could not determine file MIME type");
  }

  const driveLink =
    webViewLink ?? `https://drive.google.com/file/d/${args.fileId}/view`;

  // --- Google Workspace documents: export ---
  const exportConfig = EXPORT_MIME_MAP[mimeType];
  if (exportConfig) {
    const res = await drive.files.export(
      { fileId: args.fileId, mimeType: exportConfig.mimeType },
      { responseType: "text" }
    );

    return {
      content: [
        {
          type: "text" as const,
          text: `# ${name} (${exportConfig.label})\n\n${res.data}`,
        },
      ],
    };
  }

  // --- Videos: return link only ---
  if (VIDEO_MIMES.has(mimeType)) {
    return {
      content: [
        {
          type: "text" as const,
          text:
            `# ${name}\n\n` +
            `This is a video file (${mimeType}) and is too large to display.\n` +
            `View it in Google Drive: ${driveLink}`,
        },
      ],
    };
  }

  // --- Images: return as base64 image content ---
  if (IMAGE_MIMES.has(mimeType)) {
    const res = await drive.files.get(
      { fileId: args.fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    const buffer = Buffer.from(res.data as ArrayBuffer);
    const base64 = buffer.toString("base64");

    // Map to MCP-supported image MIME types
    const mcpMimeType = mimeType === "image/svg+xml" ? "image/png" : mimeType;

    return {
      content: [
        {
          type: "text" as const,
          text: `# ${name}\n\nImage file (${mimeType}):`,
        },
        {
          type: "image" as const,
          data: base64,
          mimeType: mcpMimeType,
        },
      ],
    };
  }

  // --- PDFs: download and extract text ---
  if (mimeType === "application/pdf") {
    const res = await drive.files.get(
      { fileId: args.fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    const buffer = Buffer.from(res.data as ArrayBuffer);

    try {
      const pdf = await pdfParse(buffer);
      return {
        content: [
          {
            type: "text" as const,
            text: `# ${name} (PDF, ${pdf.numpages} pages)\n\n${pdf.text}`,
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text" as const,
            text:
              `# ${name}\n\n` +
              `This PDF could not be parsed for text content.\n` +
              `View it in Google Drive: ${driveLink}`,
          },
        ],
      };
    }
  }

  // --- Text/code files: download as text ---
  if (isTextMime(mimeType)) {
    const res = await drive.files.get(
      { fileId: args.fileId, alt: "media" },
      { responseType: "text" }
    );

    return {
      content: [
        {
          type: "text" as const,
          text: `# ${name}\n\n${res.data}`,
        },
      ],
    };
  }

  // --- Other binary formats: return link ---
  return {
    content: [
      {
        type: "text" as const,
        text:
          `# ${name}\n\n` +
          `This file type (${mimeType}) cannot be displayed as text.\n` +
          `View or download it in Google Drive: ${driveLink}`,
      },
    ],
  };
}
