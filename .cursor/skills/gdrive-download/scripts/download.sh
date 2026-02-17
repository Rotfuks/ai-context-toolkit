#!/bin/bash
# Download a folder from Google Drive by path
#
# Usage: ./download.sh "Drive/Path/To/Folder" [local_subfolder_name]
#
# Examples:
#   ./download.sh "Marketing Materials/Hand Outs / Flyers" handouts
#   ./download.sh "My Documents/Reports" reports

set -e

DRIVE_PATH="$1"
LOCAL_NAME="${2:-downloads}"

# Find workspace root (where workbench folder is)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
OUTPUT_DIR="$WORKSPACE_ROOT/workbench/$LOCAL_NAME"

if [ -z "$DRIVE_PATH" ]; then
    echo "Usage: $0 \"Drive/Path/To/Folder\" [local_subfolder_name]"
    echo ""
    echo "Example: $0 \"Marketing Materials/Hand Outs / Flyers\" handouts"
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
echo "  Source: gdrive:$DRIVE_PATH"
echo "  Destination: $OUTPUT_DIR"
echo ""

# Download files
rclone copy "gdrive:$DRIVE_PATH" "$OUTPUT_DIR" --progress

echo ""
echo "Download complete!"
echo "Files saved to: $OUTPUT_DIR"
echo ""
echo "Files downloaded:"
ls -la "$OUTPUT_DIR"
