import { spawnSync } from 'child_process';

export function runShell(cmd: string, args: Array<string> = []) {
  if (process.env.NODE_ENV === 'testing') {
    console.group('--------runShell--------');
    console.log('command', cmd);
    console.log('command arugments', args);
  }

  const { status, stdout, stderr } = spawnSync(cmd, args, {
    shell: true,
    encoding: 'utf8',
  });

  if (process.env.NODE_ENV === 'testing') {
    console.log('status', status);
    console.log('stdout', stdout);
    console.log('stderr', stderr);

    console.groupEnd();
  }

  return { exitCode: status, stdout, stderr };
}
