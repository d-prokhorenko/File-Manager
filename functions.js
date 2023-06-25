import { stdout, chdir } from 'process';
import { homedir } from 'os';

export function greetUser(userName) {
  stdout.write(`Welcome to the File Manager, ${userName}!\n`);
}

export function printCWD() {
  stdout.write(`You are currently in ${process.cwd()}\n`);
}

export function printInvalidInput() {
  stdout.write('Invalid input\n');
}

export function printOperationFailed() {
  stdout.write('Operation failed\n');
}

export function setUserHomeCWD() {
  chdir(homedir());
}
