/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from "vscode";
import { Worker } from "worker_threads";

import { HaltViewProvider } from "./HaltViewProvider";
import { channel } from "diagnostics_channel";
import { Logger } from "./Logger";

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  // Create logger
  const logger = new Logger(context);

  // Register the Panel
  const viewProvider = new HaltViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.commands.registerCommand("halt.show", async () => {
      viewProvider.show();
    })
  );
}
