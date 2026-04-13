# Everything AI Code 🚀

**AI 编程智能体的通用操作系统。**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)]()
[![Universal](https://img.shields.io/badge/Support-Qwen%20%7C%20Claude%20%7C%20Cursor%20%7C%20Gemini%20%7C%20Codex%20%7C%20CodeBuddy%20%7C%20Antigravity-brightgreen)]()

> **📢 项目来源与致谢：**
> 本项目是四个开源项目的**深度融合**：
> 1. **[everything-claude-code](https://github.com/affaan-m/everything-claude-code)**（MIT）：提供了海量（180+）的技术技能库和 Agent 架构。
> 2. **[superpowers](https://github.com/obra/superpowers)**（MIT）：提供了严格的工程纪律层（澄清需求、先规划后编码、并行执行、完成前验证）。
> 3. **[code-review-graph](https://github.com/tirth8205/code-review-graph)**（MIT）：提供了基于 MCP 的代码库图导航层 — 结构映射、影响范围分析，token 消耗减少约 8 倍。
> 4. **[antigravity-god-mode](https://github.com/SamarthaKV29/antigravity-god-mode)**（MIT）：提供了 660+ 扩展技能（SaaS 自动化、安全渗透、AI/ML、移动开发）和 18 个专家角色。
>
> 我们将 EQC 的"武器库"、Superpowers 的"指挥官"、code-review-graph 的"导航图"和 antigravity-god-mode 的"神级模式"完美结合，打造了一套**适用于所有 AI 开发者的通用标准**。

---

### 🧠 这是什么？

**Everything AI Code** 不仅仅是一份技能列表，它是一套**强制性的工程工作流**。它能防止 AI 盲目编码或“幻觉式地汇报成功”，确保每一步都经过深思熟虑和验证。

---

### ✨ 核心特性

*   **🤖 真正通用**：兼容 **Qwen Code, Claude Code, Cursor, Gemini, Codex, OpenCode, CodeBuddy Code, Antigravity**。
*   **🧠 智能路由**：根据任务复杂度，自动在"指挥官模式"（复杂规划）和"执行者模式"（快速编码）间切换。
*   **🛠️ 海量库**：850+ 技术技能 + 66 个专业 Agent。
*   **🗺️ 图导航**：集成 `code-review-graph`，AI 在打开任何文件前就能精准知道函数在哪里，token 消耗减少约 8 倍。
*   **🛡️ 严格质量门禁**：内置 `verification-before-completion` 技能，防止 AI 吹牛。
*   **⚡ 并行执行**：内置子代理分发功能，让多个 AI 同时为你干活。

---

### 🚀 安装指南

**选择最适合你的方式。**

#### 方法 1: 一键安装脚本（推荐）

克隆仓库并运行安装器。它会自动检测你的 AI 工具并配置好所有文件。

```bash
# Windows (PowerShell)
.\install.ps1

# macOS / Linux
chmod +x install.sh && ./install.sh
```

*   **项目模式 (默认)**：在当前文件夹安装 `.qwen/`，只影响这个项目。
*   **全局模式**：安装到 `~/.qwen`, `~/.claude` 等目录，本机上所有项目可用。

#### 方法 2: 手动安装（按工具）

如果你喜欢自己动手，只需将 `skills/`、`agents/` 和 `rules/` 文件夹复制到你工具的对应目录：

| 工具 | 目标目录 |
|------|----------|
| **Qwen Code** | 项目根目录下的 `.qwen/` |
| **Claude Code** | 全局目录 `~/.claude/` |
| **Cursor** | 项目根目录下的 `.cursor/` 或 `.cursorrules` |
| **Gemini CLI** | 全局目录 `~/.gemini/` |
| **Codex CLI** | 项目根目录下的 `.codex/` |
| **CodeBuddy Code** | 项目根目录下的 `.codebuddy/`（或全局 `~/.codebuddy/`）|
| **Antigravity** | 项目根目录下的 `.agent/skills/`（或全局 `~/.agent/skills/`）|

---

### 🗺️ 图导航功能（可选，强烈推荐）

`code-review-graph` 为 AI 提供了代码库的结构图，让 AI 能在读取任何文件之前就精确定位函数和类的位置，大幅减少不必要的 token 消耗。

> **重要说明：** `code-review-graph` 是一个独立的 Python 工具，**不是**上面安装的 skills/agents 的一部分。本项目中的 `skills/code-review-graph/SKILL.md` 只是一份**使用说明**，告诉 AI 何时/如何调用这个工具——你仍需单独安装工具本身。

#### 各命令的作用与执行位置

| 命令 | 在哪里执行 | 做什么 |
|------|-----------|--------|
| `pip install code-review-graph` | 任意位置（全局） | 在系统上安装 `code-review-graph` 命令行工具 |
| `code-review-graph install` | 任意位置 | 配置你的 AI 工具（Claude Code、Cursor、CodeBuddy 等），使其通过 MCP 连接到图 |
| `code-review-graph build` | **你要分析的目标项目根目录** | 解析该项目的代码，在项目根目录生成 `.code-review-graph/` 数据库 |
| `skills/code-review-graph/SKILL.md` | 由本项目安装 | 告诉 AI 何时以及如何调用图的 MCP 工具 |

#### 逐步设置

**第 1 步 — 安装工具（全局，只需一次）**
```bash
# 需要 Python 3.10+
pip install code-review-graph
# 或使用 pipx 隔离安装：
pipx install code-review-graph
# 或使用 uv：
uv tool install code-review-graph
```

**第 2 步 — 连接到 AI 工具（全局，只需一次）**
```bash
code-review-graph install
# 自动检测 Claude Code、Cursor、CodeBuddy 等并写入 MCP 配置
```

**第 3 步 — 在你的目标项目里构建图（每个项目一次）**
```bash
# 进入你要让 AI 分析的项目
cd /你的/项目

# 完整构建（包含流程/社区检测 — 较慢）
code-review-graph build

# 推荐：跳过流程检测（快很多，保留核心功能）
code-review-graph build --skip-flows

# 最小化：仅原始解析（最快，只有基础索引）
code-review-graph build --skip-postprocess
```

| 参数 | 跳过什么 | 速度 | 保留的功能 |
|------|---------|------|-----------|
| *(无参数)* | 不跳过 | 最慢 | 全部功能：签名、全文搜索、流程/社区检测 |
| `--skip-flows` | 流程和社区检测 | **快很多** | 函数/类定位、调用链、全文搜索、影响范围分析 |
| `--skip-postprocess` | 所有后处理 | 最快 | 仅基础解析和索引 |

**提示：** 在项目根目录创建 `.code-review-graphignore` 文件可以减少构建时间和磁盘占用：
```gitignore
node_modules/**
vendor/**
dist/**
build/**
generated/**
*.min.js
*.min.css
```
`.gitignore` 中的目录会自动跳过（只解析 git 跟踪的文件）。

**第 4 步 — 使用**
重启 AI 工具，然后说：
> "用 `code-graph-reviewer` 审查当前改动"

之后代码有变动时图会自动增量更新，无需手动重新构建。

#### 常见问题

| 问题 | 回答 |
|------|------|
| 要在 everything-ai-code 目录里运行 `build` 吗？ | **不要。** 在你要让 AI 分析的目标项目里运行。 |
| 每个项目都要安装吗？ | `pip install` 全局只需一次。`build` 每个目标项目运行一次。 |
| 切换项目怎么办？ | 在新项目里运行 `code-review-graph build`，每个项目有独立的图。 |
| 图会自动更新吗？ | 会。AI 调用 `build_or_update_graph_tool` 时会自动增量更新。 |

> **版权声明：** 图导航功能由 [code-review-graph](https://github.com/tirth8205/code-review-graph)（MIT 许可证）提供，作者 [@tirth8205](https://github.com/tirth8205)。

---

### 📖 它是如何工作的？

本项目采用**双层架构 (Two-Layer Architecture)**：

#### 第一层：指挥官 (The Commander / Orchestration)
*适用场景：模糊的想法、大型功能开发、复杂调试。*
*   `brainstorming`：帮你把“我想做个 X”梳理成具体的产品需求文档。
*   `writing-plans`：生成一步步的实施计划。
*   `subagent-driven-development`：将任务拆分，分派给多个子 AI 并行工作。
*   `systematic-debugging`：强制 AI 先复现 Bug，再定位根因，最后才去修复。
*   `verification-before-completion`：**最终门禁。** 在测试通过之前，AI 绝对不允许说“我做完了”。

#### 第二层：武器库 (The Arsenal / Execution)
*适用场景：写代码、特定技术栈、标准工作流。*
*   **TDD**: `tdd-workflow`（先写测试，80%+ 覆盖率）。
*   **安全**: `security-review`（查找漏洞）。
*   **技术栈**: `react-patterns`, `django-patterns`, `golang-patterns` 等。
*   **运维**: `docker-patterns`, `ci-cd-workflow`。

#### 第三层：导航图 (The Graph / Navigation)
*适用场景：查找代码位置、审查改动、分析影响范围。*
*   **`code-review-graph`**：查询代码库结构图，定位函数、追踪调用链，在读取文件前获取影响范围分析。
*   **`code-graph-reviewer`**：图辅助审查 Agent，携带完整影响上下文进行代码审查。

---

### 💡 使用示例

**场景 A: “我有个模糊的想法”**
> 你：“我想做个用户管理系统。”
>
> **AI (指挥官模式)**: 
> “在开始之前，我们先理清：
> 1. 给谁用？（管理员还是普通用户？）
> 2. 最小可用版本 (MVP) 是什么？
> 3. 有没有指定的技术栈？
> 我们先运行 `brainstorming` 生成 `PRODUCT-BRIEF.md` 吧。”

**场景 B: “我要做个大功能”**
> 你：“帮我实现支付模块。”
>
> **AI (计划模式)**: 
> “我将使用 `writing-plans` 把它拆成 3 个子任务：
> 1. 数据库设计。
> 2. 对接 Stripe API。
> 3. Webhook 处理。
> 然后我会用 `subagent-driven-development` 分配任务并行执行。”

**场景 C: “快速修一下”**
> 你：“把这个函数重构得干净点。”
>
> **AI (执行模式)**: 
> “直接应用 `coding-standards` 和 `plankton-code-quality`。测试运行中... 搞定。”

---

### 🤝 参与贡献

我们欢迎任何形式的贡献！
*   **添加技能**: 在 `skills/` 目录下创建一个文件夹，放入 `SKILL.md`。
*   **改进规则**: 编辑 `rules/` 目录下的文件。
*   **报告问题**: 告诉我们哪个技能有冲突或需要更新。

---

### 📜 许可证

MIT 许可证。源于社区，回馈社区。

**Get Everything Done. (搞定一切)** 🚀
