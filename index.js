import { stdout, stdin, argv } from 'process';

import {
  greetUser,
  printCWD,
  printInvalidInput,
  setUserHomeCWD,
} from './functions.js';
import { EXIT_COMMAND } from './constants.js';
import { cd, ls, up } from './nwd.js';

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
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`)
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

      default:
        printInvalidInput();
        break;
    }

    printCWD();
  });

  process.on('SIGINT', () => process.exit());
}

start();
