import * as vscode from "vscode";

export class Logger {
  static _instance: Logger;

  private readonly context: vscode.ExtensionContext;
  readonly log: vscode.LogOutputChannel;

  private constructor(context: vscode.ExtensionContext) {
    this.context = context;

    // The channel for printing the log.
    this.log = vscode.window.createOutputChannel("Halt - Log", {
      log: true,
    });

    this.context.subscriptions.push(this.log);
  }

  public static getInstance(context: vscode.ExtensionContext): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger(context);
    }

    return Logger._instance;
  }
}
