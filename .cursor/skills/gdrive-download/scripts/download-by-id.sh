#!/bin/bash
# Download a folder from Google Drive by folder ID
#
# Usage: ./download-by-id.sh FOLDER_ID [local_subfolder_name]
#
# Get the folder ID from the Google Drive URL:
# https://drive.google.com/drive/folders/FOLDER_ID_HERE
#
# Examples:
#   ./download-by-id.sh 1aBcDeFgHiJkLmNoPqRsTuVwXyZ handouts
#   ./download-by-id.sh 1abc123xyz reports

set -e

FOLDER_ID="$1"
LOCAL_NAME="${2:-downloads}"

# Find workspace root (where workbench folder is)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
OUTPUT_DIR="$WORKSPACE_ROOT/workbench/$LOCAL_NAME"

if [ -z "$FOLDER_ID" ]; then
    echo "Usage: $0 FOLDER_ID [local_subfolder_name]"
    echo ""
    echo "Example: $0 1aBcDeFgHiJkLmNoPqRsTuVwXyZ handouts"
    echo ""
    echo "Get the folder ID from the Google Drive URL:"
    echo "https://drive.google.com/drive/folders/FOLDER_ID_HERE"
    exit 1
fi

# Check if rclone is installed
if ! command -v rclone &> /dev/null; then
    echo "Error: rclone is not installed."
    echo ""
    echo "Install with: brew install rclone"
    echo "Then configure: rclone config"
    exit 1
fi

# Check if gdrive remote exists
if ! rclone listremotes | grep -q "^gdrive:"; then
    echo "Error: 'gdrive' remote not configured in rclone."
    echo ""
    echo "Run: rclone config"
    echo "Create a new remote named 'gdrive' with type 'Google Drive'"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "Downloading from Google Drive..."
echo "  Folder ID: $FOLDER_ID"
echo "  Destination: $OUTPUT_DIR"
echo ""

# Download files using folder ID
# rclone can access folders by ID using the special syntax
rclone copy "gdrive,root_folder_id=$FOLDER_ID:" "$OUTPUT_DIR" --progress

echo ""
echo "Download complete!"
echo "Files saved to: $OUTPUT_DIR"
echo ""
echo "Files downloaded:"
ls -la "$OUTPUT_DIR"
