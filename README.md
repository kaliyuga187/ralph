# Ralph

![Ralph](ralph.webp)

Ralph is an autonomous AI agent loop that runs [Amp](https://ampcode.com) repeatedly until all PRD items are complete. Each iteration is a fresh Amp instance with clean context. Memory persists via git history, `progress.txt`, and `prd.json`.

Based on [Geoffrey Huntley's Ralph pattern](https://ghuntley.com/ralph/).

[Read my in-depth article on how I use Ralph](https://x.com/ryancarson/status/2008548371712135632)

## Prerequisites

- [Amp CLI](https://ampcode.com) installed and authenticated
- `jq` installed (`brew install jq` on macOS)
- A git repository for your project

## Setup

### Option 1: Quick Install (Recommended)

Install Ralph into your project using npx:

```bash
# Install Ralph files only
npx github:vibeforge1111/vibeship-idearalph install

# Install Ralph files AND skills globally to Amp config
npx github:vibeforge1111/vibeship-idearalph install --with-spawner
```

This creates `scripts/ralph/` in your project with:
- `ralph.sh` - The main execution loop
- `prompt.md` - Instructions for each iteration
- `prd.json.example` - Example PRD format
- `prd.json` - Empty file for your PRD
- `progress.txt` - Progress log

With `--with-spawner`, it also installs the `prd` and `ralph` skills to `~/.config/amp/skills/` for global use.

### Option 2: Manual Copy

Copy the ralph files into your project:

```bash
# From your project root
mkdir -p scripts/ralph
cp /path/to/ralph/ralph.sh scripts/ralph/
cp /path/to/ralph/prompt.md scripts/ralph/
chmod +x scripts/ralph/ralph.sh
```

Or copy the skills to your Amp config for use across all projects:

```bash
cp -r skills/prd ~/.config/amp/skills/
cp -r skills/ralph ~/.config/amp/skills/
```

### Configure Amp auto-handoff (recommended)

Add to `~/.config/amp/settings.json`:

```json
{
  "amp.experimental.autoHandoff": { "context": 90 }
}
```

This enables automatic handoff when context fills up, allowing Ralph to handle large stories that exceed a single context window.

## Workflow

### 1. Create a PRD

Use the PRD skill to generate a detailed requirements document (if you installed with `--with-spawner`):

```
Load the prd skill and create a PRD for [your feature description]
```

Answer the clarifying questions. The skill saves output to `tasks/prd-[feature-name].md`.

### 2. Convert PRD to Ralph format

Use the Ralph skill to convert the markdown PRD to JSON (if you installed with `--with-spawner`):

```
Load the ralph skill and convert tasks/prd-[feature-name].md to prd.json
```

Or manually create `scripts/ralph/prd.json` following the format in `prd.json.example`.

This creates `prd.json` with user stories structured for autonomous execution.

### 3. Run Ralph

```bash
./scripts/ralph/ralph.sh [max_iterations]
```

Default is 10 iterations.

Ralph will:
1. Create a feature branch (from PRD `branchName`)
2. Pick the highest priority story where `passes: false`
3. Implement that single story
4. Run quality checks (typecheck, tests)
5. Commit if checks pass
6. Update `prd.json` to mark story as `passes: true`
7. Append learnings to `progress.txt`
8. Repeat until all stories pass or max iterations reached

## Key Files

| File | Purpose |
|------|---------|
| `ralph.sh` | The bash loop that spawns fresh Amp instances |
| `prompt.md` | Instructions given to each Amp instance |
| `prd.json` | User stories with `passes` status (the task list) |
| `prd.json.example` | Example PRD format for reference |
| `progress.txt` | Append-only learnings for future iterations |
| `skills/prd/` | Skill for generating PRDs |
| `skills/ralph/` | Skill for converting PRDs to JSON |
| `flowchart/` | Interactive visualization of how Ralph works |
| `aerial-platform/` | Example SaaS app built with Ralph (two-sided marketplace) |
| `bin/extract-aerial-platform.sh` | Script to extract aerial-platform as standalone project |
| `AERIAL_EXTRACTION.md` | Guide for extracting and deploying aerial-platform |

## Flowchart

[![Ralph Flowchart](ralph-flowchart.png)](https://snarktank.github.io/ralph/)

**[View Interactive Flowchart](https://snarktank.github.io/ralph/)** - Click through to see each step with animations.

The `flowchart/` directory contains the source code. To run locally:

```bash
cd flowchart
npm install
npm run dev
```

## Aerial Estimate Platform - Example Application

This repository includes a **complete production-ready SaaS application** built using Ralph to demonstrate its capabilities. The Aerial Estimate Platform is a two-sided marketplace connecting homeowners with contractors using aerial imagery.

**Built in ~60 minutes with 50+ user stories implemented autonomously!**

### Extract the Platform

To use the Aerial Estimate Platform as a standalone project or template:

```bash
# Extract to current directory
./bin/extract-aerial-platform.sh

# Extract to custom location  
./bin/extract-aerial-platform.sh /path/to/output
```

See **[AERIAL_EXTRACTION.md](AERIAL_EXTRACTION.md)** for complete extraction and deployment guide.

### What's Included

- ✅ Complete Next.js 16 + TypeScript application
- ✅ Supabase database with 5 migration files (9 tables)
- ✅ Authentication, dashboards, job posting, bidding
- ✅ Mapbox aerial imagery integration
- ✅ Production deployment configs (Vercel)
- ✅ Mobile app configuration (React Native)
- ✅ Comprehensive documentation

## Critical Concepts

### Each Iteration = Fresh Context

Each iteration spawns a **new Amp instance** with clean context. The only memory between iterations is:
- Git history (commits from previous iterations)
- `progress.txt` (learnings and context)
- `prd.json` (which stories are done)

### Small Tasks

Each PRD item should be small enough to complete in one context window. If a task is too big, the LLM runs out of context before finishing and produces poor code.

Right-sized stories:
- Add a database column and migration
- Add a UI component to an existing page
- Update a server action with new logic
- Add a filter dropdown to a list

Too big (split these):
- "Build the entire dashboard"
- "Add authentication"
- "Refactor the API"

### AGENTS.md Updates Are Critical

After each iteration, Ralph updates the relevant `AGENTS.md` files with learnings. This is key because Amp automatically reads these files, so future iterations (and future human developers) benefit from discovered patterns, gotchas, and conventions.

Examples of what to add to AGENTS.md:
- Patterns discovered ("this codebase uses X for Y")
- Gotchas ("do not forget to update Z when changing W")
- Useful context ("the settings panel is in component X")

### Feedback Loops

Ralph only works if there are feedback loops:
- Typecheck catches type errors
- Tests verify behavior
- CI must stay green (broken code compounds across iterations)

### Browser Verification for UI Stories

Frontend stories must include "Verify in browser using dev-browser skill" in acceptance criteria. Ralph will use the dev-browser skill to navigate to the page, interact with the UI, and confirm changes work.

### Stop Condition

When all stories have `passes: true`, Ralph outputs `<promise>COMPLETE</promise>` and the loop exits.

## Debugging

Check current state:

```bash
# See which stories are done
cat prd.json | jq '.userStories[] | {id, title, passes}'

# See learnings from previous iterations
cat progress.txt

# Check git history
git log --oneline -10
```

## Customizing prompt.md

Edit `prompt.md` to customize Ralph's behavior for your project:
- Add project-specific quality check commands
- Include codebase conventions
- Add common gotchas for your stack

## Archiving

Ralph automatically archives previous runs when you start a new feature (different `branchName`). Archives are saved to `archive/YYYY-MM-DD-feature-name/`.

## MCP Server (Use with Claude)

Ralph includes an MCP (Model Context Protocol) server that lets you use Ralph with Claude Desktop or Claude Code.

### Setup

```bash
cd mcp-server
npm install
npm run build
```

### Configure Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "ralph": {
      "command": "node",
      "args": ["/path/to/ralph/mcp-server/dist/index.js"]
    }
  }
}
```

### Configure Claude Code

Add to `.claude/settings.json` in your project:

```json
{
  "mcpServers": {
    "ralph": {
      "command": "node",
      "args": ["/path/to/ralph/mcp-server/dist/index.js"]
    }
  }
}
```

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `ralph_status` | Get current status - project info, progress, next story |
| `ralph_get_prd` | Read the full PRD with all user stories |
| `ralph_get_next_story` | Get the highest priority incomplete story |
| `ralph_mark_story_complete` | Mark a story as complete |
| `ralph_log_progress` | Log learnings to progress.txt |
| `ralph_create_prd` | Create a new PRD with user stories |
| `ralph_check_complete` | Check if all stories are done |

See `mcp-server/README.md` for full documentation.

## References

- [Geoffrey Huntley's Ralph article](https://ghuntley.com/ralph/)
- [Amp documentation](https://ampcode.com/manual)
