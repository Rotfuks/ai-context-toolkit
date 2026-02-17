---
name: gdrive-download
description: Download files from Google Drive to the local workbench folder using rclone. Use when the user asks to download files from Google Drive, sync Drive folders, access PDFs or binary files from Drive, or references a Google Drive URL.
---

# Google Drive Download

Download files from Google Drive to `workbench/` for local analysis.

## Quick Reference

```bash
# By folder path
scripts/download.sh "Path/In/Drive" local_folder

# By folder ID (from URL)
scripts/download-by-id.sh FOLDER_ID local_folder

# List contents first
rclone ls "gdrive:Path/In/Drive"
```

## Usage

### Download by Drive Path

```bash
scripts/download.sh "DRIVE_PATH" LOCAL_NAME
```

- `DRIVE_PATH`: Path in Google Drive (e.g., "Marketing Materials/Reports")
- `LOCAL_NAME`: Subfolder name in workbench (e.g., "reports")

### Download by Folder ID

Extract folder ID from Google Drive URL:
`https://drive.google.com/drive/folders/`**`FOLDER_ID_HERE`**

```bash
scripts/download-by-id.sh FOLDER_ID LOCAL_NAME
```

### List Folder Contents

```bash
rclone ls "gdrive:Path/To/Folder"
rclone lsf "gdrive:Path/To/Folder"  # Just filenames
```

## Output

Files download to: `workbench/<LOCAL_NAME>/`

This folder is gitignored - downloaded files won't be committed.

## Examples

```bash
# Download marketing handouts
scripts/download.sh "Marketing Materials/Hand Outs / Flyers" handouts

# Download by folder ID
scripts/download-by-id.sh FOLDER_ID handouts

# Download design assets
scripts/download.sh "Design/Brand Assets" brand-assets

# Download meeting notes
scripts/download.sh "Team/Meeting Notes" meeting-notes
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| rclone not found | `brew install rclone` |
| gdrive remote not found | `rclone config` → create remote named "gdrive" |
| Access denied | `rclone config reconnect gdrive:` |
