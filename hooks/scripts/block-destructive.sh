#!/usr/bin/env bash
# Block Destructive Commands / 阻止破坏性命令
# PreToolUse hook for Bash tool — prevents dangerous operations
# Usage: Add to .claude/settings.json as a PreToolUse hook

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Patterns that should be blocked
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \${HOME}"
  "DROP TABLE"
  "DROP DATABASE"
  "git push --force"
  "git push -f"
  "git reset --hard"
  "rm -rf \$(pwd)"
  "> /dev/sda"
  "mkfs"
  "dd if="
  ":(){:|:&};:"
  "chmod -R 777 /"
  "chown -R .* /"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "BLOCKED: Destructive command detected: $pattern"
    echo "If you really need to run this, use --dangerously-skip-permissions or remove this hook."
    exit 2
  fi
done

exit 0
