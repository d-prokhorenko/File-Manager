import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { stdout } from 'process';
import { printOperationFailed } from './functions.js';
import { EOL } from 'os';

export const calculateHash = async (args) => {
  try {
    const data = await readFile(args[0]);
    const hex = createHash('sha256').update(data).digest('hex');

    stdout.write(`${hex}${EOL}`);
  } catch (err) {
    printOperationFailed();
  }
};
