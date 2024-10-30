import * as vscode from "vscode";
import { Worker } from "worker_threads";

export interface StartOptions {
  onFinish?: () => void;
  interval?: number;
  onInterval?: () => void;
}
export interface StopOptions {}

export class Timer {
  private static _instance: Timer;
  private readonly worker: Worker;
  private readonly context: vscode.ExtensionContext;

  private constructor(context: vscode.ExtensionContext) {
    this.context = context;

    this.worker = new Worker(
      new URL(
        vscode.Uri.file(
          `${this.context.extensionUri.path}/worker/timer.js`
        ).toString()
      )
    );
  }

  public static getInstance(context: vscode.ExtensionContext): Timer {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this(context));
  }

  public start(duration: number, {}: StartOptions = {}): void {}

  public stop({}: StopOptions): void {}
}
