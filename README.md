# Everything AI Code 🚀

**The Universal Operating System for AI Coding Agents.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)]()
[![Universal](https://img.shields.io/badge/Support-Qwen%20%7C%20Claude%20%7C%20Cursor%20%7C%20Gemini%20%7C%20Codex%20%7C%20CodeBuddy%20%7C%20Antigravity-brightgreen)]()

> **📢 Origin & Acknowledgments:**
> This project is a **deep fusion** of open-source projects:
> 1. **[everything-claude-code](https://github.com/affaan-m/everything-claude-code)** (MIT): Provided the massive 180+ technical skill library and agent architecture.
> 2. **[superpowers](https://github.com/obra/superpowers)** (MIT): Provided the strict engineering discipline layer (clarify, plan, parallelize, verify).
> 3. **[antigravity-god-mode](https://github.com/SamarthaKV29/antigravity-god-mode)** (MIT): Provided 660+ expanded skills (SaaS automation, security/pentesting, AI/ML, mobile) and 18 specialist personas.
> 4. **[claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)** (MIT): Provided best practices for skill writing, hooks, and context management.
>
> We combined the "Arsenal" of EQC, the "Commander" of Superpowers, the "God Mode" of antigravity-god-mode, and community best practices to create a **Universal Standard for all AI Developers.**

---

### 🧠 What is this?

**Everything AI Code** is not just a list of skills. It is a **complete engineering workflow** that forces your AI to clarify requirements, plan before coding, parallelize work, and verify before saying "done".

---

### ✨ Key Features

*   **🤖 Universal**: Works with **Qwen Code, Claude Code, Cursor, Gemini, Codex, OpenCode, CodeBuddy Code, Antigravity**.
*   **🧠 Smart Routing**: Automatically switches between "Commander Mode" (for complex planning) and "Executor Mode" (for fast coding).
*   **🛠️ Massive Library**: 850+ technical skills + 66 specialized agents.
*   **🛡️ Strict Quality Gates**: Built-in `verification-before-completion` prevents the AI from hallucinating success.
*   **⚡ Parallel Execution**: Built-in support for sub-agent dispatching to get work done faster.
*   **🪝 Hooks System**: Safety nets and auto-formatting through PreToolUse/PostToolUse/Stop hooks.
*   **📖 Best Practices**: Curated community tips for skill writing, context management, and workflow optimization.

---

### 🚀 Installation

**Choose the method that fits your workflow.**

#### Method 1: One-Click Installer (Recommended)

Clone the repo and run the installer. It will detect your AI tool and configure the files automatically.

```bash
# Windows (PowerShell)
.\install.ps1

# macOS / Linux
chmod +x install.sh && ./install.sh
```

*   **Project Mode (Default)**: Installs `.qwen/` into your current folder. Only affects this project.
*   **Global Mode**: Installs to `~/.qwen`, `~/.claude`, etc. Available for all projects on your machine.

#### Method 2: Manual Installation (By Tool)

If you prefer to do it yourself, just copy the `skills/`, `agents/`, and `rules/` folders to the correct location for your tool:

| Tool | Target Directory |
|------|------------------|
| **Qwen Code** | `.qwen/` in your project root |
| **Claude Code** | `~/.claude/` (Global) |
| **Cursor** | `.cursor/` or `.cursorrules` in your project root |
| **Gemini CLI** | `~/.gemini/` (Global) |
| **Codex CLI** | `.codex/` in your project root |
| **CodeBuddy Code** | `.codebuddy/` in your project root (or `~/.codebuddy/` globally) |
| **Antigravity** | `.agent/skills/` in your project root (or `~/.agent/skills/` globally) |

---

### 📖 How It Works

The project uses a **Two-Layer Architecture**:

#### Layer 1: The Commander (Orchestration)
*Used for: Vague ideas, large features, complex debugging.*
*   `brainstorming`: Helps you refine "I want to build X" into a concrete spec.
*   `writing-plans`: Creates step-by-step implementation guides.
*   `subagent-driven-development`: Splits work among multiple AI agents to work in parallel.
*   `systematic-debugging`: Forces the AI to reproduce bugs before fixing them.
*   `verification-before-completion`: **The Final Gate.** The AI CANNOT say "I'm done" until tests pass.

#### Layer 2: The Arsenal (Execution)
*Used for: Writing code, specific tech stacks, standard workflows.*
*   **TDD**: `tdd-workflow` (Write tests first, 80%+ coverage).
*   **Security**: `security-review` (Find vulnerabilities).
*   **Stacks**: `react-patterns`, `django-patterns`, `golang-patterns`, etc.
*   **DevOps**: `docker-patterns`, `ci-cd-workflow`.
*   **SaaS**: `slack-automation`, `jira-automation`, `zendesk-automation`, `salesforce-automation`.

---

### 💡 Usage Examples

**Scenario A: The "Vague Idea"**
> You: "I want to build a user management system."
>
> **AI (Commander Mode)**: 
> "Before we start, let's clarify: 
> 1. Who is this for? (Admins? Customers?) 
> 2. What is the MVP? 
> 3. Should we use a specific stack? 
> Let's use `brainstorming` to write a `PRODUCT-BRIEF.md` first."

**Scenario B: The "Big Feature"**
> You: "Implement the payment module."
>
> **AI (Planning Mode)**: 
> "I'll use `writing-plans` to break this into 3 sub-tasks: 
> 1. Database schema. 
> 2. Stripe API integration. 
> 3. Webhook handling. 
> Then I'll use `subagent-driven-development` to execute them."

**Scenario C: The "Quick Fix"**
> You: "Refactor this function to be cleaner."
>
> **AI (Executor Mode)**: 
> "Directly applying `coding-standards` and `plankton-code-quality`. Running tests... Done."

---

### 🤝 Contributing

We welcome contributions!
*   **Add a Skill**: Create a folder in `skills/` with a `SKILL.md`.
*   **Improve a Rule**: Edit files in `rules/`.
*   **Report Issues**: Tell us if a skill conflicts or needs updating.

---

### 📜 License

MIT License. Built for the community, by the community.

**Get Everything Done.** 🚀
