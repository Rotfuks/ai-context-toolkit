---
name: gdrive-mcp
description: Use the Google Drive MCP tools to search, list, and read files in Drive. Use when the user asks to read/summarize Drive docs, find meeting notes, or work with Google Docs/Sheets/Slides via MCP.
---

# Using the Google Drive MCP

Custom MCP server for searching and reading files from Google Drive. The server runs in a Podman container and communicates via stdio.

## Available Tools

### search

Find files and folders by name or content.

- **query** (required): Google Drive search query (e.g. `name contains 'report'`, `fullText contains 'budget'`)
- **pageSize** (optional, default 20, max 100): Number of results
- **pageToken** (optional): Token for next page of results

Returns: file names, IDs, MIME types, modification dates, and **parent folder IDs + names**.

### list_folder

List the contents of a folder.

- **folderId** (optional, defaults to root): The folder ID to list. Get folder IDs from search results, parent info, or from a Google Drive URL (extract the ID from the URL).
- **pageSize** (optional, default 20, max 100): Number of results
- **pageToken** (optional): Token for next page of results

Returns: same shape as search — file names, IDs, types, parent folders, modification dates.

### read_file

Read file content. Behavior depends on file type:

- **fileId** (required): The file ID to read

| File type | Behavior |
|---|---|
| Google Docs | Exported as plain text |
| Google Sheets | Exported as CSV |
| Google Slides | Exported as plain text |
| PDFs | Text extracted from the PDF |
| Images (png, jpg, gif, webp, etc.) | Returned as viewable image content |
| Videos | Returns a Drive link (too large to download) |
| Text/code/markdown | Downloaded as text |
| Other binary files | Returns a Drive link |

## Workflow: "Find and read a document"

1. **Search** for the file:
   - `search(query: "name contains 'meeting notes'")`
2. **Note the parent folder** from the results — each result includes the parent folder ID and name.
3. **Explore siblings** in that folder:
   - `list_folder(folderId: "<parent-folder-id>")`
4. **Read the document**:
   - `read_file(fileId: "<file-id>")`

## Extracting IDs from Google Drive URLs

When the user provides a Drive URL, extract the ID before calling tools:
- `https://drive.google.com/drive/u/0/folders/<ID>` → use `<ID>` as folderId
- `https://drive.google.com/file/d/<ID>/view` → use `<ID>` as fileId
- `https://docs.google.com/document/d/<ID>/edit` → use `<ID>` as fileId

## Pagination

When results include a `pageToken`, pass it to the next call to fetch more results. Always check if more results are available.

## Notes

- All search/list results include parent folder info, making it easy to navigate the folder structure.
- For **downloading** binary files or syncing folders to the workspace (e.g. large PDFs, archives), use the **gdrive-download** skill with rclone instead of the MCP.
