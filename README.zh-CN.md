# Everything AI Code 🚀

**AI 编程智能体的通用操作系统。**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![Universal](https://img.shields.io/badge/Support-Qwen%20%7C%20Claude%20%7C%20Cursor%20%7C%20Gemini%20%7C%20Codex-brightgreen)]()

> **📢 项目来源与致谢：**
> 本项目是两个传奇开源项目的**深度融合**：
> 1. **[everything-claude-code](https://github.com/affaan-m/everything-claude-code)**：提供了海量（180+）的技术技能库和 Agent 架构。
> 2. **[superpowers](https://github.com/obra/superpowers)**：提供了严格的工程纪律层（澄清需求、先规划后编码、并行执行、完成前验证）。
>
> 我们将 EQC 的“武器库”与 Superpowers 的“指挥官”完美结合，打造了一套**适用于所有 AI 开发者的通用标准**。

---

### 🧠 这是什么？

**Everything AI Code** 不仅仅是一份技能列表，它是一套**强制性的工程工作流**。它能防止 AI 盲目编码或“幻觉式地汇报成功”，确保每一步都经过深思熟虑和验证。

---

### ✨ 核心特性

*   **🤖 真正通用**：兼容 **Qwen Code, Claude Code, Cursor, Gemini, Codex, OpenCode**。
*   **🧠 智能路由**：根据任务复杂度，自动在“指挥官模式”（复杂规划）和“执行者模式”（快速编码）间切换。
*   **🛠️ 海量库**：180+ 技术技能 + 47 个专业 Agent。
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
