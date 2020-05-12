# Visual Studio Command Variables

Just some sanity command variables for use when developing inside a lerna monorepo.

- `tkvw.vars.folder.package.json`: returns the first parent folder with `lerna.json` inside it.
- `tkvw.vars.fileRelativeTo.package.json`: returns the first parent folder with `lerna.json` inside it.
- `tkvw.vars.folder.tsconfig.json`: return the first parent folder with `package.json` inside it.
- `tkvw.vars.fileRelativeTo.package.json`: returns the first parent folder with `lerna.json` inside it.
- `tkvw.vars.folder.lerna.json`: return the first parent folder with `tsconfig.json` inside it.
- `tkvw.vars.fileRelativeTo.package.json`: returns the first parent folder with `lerna.json` inside it.


## Usage

An example `launch.json`:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug current file",
      "type": "node",
      "args": ["${command:tkvw.vars.fileRelativeTo.package.json}"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "cwd":"${command:tkvw.vars.package.json}",
      "request": "launch",
      "protocol": "inspector",
    }
  ]
}
```