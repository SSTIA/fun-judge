import child_process from 'child_process';

const utils = {};

utils.log = (type, data) => {
  console.log(JSON.stringify({ at: Date.now(), type, data }));
};

utils.spawnSandbox = (command, args, sandboxBin) => {
  let spawnCommand, spawnArgs;
  if (sandboxBin) {
    spawnCommand = sandboxBin;
    spawnArgs = [command, ...args];
    // TODO: Prepend sandbox args
  } else {
    spawnCommand = command;
    spawnArgs = args;
  }
  return child_process.spawn(spawnCommand, spawnArgs, {
    stdio: 'pipe',
  });
};

utils.terminateProcess = (child) => {
  if (child.stdout) {
    child.stdout.destroy();
  }
  if (child.stderr) {
    child.stderr.destroy();
  }
  try {
    child.kill('SIGKILL');
    // On Windows, SIGKILL will call TerminateProcess:
    // https://github.com/libuv/libuv/blob/1a96fe33343f82721ba8bc93adb5a67ddcf70ec4/src/win/process.c#L1169
  } catch (ignore) {
  }
};

export default utils;