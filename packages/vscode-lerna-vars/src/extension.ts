// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from "vscode";
import { findParent } from "./findParent";
import { registerVariable } from "./registerVariable";
import { withActiveEditor } from "./editor";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  var files = ["lerna.json", "package.json", "tsconfig.json"];

  const findParentFolder = (file: string) =>
    withActiveEditor((editor) => findParent(file, editor.document.fileName));
  const findRelative = (file: string) =>
    withActiveEditor((editor) => {
      const currentFile = editor.document.fileName;
      const parent = findParent(file, currentFile);
      return parent ? currentFile.substring(parent.length) : undefined;
    });
  const folderVar = (file: string) => `tkvw.vars.folder.${file}`;
  const relativeVar = (file: string) => `tkvw.vars.fileRelativeTo.${file}`;

  files.forEach((file) => {
    registerVariable(context, folderVar(file), () => findParentFolder(file));
    registerVariable(context, relativeVar(file), () => findRelative(file));
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("tkvw.showVars", () => {
      withActiveEditor((editor) => {
        const message = files.reduce((acc, file) => {
          acc = acc + folderVar(file) + ": " + findParentFolder(file) + "\n";
          acc = acc + relativeVar(file) + ": " + findRelative(file) + "\n";
          return acc;
        }, "");

        vscode.window.showInformationMessage(message, {
          modal: true,
        });
      });
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
