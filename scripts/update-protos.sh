#!/bin/bash
set -euo pipefail

# Save current dir (should be portal/scripts)
SCRIPT_DIR="$(pwd)"

TMP_DIR=$(mktemp -d)
REPO_URL="https://github.com/DefangLabs/defang.git"
PROTO_FILE="src/protos/io/defang/v1/fabric.proto"

echo "Cloning only $PROTO_FILE from $REPO_URL..."

git clone --depth 1 --filter=blob:none --sparse "$REPO_URL" "$TMP_DIR"
cd "$TMP_DIR"
git config core.sparseCheckoutCone false
echo "$PROTO_FILE" > .git/info/sparse-checkout
git checkout

if [ ! -f "$PROTO_FILE" ]; then
  echo "Error: $PROTO_FILE not found after sparse checkout."
  exit 1
fi

DEST1="$SCRIPT_DIR/../web/src/modules/defang/fabric.proto"
DEST2="$SCRIPT_DIR/../api/src/lib/defang/proto/fabric.proto"

mkdir -p "$(dirname "$DEST1")"
mkdir -p "$(dirname "$DEST2")"

cp -f "$PROTO_FILE" "$DEST1"
cp -f "$PROTO_FILE" "$DEST2"

echo "Copied to:"
echo "  $DEST1"
echo "  $DEST2"

# Cleanup
rm -rf "$TMP_DIR"

# Go back to portal/web and run the npm command
echo "Running npm run generate-defang-fabric in portal/web..."
cd "$SCRIPT_DIR/../web"
npm run generate-defang-fabric

# Run code generation script in portal/api
echo "Running npm run generate-defang-fabric in portal/api..."
cd "$SCRIPT_DIR/../api"
npm run generate-defang-fabric