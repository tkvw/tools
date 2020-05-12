import vscode from "vscode";

export function registerVariable(
  context: vscode.ExtensionContext,
  variable: string,
  resolveVariable: () => string
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(variable, resolveVariable)
  );
}
