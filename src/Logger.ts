import * as vscode from "vscode";

export class Logger {
  private readonly context: vscode.ExtensionContext;
  readonly log: vscode.LogOutputChannel;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;

    // The channel for printing the log.
    this.log = vscode.window.createOutputChannel("Halt - Log", {
      log: true,
    });

    this.context.subscriptions.push(this.log);
  }
}
