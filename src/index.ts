#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { Command } from 'commander';

const projectRoot = path.resolve(import.meta.dirname, '..');
const shortcutActionsPath = path.join(projectRoot, 'shortcutActions');

if (!fs.existsSync(shortcutActionsPath)) {
  console.error('shortcutActions folder not found! folder must be exist');
  process.exit(1);
}

const folderNames = fs.readdirSync(shortcutActionsPath).filter((name) => {
  const fullPath = path.join(shortcutActionsPath, name);
  return fs.statSync(fullPath).isDirectory();
});

const program = new Command();

program
  .name('run-short-node')
  .description(
    'Use shell to run complex logic in the JavaScript for Apple Shortcuts'
  )
  .argument('<shortcutAction>', 'which shortcut action to run')
  .argument('[stringInput | jsonInput]', 'input for the function')
  .action((shortcutAction: string, input) => {
    if (!folderNames.includes(shortcutAction)) {
      console.error('Unknown ShortcutAction:', shortcutAction);
      process.exit(1);
    }

    const actionPath = path.join(
      shortcutActionsPath,
      shortcutAction,
      'index.js'
    );

    import(pathToFileURL(actionPath).href)
      .then((mod) => {
        if (typeof mod.default === 'function') {
          mod.default(input);
        } else {
          console.error('No default export');
        }
      })
      .catch((err) => {
        console.error('Failed to load shortcut action:', err.message);
      });
  })
  .showHelpAfterError()
  .showSuggestionAfterError();

program.parse();
