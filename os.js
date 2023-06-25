import { stdout } from 'process';
import { EOL, arch, cpus, homedir, userInfo } from 'os';
import { printInvalidInput, printOperationFailed } from './functions.js';

export function operatingSystem(args) {
  try {
    switch (args[0]) {
      case '--EOL':
        stdout.write(`${JSON.stringify(EOL)}${EOL}`);
        break;

      case '--cpus':
        stdout.write(getCPUSInfo());
        break;

      case '--homedir':
        stdout.write(`${homedir()}${EOL}`);
        break;

      case '--username':
        stdout.write(`${userInfo().username}${EOL}`);
        break;

      case '--architecture':
        stdout.write(`${arch()}${EOL}`);
        break;

      default:
        printInvalidInput();
        break;
    }
  } catch (error) {
    printOperationFailed();
  }
}

function getCPUSInfo() {
  return `${cpus().reduce((res, { model, speed }, index, cpus) => {
    res += `${index === 0 ? `CPUS: ${cpus.length + EOL}` : ''}CPU ${
      index + 1
    }: ${model} - ${speed / 1000} GHz${EOL}`;
    return res;
  }, '')}`;
}
