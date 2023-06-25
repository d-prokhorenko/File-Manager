import { chdir, cwd } from 'node:process';
import { homedir } from 'os';
import { readdir, lstat } from 'fs/promises';
import path from 'path';
import { printOperationFailed } from './functions.js';

export function up() {
  if (homedir() !== cwd()) {
    try {
      chdir('../');
    } catch (error) {
      printOperationFailed();
    }
  }
}

export function cd(args) {
  try {
    chdir(`${args[0]}`);
  } catch (error) {
    printOperationFailed();
  }
}

export async function ls() {
  try {
    const promises = [];
    const items = await readdir(cwd());

    items.forEach((item) => {
      promises.push(lstat(path.join(cwd(), item)));
    });

    await Promise.all(promises).then((stats) => {
      const unsortedDirectories = [];
      const unsortedFiles = [];

      stats.forEach((stat, index) => {
        const isFile = stat.isFile();
        const item = {
          Name: items[index],
          Type: isFile ? 'file' : 'directory',
        };
        isFile ? unsortedFiles.push(item) : unsortedDirectories.push(item);
      });

      const sortedDirectories = unsortedDirectories.sort(
        (a, b) => a.Name > b.Name
      );
      const sortedFiles = unsortedFiles.sort((a, b) => a.Name > b.Name);

      console.table([...sortedDirectories, ...sortedFiles]);
    });
  } catch (error) {
    printOperationFailed();
  }
}
