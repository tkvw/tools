import * as path from "path";
import * as fs from "fs";

export function findParent(filename: string, folderOrFile: string): string {
  const folder = fs.lstatSync(folderOrFile).isFile()
    ? path.dirname(folderOrFile)
    : folderOrFile;

  const option = path.join(folder, filename);
  if (fs.existsSync(option)) {
    return folder + path.sep;
  }
  const parentFolder = path.normalize(folder + "/..");
  const isPathRoot = parentFolder == folder;
  if (isPathRoot) {
    return undefined;
  }
  return findParent(filename, parentFolder);
}
