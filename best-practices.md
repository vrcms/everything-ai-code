# Best Practices / 最佳实践

Curated tips from the AI coding community for getting the most out of Everything AI Code.

源自 AI 编程社区的最佳实践精选，帮助你最大化发挥 Everything AI Code 的威力。

---

## 1. Skill Writing / 技能编写

### Description Is a Trigger, Not a Summary / 描述是触发器，不是摘要

The `description` field in SKILL.md frontmatter is how AI assistants **discover and match** your skill. Write it for the model, not for humans.

```yaml
# Bad: "A skill for working with databases"
# Good: "Design, optimize, and migrate PostgreSQL databases with Prisma ORM. Use when setting up schemas, writing migrations, or debugging query performance."
description: Design, optimize, and migrate PostgreSQL databases with Prisma ORM
```

**Why:** AI matches skills by comparing user intent against the description. Vague descriptions = missed matches. / AI 通过比对用户意图和描述来匹配技能。模糊描述 = 匹配失败。

### Add a Gotchas Section / 增加 Gotchas（陷阱）章节

Every SKILL.md should include a "Gotchas" or "Common Pitfalls" section. This is the **highest-signal content** — it prevents the AI from making mistakes it would otherwise repeat.

```markdown
## Gotchas
- Prisma `createMany` does not return created records by default
- `@unique` constraint errors surface at runtime, not in the schema validator
- Decimal fields need `@db.Decimal(precision, scale)` or precision is lost
```

**Why:** AI learns patterns from examples. Without explicit anti-patterns, it will repeat common mistakes. / AI 从示例中学习模式。没有明确的反模式，它会重复常见错误。

### Use `context: fork` for Expensive Skills / 用 `context: fork` 隔离运行重型技能

If a skill does heavy analysis or generates lots of intermediate content, mark it to run in an isolated context:

```yaml
---
name: security-audit
context: fork
---
```

**Why:** Forked skills run in a separate context window, preventing them from polluting the main conversation's token budget. / 分叉技能在独立的上下文窗口运行，避免污染主对话的 token 预算。

### Embed Dynamic Shell Output / 嵌入动态 Shell 输出

Use `` !`command` `` syntax in SKILL.md to inject real-time data:

```markdown
Current project structure:
!`find . -name "*.ts" -not -path "*/node_modules/*" | head -20`
```

**Why:** Dynamic content keeps skills accurate without manual updates. / 动态内容保持技能准确性，无需手动更新。

### Skills Are Folders, Not Files / 技能是文件夹，不是文件

Leverage subdirectories within a skill for richer context:

```
skills/my-skill/
├── SKILL.md          # Main instructions
├── references/       # Reference docs the AI can cite
├── scripts/          # Executable scripts the AI can run
└── examples/         # Example inputs/outputs
```

**Why:** The AI can read supporting files on demand, keeping SKILL.md focused while providing depth when needed. / AI 按需读取辅助文件，保持 SKILL.md 聚焦的同时提供深度。

---

## 2. CLAUDE.md / Project Instructions / 项目指令编写

### Keep It Under 200 Lines / 控制在 200 行以内

Target **60 lines ideal**, **200 lines max**. Long instruction files get summarized or ignored.

**Why:** AI has a context window budget. Every line in your project instructions competes with actual code and conversation. Concise = followed. / AI 有上下文窗口预算。项目指令的每一行都在与代码和对话竞争。简洁 = 被遵守。

### Use Conditional Tags / 使用条件标签

```markdown
<important if="user is working on a Django project">
Always use Django's ORM instead of raw SQL queries.
</important>
```

**Why:** Conditional tags prevent the AI from applying irrelevant rules across different project types. / 条件标签防止 AI 在不同项目类型间应用不相关的规则。

### Split Large Instructions into Rules / 拆分大指令到 rules/

If your project instructions exceed 200 lines, split domain-specific rules into `rules/` files:

```
.claude/
├── CLAUDE.md           # Core project context (< 200 lines)
└── rules/
    ├── frontend.md     # React-specific rules
    ├── backend.md      # API design rules
    └── database.md     # Schema conventions
```

**Why:** Rules are loaded on-demand by relevance. One massive file is loaded all-or-nothing. / Rules 按需加载。一个巨大文件要么全加载要么不加载。

### Use settings.json for Enforced Behavior / 用 settings.json 强制行为

If you need the AI to **always** do something (e.g., attribution headers), configure it in `settings.json` rather than relying on CLAUDE.md:

```json
{
  "permissions": {
    "allow": ["Read", "Write", "Bash(npm test)"],
    "deny": ["Bash(rm -rf)"]
  }
}
```

**Why:** Instructions in CLAUDE.md can be ignored. Settings.json hooks are enforced by the runtime. / CLAUDE.md 中的指令可能被忽略。settings.json 的约束由运行时强制执行。

---

## 3. Context Management / 上下文管理

### Compact at 50%, Clear on Task Switch / 50% 时压缩，切换任务时清空

- When context usage reaches ~50%, run `/compact` to summarize and free space
- When switching to an unrelated task, run `/clear` to reset — don't carry stale context

**Why:** Degraded context = degraded output. A fresh 20% context window outperforms a cluttered 80% one. / 退化的上下文 = 退化的输出。干净的 20% 上下文窗口胜过混乱的 80%。

### Undo, Don't Patch / 回退，而非原地修复

