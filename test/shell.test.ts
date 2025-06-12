import { expect, test, describe, beforeAll } from 'vitest';

import { runShell } from './helpers/runShell';

describe('Checking run-short-node shell', () => {
  beforeAll(() => {
    runShell('npm', ['run', 'build']);
    runShell('npm', ['link']);
  });

  test('binary is on PATH', () => {
    const { exitCode, stdout } = runShell('which', ['run-short-node']);
    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(/run-short-node$/);
  });

  test('binary responds to --version', () => {
    const { exitCode, stdout } = runShell('run-short-node', ['--version']);
    expect(exitCode).toBe(0);
    expect(stdout.trim()).toMatch(/\d+\.\d+\.\d+/);
  });

  test('should be exist when shell show up in the global', () => {
    // runShell('run-short-node')
  });
});
