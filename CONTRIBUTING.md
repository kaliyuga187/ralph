# Contributing to Ralph

Thank you for your interest in contributing to Ralph! This document provides guidelines and instructions for collaborating on this project.

## About Ralph

Ralph is an autonomous AI agent loop that runs [Amp](https://ampcode.com) repeatedly until all PRD items are complete. Each iteration is a fresh Amp instance with clean context. Memory persists via git history, `progress.txt`, and `prd.json`.

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) (for the flowchart and MCP server)
- [Amp CLI](https://ampcode.com) installed and authenticated (for testing Ralph)
- `jq` installed (`brew install jq` on macOS, `apt-get install jq` on Linux)

### Fork and Clone

1. **Fork the repository** on GitHub by clicking the "Fork" button at the top right of the [repository page](https://github.com/kaliyuga187/ralph).

2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ralph.git
   cd ralph
   ```

3. **Add the upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/kaliyuga187/ralph.git
   ```

4. **Verify your remotes**:
   ```bash
   git remote -v
   # origin    https://github.com/YOUR_USERNAME/ralph.git (fetch)
   # origin    https://github.com/YOUR_USERNAME/ralph.git (push)
   # upstream  https://github.com/kaliyuga187/ralph.git (fetch)
   # upstream  https://github.com/kaliyuga187/ralph.git (push)
   ```

### Setup Development Environment

1. **Install dependencies for the flowchart** (if working on the visualization):
   ```bash
   cd flowchart
   npm install
   cd ..
   ```

2. **Install dependencies for the MCP server** (if working on the MCP integration):
   ```bash
   cd mcp-server
   npm install
   cd ..
   ```

3. **Make ralph.sh executable**:
   ```bash
   chmod +x ralph.sh
   ```

## Development Workflow

### Keeping Your Fork Updated

Before starting work on a new feature, sync your fork with the upstream repository:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### Creating a Feature Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Use descriptive branch names:
- `feature/add-logging` - for new features
- `fix/broken-link` - for bug fixes
- `docs/improve-setup` - for documentation changes

### Making Changes

1. **Make your changes** in the appropriate files
2. **Test your changes** thoroughly (see Testing section below)
3. **Keep commits focused** - each commit should represent a single logical change
4. **Write clear commit messages**:
   ```bash
   git commit -m "Add: support for custom iteration limits"
   # or
   git commit -m "Fix: typo in README setup instructions"
   # or
   git commit -m "Docs: clarify PRD creation workflow"
   ```

### Commit Message Guidelines

- Start with a verb in present tense (Add, Fix, Update, Remove, Refactor, Docs)
- Keep the first line under 72 characters
- Add a detailed description if needed (after a blank line)
- Reference issues when applicable: "Fix #123: resolve iteration counting bug"

Example:
```
Add: support for custom PRD validation

- Add validation schema for prd.json
- Check required fields on startup
- Show helpful error messages for missing fields

Fixes #42
```

## Testing Your Changes

### Testing the Main Ralph Script

1. Create a test project directory:
   ```bash
   mkdir /tmp/ralph-test
   cd /tmp/ralph-test
   git init
   ```

2. Copy Ralph files to your test project:
   ```bash
   mkdir -p scripts/ralph
   cp /path/to/your/ralph/fork/ralph.sh scripts/ralph/
   cp /path/to/your/ralph/fork/prompt.md scripts/ralph/
   cp /path/to/your/ralph/fork/prd.json.example scripts/ralph/prd.json.example
   chmod +x scripts/ralph/ralph.sh
   ```

3. Create a minimal `prd.json` for testing:
   ```bash
   cat > scripts/ralph/prd.json << 'EOF'
   {
     "projectName": "Test Project",
     "branchName": "test-feature",
     "userStories": [
       {
         "id": 1,
         "title": "Test story",
         "description": "A simple test",
         "acceptanceCriteria": ["Create a test.txt file"],
         "passes": false
       }
     ]
   }
   EOF
   ```

4. Run Ralph with a single iteration:
   ```bash
   ./scripts/ralph/ralph.sh 1
   ```

### Testing the Flowchart

If you made changes to the flowchart visualization:

```bash
cd flowchart
npm install
npm run dev
# Open http://localhost:5173 in your browser
```

Verify:
- All nodes render correctly
- Click-through animations work
- Responsive design works on different screen sizes
- Build completes without errors: `npm run build`

### Testing the MCP Server

If you made changes to the MCP server:

```bash
cd mcp-server
npm install
npm run build
npm test  # if tests exist
```

Test the server integration by adding it to Claude Desktop or Claude Code (see README.md for configuration).

### Testing Documentation Changes

For documentation updates:
1. Read through your changes carefully
2. Verify all links work
3. Ensure code examples are accurate
4. Check for typos and grammar
5. Preview markdown rendering (most IDEs have markdown preview)

## Submitting Your Changes

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Ensure all code follows existing style conventions
- [ ] Verify commit messages are clear and descriptive
- [ ] Rebase on latest upstream/main if needed

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub:
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Select the base repository: `kaliyuga187/ralph` and base branch: `main`
   - Select your head repository and compare branch

3. **Fill out the PR template** with:
   - Clear description of what changed and why
   - Reference any related issues (#123)
   - Describe how you tested the changes
   - Note any breaking changes or special considerations

4. **Respond to feedback**:
   - Address review comments promptly
   - Make requested changes in new commits
   - Push updates to your branch (they'll automatically appear in the PR)

### PR Review Process

- A maintainer will review your PR
- They may request changes or ask questions
- Once approved, a maintainer will merge your PR
- Your contribution will be part of the next release!

## Code Style and Conventions

### Shell Scripts (ralph.sh)

- Use `#!/usr/bin/env bash` shebang
- Add comments for complex logic
- Use meaningful variable names
- Quote variables to prevent word splitting
- Check exit codes and handle errors
- Follow existing indentation (2 spaces)

### Markdown Documentation

- Use consistent heading levels
- Add code fences with language hints: \`\`\`bash
- Keep lines under 120 characters when possible
- Use relative links for internal references
- Add a blank line before and after code blocks and lists

### TypeScript/JavaScript (flowchart, mcp-server)

- Follow existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Run linter/formatter if available

## Project Structure

```
ralph/
├── ralph.sh              # Main loop script
├── prompt.md             # Instructions for each Amp iteration
├── prd.json.example      # Example PRD format
├── AGENTS.md             # Agent instructions and patterns
├── README.md             # Main documentation
├── CONTRIBUTING.md       # This file
├── flowchart/            # Interactive visualization
│   ├── src/              # React Flow source code
│   └── package.json
├── mcp-server/           # MCP server for Claude integration
│   ├── src/              # TypeScript source code
│   └── package.json
├── skills/               # Amp skills
│   ├── prd/              # PRD generation skill
│   └── ralph/            # PRD conversion skill
└── bin/                  # Helper scripts
```

## Areas for Contribution

Here are some ways you can contribute:

### Documentation
- Improve setup instructions
- Add troubleshooting guides
- Create video tutorials or blog posts
- Add examples of PRD files
- Translate documentation

### Core Features
- Improve error handling in ralph.sh
- Add new quality check commands
- Enhance progress tracking
- Add retry logic for failed iterations

### Visualization
- Improve the flowchart design
- Add new animations or interactions
- Make it more responsive
- Add dark mode support

### MCP Server
- Add new MCP tools
- Improve error handling
- Add better logging
- Write tests

### Skills
- Improve PRD generation prompts
- Add new skills for Ralph workflow
- Enhance JSON conversion logic

### Testing & CI
- Add automated tests
- Set up GitHub Actions workflows
- Add linting and formatting
- Create integration tests

## Getting Help

- **Questions?** Open a [Discussion](https://github.com/kaliyuga187/ralph/discussions)
- **Found a bug?** Open an [Issue](https://github.com/kaliyuga187/ralph/issues)
- **Need clarification?** Comment on an existing issue or PR

## Code of Conduct

Be respectful and constructive in all interactions. We're all here to learn and build something useful together.

## License

By contributing to Ralph, you agree that your contributions will be licensed under the same license as the project.

## Recognition

All contributors will be recognized in the project. Thank you for making Ralph better!
