import { stdout } from 'process';
import { createReadStream, createWriteStream } from 'fs';
import { join, basename } from 'path';
import { writeFile, rename as fileRename, rm } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { printOperationFailed } from './functions.js';

export async function cat(args) {
  return new Promise((res, rej) => {
    const stream = createReadStream(args[0], 'utf-8');

    let data = '';

    stream.on('data', (chunk) => {
      data += chunk;
    });
    stream.on('end', () => {
      stdout.write(`${data}\n`);
      res();
    });
    stream.on('error', (error) => {
      printOperationFailed();
      res();
    });
  });
}

export async function add(args) {
  try {
    await writeFile(args[0], '', { flag: 'wx' });
  } catch (err) {
    printOperationFailed();
  }
}

export async function rename(args) {
  try {
    await fileRename(args[0], join(args[0], args[1]));
  } catch (err) {
    printOperationFailed();
  }
}

export async function copy(args) {
  try {
    const readable = createReadStream(args[0], {
      encoding: 'utf8',
    });
    const writable = createWriteStream(join(args[1], basename(args[0])));

    await pipeline(readable, writable);
  } catch (error) {
    printOperationFailed();
  }
}

export async function move(args) {
  try {
    await copy(args);
    await rm(args[0]);
  } catch (error) {
    printOperationFailed();
  }
}

export async function remove(args) {
  try {
    await rm(args[0]);
  } catch (err) {
    printOperationFailed();
  }
}
