/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Connection, RAL } from "@vscode/wasm-component-model";
import { timer } from "./timer";

async function main(): Promise<void> {
  const connection = await Connection.createWorker(timer._);
  connection.listen();
}

main().catch(RAL().console.error);
