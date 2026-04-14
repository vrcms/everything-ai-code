#!/usr/bin/env bash
# Auto-Format on Edit / 编辑后自动格式化
# PostToolUse hook for Write|Edit tools — runs formatter after file changes
# Usage: Add to .claude/settings.json as a PostToolUse hook

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# Skip non-code files
case "$FILE_PATH" in
  *.md|*.txt|*.json|*.yaml|*.yml|*.toml|*.lock|*.log) exit 0 ;;
  *) ;;
esac

# Check for formatters and run the appropriate one
# Prettier
if command -v npx &>/dev/null && npx prettier --help &>/dev/null; then
  npx prettier --write "$FILE_PATH" 2>/dev/null
  exit 0
fi

# black (Python)
if command -v black &>/dev/null; then
  case "$FILE_PATH" in
    *.py) black "$FILE_PATH" 2>/dev/null ;;
  esac
  exit 0
fi

# gofmt (Go)
if command -v gofmt &>/dev/null; then
  case "$FILE_PATH" in
    *.go) gofmt -w "$FILE_PATH" 2>/dev/null ;;
  esac
  exit 0
fi

# rustfmt (Rust)
if command -v rustfmt &>/dev/null; then
  case "$FILE_PATH" in
    *.rs) rustfmt "$FILE_PATH" 2>/dev/null ;;
  esac
  exit 0
fi

exit 0
