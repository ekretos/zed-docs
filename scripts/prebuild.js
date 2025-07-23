#!/usr/bin/env node

// Pre-build script to remove problematic native dependencies
const fs = require('fs');
const path = require('path');

function removeSimpleGit() {
  try {
    // Multiple possible locations to check
    const possiblePaths = [
      path.join(process.cwd(), 'node_modules', '@napi-rs', 'simple-git'),
      path.join(process.cwd(), 'node_modules', '.pnpm', '@napi-rs+simple-git@0.1.20'),
      path.join(process.cwd(), 'node_modules', '.pnpm', '@napi-rs+simple-git'),
    ];
    
    let removed = false;
    
    for (const simpleGitPath of possiblePaths) {
      if (fs.existsSync(simpleGitPath)) {
        console.log(`Removing ${simpleGitPath} to prevent native binding issues...`);
        fs.rmSync(simpleGitPath, { recursive: true, force: true });
        console.log(`Successfully removed ${simpleGitPath}`);
        removed = true;
      }
    }
    
    // Also try to find and remove any .pnpm references
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      const pnpmPath = path.join(nodeModulesPath, '.pnpm');
      if (fs.existsSync(pnpmPath)) {
        const pnpmDirs = fs.readdirSync(pnpmPath);
        for (const dir of pnpmDirs) {
          if (dir.includes('simple-git')) {
            const fullPath = path.join(pnpmPath, dir);
            try {
              fs.rmSync(fullPath, { recursive: true, force: true });
              console.log(`Removed pnpm cache: ${fullPath}`);
              removed = true;
            } catch (e) {
              // Continue if we can't remove it
            }
          }
        }
      }
    }
    
    if (!removed) {
      console.log('No @napi-rs/simple-git found to remove');
    }
  } catch (error) {
    console.log('Note: Could not remove @napi-rs/simple-git, proceeding anyway:', error.message);
  }
}

// Also create a dummy module as fallback
function createDummyModule() {
  try {
    const dummyPath = path.join(process.cwd(), 'node_modules', '@napi-rs');
    if (!fs.existsSync(dummyPath)) {
      fs.mkdirSync(dummyPath, { recursive: true });
    }
    
    const simpleGitPath = path.join(dummyPath, 'simple-git');
    if (!fs.existsSync(simpleGitPath)) {
      fs.mkdirSync(simpleGitPath, { recursive: true });
    }
    
    const indexPath = path.join(simpleGitPath, 'index.js');
    const packagePath = path.join(simpleGitPath, 'package.json');
    
    // Create dummy index.js
    fs.writeFileSync(indexPath, `
// Dummy module to prevent native binding issues
module.exports = {
  getCommitDate: () => null,
  getLastCommitDate: () => null,
  getGitTimestamp: () => null,
  getCommitInfo: () => null,
  default: {},
};
`);
    
    // Create dummy package.json
    fs.writeFileSync(packagePath, `{
  "name": "@napi-rs/simple-git",
  "version": "0.0.0",
  "main": "index.js"
}`);
    
    console.log('Created dummy @napi-rs/simple-git module');
  } catch (error) {
    console.log('Could not create dummy module:', error.message);
  }
}

removeSimpleGit();
createDummyModule();
