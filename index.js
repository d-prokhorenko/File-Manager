import { stdout, stdin, argv } from 'process';

import {
  greetUser,
  printCWD,
  printInvalidInput,
  setUserHomeCWD,
} from './functions.js';
import { EXIT_COMMAND } from './constants.js';
import { cd, ls, up } from './nwd.js';
import { add, cat, copy, move, remove, rename } from './fileOperations.js';
import { operatingSystem } from './os.js';

function start() {
  const args = argv.slice(2);
  const userName = args.join('').split('=')[1];

  greetUser(userName);
  initListeners(userName);
  setUserHomeCWD();
  printCWD();
}

function initListeners(userName) {
  initExitListener(userName);
  initDataListener();
}

function initExitListener(userName) {
  process.on('exit', () =>
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  );
}

function initDataListener() {
  stdin.on('data', async (data) => {
    const dataToString = data.toString().trim();
    const [command, ...args] = dataToString.split(' ');

    switch (command) {
      case EXIT_COMMAND:
        process.exit();

      case 'up':
        up();
        break;

      case 'cd':
        cd(args);
        break;

      case 'ls':
        await ls();
        break;

      case 'cat':
        await cat(args);
        break;

      case 'add':
        await add(args);
        break;

      case 'rn':
        await rename(args);
        break;

      case 'cp':
        await copy(args);
        break;

      case 'mv':
        await move(args);
        break;

      case 'rm':
        await remove(args);
        break;

      case 'os':
        await operatingSystem(args);
        break;

      default:
        printInvalidInput();
        break;
    }

    printCWD();
  });

  process.on('SIGINT', () => process.exit());
}

start();
