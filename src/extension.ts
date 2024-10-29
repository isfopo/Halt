/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from "vscode";
import { Worker } from "worker_threads";

import { HaltViewProvider } from "./HaltViewProvider";

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  // The channel for printing the result.
  const channel = vscode.window.createOutputChannel("Calculator");
  context.subscriptions.push(channel);

  // The channel for printing the log.
  const log = vscode.window.createOutputChannel("Calculator - Log", {
    log: true,
  });
  context.subscriptions.push(log);

  // Register the Panel
  const viewProvider = new HaltViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.commands.registerCommand("halt.show", async () => {
      viewProvider.show();

      channel.show();
    })
  );
}
