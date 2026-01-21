#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

// Get the ralph directory (parent of mcp-server)
const RALPH_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const PRD_FILE = path.join(RALPH_DIR, "prd.json");
const PROGRESS_FILE = path.join(RALPH_DIR, "progress.txt");
const PROMPT_FILE = path.join(RALPH_DIR, "prompt.md");
const AGENTS_FILE = path.join(RALPH_DIR, "AGENTS.md");

interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: number;
  passes: boolean;
  notes: string;
}

interface PRD {
  project: string;
  branchName: string;
  description: string;
  userStories: UserStory[];
}

// Helper functions
function readPRD(): PRD | null {
  if (!fs.existsSync(PRD_FILE)) {
    return null;
  }
  const content = fs.readFileSync(PRD_FILE, "utf-8");
  return JSON.parse(content);
}

function writePRD(prd: PRD): void {
  fs.writeFileSync(PRD_FILE, JSON.stringify(prd, null, 2));
}

function readProgress(): string {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return "";
  }
  return fs.readFileSync(PROGRESS_FILE, "utf-8");
}

function appendProgress(content: string): void {
  fs.appendFileSync(PROGRESS_FILE, content + "\n");
}

function readPrompt(): string {
  if (!fs.existsSync(PROMPT_FILE)) {
    return "";
  }
  return fs.readFileSync(PROMPT_FILE, "utf-8");
}

function readAgents(): string {
  if (!fs.existsSync(AGENTS_FILE)) {
    return "";
  }
  return fs.readFileSync(AGENTS_FILE, "utf-8");
}

function getNextStory(prd: PRD): UserStory | null {
  const incompleteStories = prd.userStories
    .filter((story) => !story.passes)
    .sort((a, b) => a.priority - b.priority);
  return incompleteStories.length > 0 ? incompleteStories[0] : null;
}

function getRalphStatus(prd: PRD | null): string {
  if (!prd) {
    return "No PRD found. Create prd.json to get started.";
  }

  const total = prd.userStories.length;
  const completed = prd.userStories.filter((s) => s.passes).length;
  const remaining = total - completed;
  const nextStory = getNextStory(prd);

  let status = `Project: ${prd.project}\n`;
  status += `Branch: ${prd.branchName}\n`;
  status += `Progress: ${completed}/${total} stories complete\n`;
  status += `Remaining: ${remaining} stories\n`;

  if (nextStory) {
    status += `\nNext Story: ${nextStory.id} - ${nextStory.title}\n`;
    status += `Priority: ${nextStory.priority}\n`;
    status += `Description: ${nextStory.description}\n`;
    status += `Acceptance Criteria:\n`;
    nextStory.acceptanceCriteria.forEach((ac, i) => {
      status += `  ${i + 1}. ${ac}\n`;
    });
  } else {
    status += "\nAll stories complete!";
  }

  return status;
}

