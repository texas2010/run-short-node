import { expect, test } from 'vitest';

import { execSync } from 'child_process';

test('runs a bash command', () => {
  const out = execSync('bash -c "echo hello test"').toString();
  expect(out.trim()).toBe('hello');
});
