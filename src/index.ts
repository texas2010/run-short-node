#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('run-short-node')
  .description(
    'Use shell to run complex logic in the JavaScript for Apple Shortcuts'
  )
  .argument('<functionName>', 'which shortcut function to run')
  .argument('<stringInput | jsonInput>', 'input for the function')
  .showHelpAfterError()
  .showSuggestionAfterError();

program.parse();
