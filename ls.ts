import * as fs from 'fs';
import * as path from 'path';

const directoryPath = process.argv[2];

if (!fs.existsSync(directoryPath) || !fs.statSync(directoryPath).isDirectory()) {
  const errorMessage = `Error "${directoryPath}" is not a valid directory`;
  process.stderr.write(errorMessage);
  process.exit(1);
}

const files = fs.readdirSync(directoryPath);
if (files.length === 0) {
  process.exit(0);
}

const directories: string[] = [];
const regularFiles: string[] = [];

let totalSize = 0;

let i = 0;
while (i < files.length) {
  const file = files[i];
  const filePath = path.join(directoryPath, file);
  const fileStat = fs.statSync(filePath);

  if (fileStat.isDirectory()) {
    directories.push(file);
  } else if (fileStat.isFile()) {
    regularFiles.push(file);
    totalSize += fileStat.size;
  }

  i++;
}

console.log(`total ${Math.ceil(totalSize / 512)}`);

directories.sort((a, b) => a.localeCompare(b));

regularFiles.sort((a, b) => a.localeCompare(b));

let d = 0;
while (d < directories.length) {
  const directory = directories[d];
  const padding = ' '.repeat(Math.max(0, 10 - directory.length)).trimRight();
  const output = `Directory  ${directory}${padding}`;
  process.stdout.write(output + '\n');

  d++;
}

let f = 0;
while (f < regularFiles.length) {
  const file = regularFiles[f];
  const padding = ' '.repeat(Math.max(0, 10 - file.length)).trimRight();
  const output = `File       ${file}${padding}`;
  process.stdout.write(output + '\n');

  f++;
}
