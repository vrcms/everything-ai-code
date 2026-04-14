# Hooks / 钩子

Hooks are user-defined handlers that run outside the agentic loop on specific events. They enforce behavior that instructions alone cannot guarantee.

钩子是用户定义的事件处理器，在 AI 代理循环之外运行。它们强制执行指令无法保证的行为。

---

## Hook Types / 钩子类型

| Type | When It Runs / 运行时机 | Use Case / 用途 |
|------|------------------------|-----------------|
| **PreToolUse** | Before a tool executes / 工具执行前 | Validate parameters, block dangerous commands |
| **PostToolUse** | After a tool executes / 工具执行后 | Auto-format, log usage, run checks |
| **Stop** | When the session stops / 会话结束时 | Final verification, nudges |

---

## Available Hooks / 可用钩子

### 1. Block Destructive Commands / 阻止破坏性命令

**File:** `hooks/scripts/block-destructive.sh`

Prevents dangerous operations like `rm -rf`, `DROP TABLE`, `force push` from executing.

### 2. Auto-Format on Edit / 编辑后自动格式化

**File:** `hooks/scripts/auto-format.sh`

Runs Prettier/auto-formatter after file edits (Write or Edit tool usage).

### 3. Verify Before Done / 完成前验证

**File:** `hooks/scripts/verify-before-done.sh`

Nudges the AI to run tests before declaring a task complete.

---

## Installation / 安装

Hooks are automatically installed by the installer when you choose Claude Code or project-level installation.

To manually configure hooks, add them to `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/scripts/block-destructive.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/scripts/auto-format.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/scripts/verify-before-done.sh"
          }
        ]
      }
    ]
  }
}
```

---

## Custom Hooks / 自定义钩子

Create your own hooks by adding scripts to `hooks/scripts/` and registering them in `.claude/settings.json`.

**Tips / 技巧:**
- Use `PreToolUse` hooks to measure skill usage and understand which skills are most valuable
- Use `PostToolUse` hooks for auto-formatting — ensures consistency without manual effort
- Use `Stop` hooks to nudge the AI: "Run tests before marking complete" or "Check for TODO comments"
- Route permission requests through hooks for auto-approve on safe operations
