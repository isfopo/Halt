/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from "vscode";

import { HaltViewProvider } from "./HaltViewProvider";
import { Timer } from "./Timer";
import { Logger } from "./Logger";

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  // Create logger
  const logger = Logger.getInstance(context);

  try {
    const timer = new Timer();

    // Register the Panel
    const viewProvider = new HaltViewProvider(context.extensionUri);

    context.subscriptions.push(
      vscode.commands.registerCommand("halt.show", async () => {
        logger.log.show();
        logger.log.appendLine("Show");

        timer.start(1000, {
          onFinish: () => {
            viewProvider.show();
          },
        });
      })
    );
  } catch (e) {
    logger.log.show();
    logger.log.error(e as string);
  }
}
