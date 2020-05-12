import $path from "path";
import { exists } from "./exists";

export async function findUp(
  name: string | string[],
  options: { cwd?: string } = {}
) {
  let directory = $path.resolve(options.cwd || "");
  const { root } = $path.parse(directory);
  const paths = Array.isArray(name) ? name : [name];

  while (true) {
    for (const path in paths) {
      const check = $path.join(directory, path);
      if (await exists(check)) {
        return check;
      }
    }

    if (directory === root) {
      return;
    }

    directory = $path.dirname(directory);
  }
}
