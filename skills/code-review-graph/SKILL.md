---
name: code-review-graph
description: Graph-powered codebase navigation using code-review-graph MCP tools. Builds a structural map of the codebase so AI can pinpoint exact files and functions without scanning everything. Reduces token usage by 8x.
origin: code-review-graph
---

# Code Review Graph

Use a persistent structural graph of your codebase to navigate, review, and analyze code with surgical precision. Instead of reading entire files blindly, query the graph to find exactly where functions live and what they affect.

## When to Activate

- Before reading files to answer "where is X implemented?"
- When reviewing code changes (need blast-radius analysis)
- When debugging (need to trace call chains)
- When refactoring (need impact analysis before changing a function)
- When onboarding to a new codebase
- Any time you want to avoid scanning files you don't need

## Setup (One-Time)

```bash
pip install code-review-graph
code-review-graph install   # auto-configures Claude Code, Cursor, Codex, etc.
code-review-graph build     # parse the codebase and build the graph
```

After first build, the graph updates incrementally in <2 seconds on file changes.

## Standard Workflow

**Instead of: Read files blindly → find what you need**
**Do this: Query graph → get exact location → read only that file**

```
1. build_or_update_graph_tool    → ensure graph is current
2. semantic_search_nodes_tool    → find functions/classes by name or meaning
3. query_graph_tool              → get callers, callees, imports, tests
4. Read file at exact line       → read only what's needed
```

## MCP Tools Reference

### Graph Lifecycle

| Tool | When to Use |
|------|-------------|
| `build_or_update_graph_tool` | First thing — ensure the graph reflects current code |
| `list_graph_stats_tool` | Check graph health and coverage |
| `embed_graph_tool` | Enable semantic search (run once after build) |

### Code Navigation

| Tool | When to Use |
|------|-------------|
| `semantic_search_nodes_tool` | "Find the authentication middleware" — search by name or meaning |
| `query_graph_tool` | Get callers, callees, tests, imports, inheritance for a node |
| `find_large_functions_tool` | Find functions >N lines (refactor targets) |

### Impact Analysis

| Tool | When to Use |
|------|-------------|
| `get_impact_radius_tool` | "What breaks if I change this file?" — blast radius |
| `detect_changes_tool` | Risk-scored analysis of uncommitted changes |
| `get_affected_flows_tool` | Which execution flows are touched by changed files |

### Code Review

| Tool | When to Use |
|------|-------------|
| `get_review_context_tool` | Token-optimized context for reviewing a set of changes |
| `list_flows_tool` | List execution flows sorted by criticality |
| `get_flow_tool` | Inspect a single execution flow in detail |

### Architecture

| Tool | When to Use |
|------|-------------|
| `get_architecture_overview_tool` | High-level map of modules and their relationships |
| `list_communities_tool` | List auto-detected code clusters/modules |
| `get_community_tool` | Inspect a specific cluster |
| `generate_wiki_tool` | Auto-generate markdown documentation from the graph |
| `get_wiki_page_tool` | Retrieve a specific wiki page |

### Refactoring

| Tool | When to Use |
|------|-------------|
| `refactor_tool` | Preview rename, detect dead code, get suggestions |
| `apply_refactor_tool` | Apply a previewed refactoring |

### Multi-Repo

| Tool | When to Use |
|------|-------------|
| `list_repos_tool` | List all registered repositories |
| `cross_repo_search_tool` | Search code entities across multiple repos |

## Prompt Templates (Built-in Workflows)

Use these MCP prompt templates for common tasks:

- **`review_changes`** — Full code review workflow with blast-radius context
- **`architecture_map`** — Generate a visual architecture overview
- **`debug_issue`** — Trace an issue through the call graph
- **`onboard_developer`** — Create an onboarding guide from the graph
- **`pre_merge_check`** — Risk-scored pre-merge validation

## Example: Finding a Bug

```
# BAD: blindly reading files
Read auth/middleware.py
Read auth/utils.py
Read auth/tokens.py
...

# GOOD: query first
→ semantic_search_nodes_tool("token validation")
  Result: auth/tokens.py:45 — validate_token()

→ query_graph_tool(node="validate_token", query="callers")
  Result: 3 callers — middleware.py:12, api/login.py:88, tests/test_auth.py:34

→ Read auth/tokens.py (lines 45-80 only)
```

## Example: Pre-Commit Review

```
→ build_or_update_graph_tool()         # refresh graph
→ detect_changes_tool()                # get risk scores for changed files
→ get_impact_radius_tool(changed_files) # see what else is affected
→ get_review_context_tool(changed_files) # get token-optimized context
→ [apply code-reviewer checklist on the context]
```

## Performance Characteristics

- Initial build: depends on codebase size
- Incremental update: <2 seconds for 2,900-file projects
- Search latency: <2ms
- Token reduction vs. naive approach: ~8x average
- Supported languages: 19 (Python, TypeScript, JavaScript, Go, Rust, Java, C#, Ruby, PHP, C/C++, and more)
