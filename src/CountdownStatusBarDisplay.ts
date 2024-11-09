import * as vscode from "vscode";

export class CountdownStatusBarDisplay {
  private statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
    // this.statusBarItem.command = "extension.startCountdown";
    this.statusBarItem.show();
  }

  public update(remaining: number) {
    this.statusBarItem.text = `$(clock) ${remaining}`;
  }

  public dispose() {
    this.statusBarItem.dispose();
  }
}
