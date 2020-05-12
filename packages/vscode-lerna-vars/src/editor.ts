import vscode from "vscode";

export function withActiveEditor(
  callback: (editor: vscode.TextEditor) => any
) {
  if (vscode.window.activeTextEditor) {
    return callback(vscode.window.activeTextEditor);
  }
}
