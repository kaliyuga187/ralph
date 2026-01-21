# Ralph MCP Server

An MCP (Model Context Protocol) server that exposes the Ralph autonomous agent loop framework to Claude.

## Installation

```bash
cd mcp-server
npm install
npm run build
```

## Available Tools

| Tool | Description |
|------|-------------|
| `ralph_status` | Get current status - project info, progress, and next story |
| `ralph_get_prd` | Read the full PRD with all user stories |
| `ralph_get_next_story` | Get the highest priority incomplete story |
| `ralph_mark_story_complete` | Mark a story as complete (passes: true) |
| `ralph_log_progress` | Append learnings to progress.txt |
| `ralph_get_progress` | Read progress log from previous iterations |
| `ralph_get_prompt` | Get the Ralph agent instructions |
| `ralph_create_prd` | Create a new PRD with user stories |
| `ralph_check_complete` | Check if all stories are done |

## Available Resources

| URI | Description |
|-----|-------------|
| `ralph://prd` | Product Requirements Document (JSON) |
| `ralph://progress` | Progress log with learnings |
| `ralph://prompt` | Ralph agent instructions |
| `ralph://agents` | AGENTS.md patterns |

## Configuration

### Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

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

### Claude Code (CLI)

Add to your Claude Code settings (`.claude/settings.json` in your project or `~/.claude/settings.json` globally):

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

Or using npx (after publishing):

```json
{
  "mcpServers": {
    "ralph": {
      "command": "npx",
      "args": ["-y", "ralph-mcp-server"]
    }
  }
}
```

## Usage with Claude

Once configured, you can ask Claude to:

1. **Check status**: "What's the current Ralph status?"
2. **Create a PRD**: "Create a Ralph PRD for adding user authentication with 3 stories"
3. **Work on stories**: "Get the next story and help me implement it"
4. **Track progress**: "Mark US-001 as complete and log my progress"

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start the server
npm start
```

## How Ralph Works

Ralph is an autonomous agent loop that:

1. Reads a PRD (Product Requirements Document) with user stories
2. Picks the highest priority incomplete story
3. Implements it with quality checks (typecheck, lint, test)
4. Commits changes and marks the story complete
5. Logs learnings for future iterations
6. Repeats until all stories pass

The MCP server exposes this workflow as tools, allowing Claude to orchestrate the Ralph pattern directly.
