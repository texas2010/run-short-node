import fs from 'fs';
import { expect, test, describe, beforeAll } from 'vitest';

import { runShell } from './helpers/runShell';

import { execSync } from 'child_process';

describe('Checking run-short-node shell', () => {
  beforeAll(() => {
    runShell('mkdir', ['shortcutActions']);

    runShell('npm', ['run', 'build']);
    runShell('npm', ['link']);
  });

  test('Should be exist when we search shell', () => {
    const { exitCode, stdout } = runShell('which', ['run-short-node']);
    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(/run-short-node$/);
  });

  test('Should be exist when shell show up in the cli', () => {
    const { exitCode, stderr } = runShell('run-short-node');

    expect(exitCode).toBe(1);
    expect(stderr.trim()).toMatch(/Usage: run-short-node/);
  });

  test('Should be exist when shell with --help', () => {
    const { exitCode, stdout } = runShell('run-short-node', ['--help']);

    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(/display help for command/);
  });

  test('Should not accept when ShortcutAction argument is not exist in their folder', () => {
    const { exitCode, stderr } = runShell('run-short-node', [
      'notExistShortcutAction',
    ]);

    expect(exitCode).toBe(1);
    expect(stderr.trim()).toMatch(
      /Unknown ShortcutAction: notExistShortcutAction/
    );
  });

  test('Should accept when ShortcutAction code is exist in the file', () => {
    const shortcutAction = 'existShortcutAction';
    const filecontent = 'ShortcutAction is exist in the file';
    const dirPath = `shortcutActions/${shortcutAction}`;

    fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(
      `${dirPath}/index.js`,
      `export default function() { console.log("${filecontent}"); }`
    );

    const { exitCode, stdout } = runShell('run-short-node', [shortcutAction]);

    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(filecontent);
  });

  test('Should accept when shortcutAction and string input is exist.', () => {
    const shortcutAction = 'existShortcutActionWithStringInput';
    const filecontent = 'ShortcutAction with string input is exist in the file';
    const dirPath = `shortcutActions/${shortcutAction}`;

    fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(
      `${dirPath}/index.js`,
      `export default function(input) { console.log(input); }`
    );

    const { exitCode, stdout } = runShell('run-short-node', [
      shortcutAction,
      `"${filecontent}"`,
    ]);

    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(filecontent);
  });

  test('Should accept when shortcutAction and json input is exist.', () => {
    const shortcutAction = 'existShortcutActionWithJSONInput';
    const jsonInput = JSON.stringify({ message: 'hello' });
    const safeJsonInput = `"${jsonInput.replace(/"/g, '\\"')}"`;
    const dirPath = `shortcutActions/${shortcutAction}`;

    fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(
      `${dirPath}/index.js`,
      `export default function(input) { console.log(input); }`
    );

    const { exitCode, stdout } = runShell('run-short-node', [
      shortcutAction,
      safeJsonInput,
    ]);

    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(jsonInput);
  });

  // end testing
});
