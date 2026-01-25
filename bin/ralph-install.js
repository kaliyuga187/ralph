#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const command = args[0];
const flags = args.slice(1);

const RALPH_FILES = [
  'ralph.sh',
  'prompt.md',
  'prd.json.example'
];

const SKILLS_DIRS = [
  'skills/prd',
  'skills/ralph'
];

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`  ✓ Copied ${path.basename(dest)}`);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install(withSpawner = false) {
  console.log('\n🚀 Installing Ralph into your project...\n');
  
  // Get the installation source directory (where ralph files are located)
  const sourceDir = path.resolve(__dirname, '..');
  const targetDir = process.cwd();
  
  // Create scripts/ralph directory in target
  const ralphDir = path.join(targetDir, 'scripts', 'ralph');
  
  if (!fs.existsSync(ralphDir)) {
    fs.mkdirSync(ralphDir, { recursive: true });
    console.log('  ✓ Created scripts/ralph directory');
  }
  
  // Copy main Ralph files
  console.log('\n📋 Copying Ralph files...');
  for (const file of RALPH_FILES) {
    const src = path.join(sourceDir, file);
    const dest = path.join(ralphDir, file);
    
    if (fs.existsSync(src)) {
      copyFile(src, dest);
    } else {
      console.warn(`  ⚠ Warning: ${file} not found in source`);
    }
  }
  
  // Make ralph.sh executable
  const ralphScript = path.join(ralphDir, 'ralph.sh');
  if (fs.existsSync(ralphScript)) {
    try {
      fs.chmodSync(ralphScript, '755');
      console.log('  ✓ Made ralph.sh executable');
    } catch (err) {
      console.warn('  ⚠ Could not make ralph.sh executable:', err.message);
    }
  }
  
  // Copy skills to Amp config if --with-spawner flag is set
  if (withSpawner) {
    console.log('\n📦 Installing skills to Amp config...');
    const ampConfigDir = path.join(process.env.HOME || process.env.USERPROFILE, '.config', 'amp', 'skills');
    
    for (const skillDir of SKILLS_DIRS) {
      const src = path.join(sourceDir, skillDir);
      const skillName = path.basename(skillDir);
      const dest = path.join(ampConfigDir, skillName);
      
      if (fs.existsSync(src)) {
        copyDirectory(src, dest);
        console.log(`  ✓ Installed ${skillName} skill globally`);
      } else {
        console.warn(`  ⚠ Warning: ${skillDir} not found in source`);
      }
    }
  }
  
  // Create initial prd.json if it doesn't exist
  const prdJson = path.join(ralphDir, 'prd.json');
  if (!fs.existsSync(prdJson)) {
    fs.writeFileSync(prdJson, '', 'utf8');
    console.log('\n  ✓ Created empty prd.json');
  }
  
  // Create progress.txt if it doesn't exist
  const progressTxt = path.join(ralphDir, 'progress.txt');
  if (!fs.existsSync(progressTxt)) {
    const initialContent = `# Ralph Progress Log
Started: ${new Date().toISOString()}
---
`;
    fs.writeFileSync(progressTxt, initialContent, 'utf8');
    console.log('  ✓ Created progress.txt');
  }
  
  console.log('\n✅ Ralph installed successfully!\n');
  console.log('📖 Next steps:');
  console.log('   1. Create a PRD using the prd skill (if --with-spawner was used)');
  console.log('   2. Convert PRD to prd.json using the ralph skill');
  console.log('   3. Run: ./scripts/ralph/ralph.sh [max_iterations]');
  console.log('\n💡 Tip: Add to ~/.config/amp/settings.json:');
  console.log('   { "amp.experimental.autoHandoff": { "context": 90 } }');
  console.log('');
}

function showHelp() {
  console.log(`
Ralph Installer

Usage:
  npx github:vibeforge1111/vibeship-idearalph install [options]

Commands:
  install              Install Ralph into your project

Options:
  --with-spawner       Also install Ralph skills to Amp config globally
  --help, -h           Show this help message

Examples:
  npx github:vibeforge1111/vibeship-idearalph install
  npx github:vibeforge1111/vibeship-idearalph install --with-spawner
`);
}

// Main execution
if (command === 'install') {
  const withSpawner = flags.includes('--with-spawner');
  install(withSpawner);
} else if (!command || command === '--help' || command === '-h') {
  showHelp();
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run with --help for usage information');
  process.exit(1);
}