When the AI makes a mistake, use `/rewind` (or `Esc Esc` in Claude Code) to undo, then retry. Don't ask it to "fix" in the same context — the error leaves residue.

**Why:** Fixing on top of errors compounds confusion. Rewind gives a clean slate. / 在错误之上修复会加剧混乱。回退提供干净的起点。

### Use Subagents to Isolate Concerns / 用子代理隔离关注点

Instead of one long session doing everything, dispatch subagents for independent work:

```
"Use subagents to: 1) Write the API tests, 2) Write the database migration, 3) Update the docs"
```

**Why:** Each subagent gets a fresh context window. No cross-contamination between tasks. / 每个子代理获得独立的上下文窗口。任务间无交叉污染。

---

## 4. Hooks / 钩子

### Auto-Format on Save / 保存时自动格式化

Use a `PostToolUse` hook to run formatters automatically after file edits:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx prettier --write $FILE_PATH"
      }
    ]
  }
}
```

**Why:** Ensures consistent code style without manual formatting or reminding the AI. / 确保一致的代码风格，无需手动格式化或提醒 AI。

### Block Destructive Commands / 阻止破坏性命令

Use a `PreToolUse` hook to prevent dangerous operations:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "pattern": "rm\\s+-rf|DROP\\s+TABLE|force\\s+push",
        "command": "echo 'BLOCKED: Destructive command detected' && exit 1"
      }
    ]
  }
}
```

**Why:** Safety net for production environments. The AI might suggest destructive commands; hooks catch them before execution. / 生产环境的安全网。AI 可能建议破坏性命令；钩子在执行前拦截。

### Nudge with Stop Hooks / 用 Stop 钩子推动

Use a `Stop` hook to remind the AI to verify before declaring "done":

```json
{
  "hooks": {
    "Stop": [
      {
        "command": "echo 'Reminder: Run tests before marking complete.'"
      }
    ]
  }
}
```

**Why:** Prevents premature completion claims. Aligns with our `verification-before-completion` principle. / 防止过早宣称完成。与我们的"完成前验证"原则一致。

---

## 5. Workflow Tips / 工作流技巧

### Start with Plan Mode / 从规划模式开始

For any non-trivial task, start in plan mode. Let the AI understand the full scope before writing code.

**Why:** Plans are cheap; code is expensive. 5 minutes planning saves 50 minutes of refactoring. / 规划成本低，代码成本高。5 分钟规划节省 50 分钟重构。

### Challenge the AI / 挑战 AI

> "Grill me on these changes and don't make a PR until I pass your test."

**Why:** AI defaults to being agreeable. Challenging it forces deeper analysis and catches more issues. / AI 默认顺从。挑战它迫使更深入的分析并发现更多问题。

### Scrap Mediocre Fixes / 丢弃平庸的修复

> "Knowing everything you know now, scrap this and implement the elegant solution."

**Why:** AI tends to patch problems incrementally. A clean rewrite is often better than a layered fix. / AI 倾向于增量修复。干净的重写往往优于层层叠叠的修复。

### If You Do It Twice, Automate It / 做两次就自动化

If you find yourself giving the same instruction more than once a day, turn it into a skill or command.

**Why:** Skills are reusable. Manual repetition wastes your time and introduces inconsistency. / 技能是可复用的。手动重复浪费时间并引入不一致。

---

## 6. Debugging / 调试

### Paste the Bug, Say "Fix" / 粘贴 Bug，说"修复"

Don't micromanage the AI's debugging process. Give it the error and let it investigate.

```
"Error: TypeError: Cannot read properties of undefined (reading 'map')
 at UserList.tsx:42. Fix it."
```

**Why:** The AI is better at root-cause analysis when it owns the investigation. Over-directing limits its search space. / 当 AI 主导调查时，根因分析效果更好。过度指导限制了搜索空间。

### Use MCP for Visual Debugging / 用 MCP 进行可视化调试

Connect Chrome DevTools or Playwright MCP servers so the AI can see browser console errors, take screenshots, and interact with UIs.

**Why:** "Show, don't tell" — the AI debugging a live UI is 10x faster than debugging from error text alone. / "展示，而非描述"——AI 调试实时 UI 比仅凭错误文本快 10 倍。

### Agentic Search Beats RAG / 代理搜索胜过 RAG

For finding information in a codebase, let the AI use glob + grep (agentic search) rather than setting up a RAG pipeline.

**Why:** Claude Code's own team tried vector databases and reverted to agentic search. File search is faster, more accurate, and requires zero setup. / Claude Code 团队尝试过向量数据库后回退到代理搜索。文件搜索更快、更准确，无需配置。

---

## 7. Git & PR / Git 与代码审查

### Small PRs, Squash Merge / 小 PR，Squash 合并

- Keep PRs small and focused (median: 118 lines)
- Always squash merge for clean linear history

**Why:** Small PRs are easier to review, less likely to introduce bugs, and faster to merge. Squash merges keep `git log` readable. / 小 PR 更易审查，更少引入 bug，更快合并。Squash 合并保持 git log 可读。

### Commit Often / 频繁提交

Commit at least once per hour of work. Use atomic commits (one logical change per commit).

**Why:** Frequent commits create restore points. If something goes wrong, you lose minutes, not hours. / 频繁提交创建还原点。出错时丢失的是分钟，而非小时。

---

> **Source:** Curated from [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) (41.7k stars) and community experience.
> **来源：** 精选自 [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)（41.7k stars）及社区经验。
