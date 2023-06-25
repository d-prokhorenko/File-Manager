import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { join, basename } from 'path';
import { pipeline } from 'stream/promises';
import { printOperationFailed } from './functions.js';

export async function compressBrotli(args) {
  try {
    const READ_FILE_NAME = args[0];
    const WRITE_FILE_NAME = join(args[1], `${basename(args[0])}.br`);

    const readStream = createReadStream(READ_FILE_NAME);
    const writeStream = createWriteStream(WRITE_FILE_NAME);

    const brotli = createBrotliCompress();

    await pipeline(readStream, brotli, writeStream);
  } catch (error) {
    printOperationFailed();
  }
}

export async function decompressBrotli(args) {
  try {
    const fileName = basename(args[0]);
    console.log(fileName);
    const READ_FILE_NAME = args[0];
    const WRITE_FILE_NAME = join(
      args[1],
      `${fileName.slice(0, fileName.length - 3)}`
    );

    const readStream = createReadStream(READ_FILE_NAME);
    const writeStream = createWriteStream(WRITE_FILE_NAME);

    const brotli = createBrotliDecompress();

    await pipeline(readStream, brotli, writeStream);
  } catch (error) {
    printOperationFailed();
  }
}
