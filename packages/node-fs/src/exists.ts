import fs from "fs";

export function exists(path: string): Promise<boolean> {
  return new Promise((resolve, reject) =>
    fs.stat(path, (err, stat) => {
      if (err) return resolve(false);
      return resolve(true);
    })
  );
}
