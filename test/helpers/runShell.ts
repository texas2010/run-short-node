import { spawnSync } from 'child_process';

export function runShell(cmd: string, args: Array<string> = []) {
  const { status, stdout, stderr } = spawnSync(cmd, args, {
    shell: true,
    encoding: 'utf8',
  });
  return { exitCode: status, stdout, stderr };
}
