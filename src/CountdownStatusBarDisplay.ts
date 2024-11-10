import { format } from "./helpers/time";
import * as vscode from "vscode";

export interface UpdateOptions {
  icon?: "clock";
}

export class CountdownStatusBarDisplay {
  private statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
    // this.statusBarItem.command = "extension.startCountdown";
    this.statusBarItem.show();
  }

  public update(
    remaining: number,
    { icon }: UpdateOptions = { icon: "clock" }
  ): void {
    this.statusBarItem.text = `$(${icon}) ${format(remaining)}`;
  }

  public dispose() {
    this.statusBarItem.dispose();
  }
}