// Create the server
const server = new Server(
  {
    name: "ralph-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "ralph_status",
        description:
          "Get the current status of the Ralph agent loop - shows project info, progress, and next story to work on",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "ralph_get_prd",
        description:
          "Read the full PRD (Product Requirements Document) with all user stories and their status",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "ralph_get_next_story",
        description:
          "Get the next user story to work on (highest priority with passes: false)",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "ralph_mark_story_complete",
        description:
          "Mark a user story as complete (sets passes: true). Call this after implementing and verifying a story.",
        inputSchema: {
          type: "object",
          properties: {
            storyId: {
              type: "string",
              description: "The ID of the story to mark complete (e.g., 'US-001')",
            },
            notes: {
              type: "string",
              description: "Optional notes about the implementation",
            },
          },
          required: ["storyId"],
        },
      },
      {
        name: "ralph_log_progress",
        description:
          "Append a progress entry to progress.txt with learnings and implementation details",
        inputSchema: {
          type: "object",
          properties: {
            storyId: {
              type: "string",
              description: "The story ID this progress is for",
            },
            summary: {
              type: "string",
              description: "What was implemented",
            },
            filesChanged: {
              type: "array",
              items: { type: "string" },
              description: "List of files that were changed",
            },
            learnings: {
              type: "array",
              items: { type: "string" },
              description:
                "Key learnings for future iterations (patterns discovered, gotchas, useful context)",
            },
          },
          required: ["storyId", "summary"],
        },
      },
      {
        name: "ralph_get_progress",
        description:
          "Read the progress log to see what previous iterations accomplished and learned",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "ralph_get_prompt",
        description:
          "Get the Ralph agent prompt/instructions that guide each iteration",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "ralph_create_prd",
        description:
          "Create a new PRD (Product Requirements Document) with user stories",
        inputSchema: {
          type: "object",
          properties: {
            project: {
              type: "string",
              description: "Project name",
            },
            branchName: {
              type: "string",
              description: "Git branch name for this feature (e.g., 'ralph/my-feature')",
            },
            description: {
              type: "string",
              description: "Brief description of the feature being built",
            },
            userStories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", description: "Story ID (e.g., 'US-001')" },
                  title: { type: "string", description: "Short title" },
                  description: { type: "string", description: "User story description" },
                  acceptanceCriteria: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of acceptance criteria",
                  },
                  priority: {
                    type: "number",
                    description: "Priority (1 = highest)",
                  },
                },
                required: ["id", "title", "description", "acceptanceCriteria", "priority"],
              },
              description: "Array of user stories",
            },
          },
          required: ["project", "branchName", "description", "userStories"],
        },
      },
      {
        name: "ralph_check_complete",
        description:
          "Check if all stories are complete. Returns true if all stories have passes: true",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "ralph_status": {
      const prd = readPRD();
      return {
        content: [{ type: "text", text: getRalphStatus(prd) }],
      };
    }

    case "ralph_get_prd": {
      const prd = readPRD();
      if (!prd) {
        return {
          content: [
            {
              type: "text",
              text: "No PRD found. Create prd.json or use ralph_create_prd to create one.",
            },
          ],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(prd, null, 2) }],
      };
    }

    case "ralph_get_next_story": {
      const prd = readPRD();
      if (!prd) {
        return {
          content: [{ type: "text", text: "No PRD found." }],
        };
      }
      const nextStory = getNextStory(prd);
      if (!nextStory) {
        return {
          content: [
            { type: "text", text: "All stories are complete! <promise>COMPLETE</promise>" },
          ],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(nextStory, null, 2) }],
      };
    }

    case "ralph_mark_story_complete": {
      const prd = readPRD();
      if (!prd) {
        return {
          content: [{ type: "text", text: "No PRD found." }],
        };
      }
      const storyId = (args as { storyId: string; notes?: string }).storyId;
      const notes = (args as { storyId: string; notes?: string }).notes || "";
      const story = prd.userStories.find((s) => s.id === storyId);
      if (!story) {
        return {
          content: [{ type: "text", text: `Story ${storyId} not found.` }],
        };
      }
      story.passes = true;
      if (notes) {
        story.notes = notes;
      }
      writePRD(prd);
      return {
        content: [
          {
            type: "text",
            text: `Marked ${storyId} - "${story.title}" as complete.`,
          },
        ],
      };
    }

    case "ralph_log_progress": {
      const { storyId, summary, filesChanged, learnings } = args as {
        storyId: string;
        summary: string;
        filesChanged?: string[];
        learnings?: string[];
      };
      const timestamp = new Date().toISOString();
      let entry = `\n## ${timestamp} - ${storyId}\n`;
      entry += `- ${summary}\n`;
      if (filesChanged && filesChanged.length > 0) {
        entry += `- Files changed: ${filesChanged.join(", ")}\n`;
      }
      if (learnings && learnings.length > 0) {
        entry += `- **Learnings for future iterations:**\n`;
        learnings.forEach((l) => {
          entry += `  - ${l}\n`;
        });
      }
      entry += "---";
      appendProgress(entry);
      return {
        content: [{ type: "text", text: `Progress logged for ${storyId}.` }],
      };
    }

    case "ralph_get_progress": {
      const progress = readProgress();
      if (!progress) {
        return {
          content: [{ type: "text", text: "No progress log found." }],
        };
      }
      return {
        content: [{ type: "text", text: progress }],
      };
    }

    case "ralph_get_prompt": {
      const prompt = readPrompt();
      if (!prompt) {
        return {
          content: [{ type: "text", text: "No prompt.md found." }],
        };
      }
      return {
        content: [{ type: "text", text: prompt }],
      };
    }

    case "ralph_create_prd": {
      const { project, branchName, description, userStories } = args as {
        project: string;
        branchName: string;
        description: string;
        userStories: Array<{
          id: string;
          title: string;
          description: string;
          acceptanceCriteria: string[];
          priority: number;
        }>;
      };
      const prd: PRD = {
        project,
        branchName,
        description,
        userStories: userStories.map((s) => ({
          ...s,
          passes: false,
          notes: "",
        })),
      };
      writePRD(prd);
      // Initialize progress file
      if (!fs.existsSync(PROGRESS_FILE)) {
        fs.writeFileSync(
          PROGRESS_FILE,
          `# Ralph Progress Log\nStarted: ${new Date().toISOString()}\nProject: ${project}\n---\n`
        );
      }
      return {
        content: [
          {
            type: "text",
            text: `Created PRD for "${project}" with ${userStories.length} stories on branch ${branchName}.`,
          },
        ],
      };
    }

    case "ralph_check_complete": {
      const prd = readPRD();
      if (!prd) {
        return {
          content: [{ type: "text", text: "No PRD found." }],
        };
      }
      const allComplete = prd.userStories.every((s) => s.passes);
      if (allComplete) {
        return {
          content: [
            {
              type: "text",
              text: "All stories are complete! <promise>COMPLETE</promise>",
            },
          ],
        };
      }
      const remaining = prd.userStories.filter((s) => !s.passes).length;
      return {
        content: [
          {
            type: "text",
            text: `Not complete yet. ${remaining} stories remaining.`,
          },
        ],
      };
    }

    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
});

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "ralph://prd",
        name: "Product Requirements Document",
        description: "The current PRD with all user stories",
        mimeType: "application/json",
      },
      {
        uri: "ralph://progress",
        name: "Progress Log",
        description: "The progress log with learnings from previous iterations",
        mimeType: "text/plain",
      },
      {
        uri: "ralph://prompt",
        name: "Ralph Prompt",
        description: "The instructions given to each Ralph iteration",
        mimeType: "text/markdown",
      },
      {
        uri: "ralph://agents",
        name: "AGENTS.md",
        description: "Agent instructions and discovered patterns",
        mimeType: "text/markdown",
      },
    ],
  };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "ralph://prd": {
      const prd = readPRD();
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: prd ? JSON.stringify(prd, null, 2) : "No PRD found.",
          },
        ],
      };
    }
    case "ralph://progress": {
      const progress = readProgress();
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: progress || "No progress log found.",
          },
        ],
      };
    }
    case "ralph://prompt": {
      const prompt = readPrompt();
      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: prompt || "No prompt found.",
          },
        ],
      };
    }
    case "ralph://agents": {
      const agents = readAgents();
      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: agents || "No AGENTS.md found.",
          },
        ],
      };
    }
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ralph MCP Server running on stdio");
}

main().catch(console.error);
