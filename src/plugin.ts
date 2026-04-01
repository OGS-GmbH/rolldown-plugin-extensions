import type {
  ExportAllDeclaration,
  ExportNamedDeclaration,
  ImportDeclaration
} from "@oxc-project/types";
import type { Plugin, TransformPluginContext } from "rolldown";
import {
  handleExportAllDeclaration,
  handleExportNamedDeclaration,
  handleImportDeclaration
} from "./handler.js";
import type { HandlerArgs, HandlerReturn, HandlerRolldownContext } from "./internal-types.js";
import { getDependencies, getPackageJson } from "./meta.js";
import { fallbackDefaultExtension } from "./options.js";
import type { Options } from "./types.js";

/**
 * A Rollup plugin that adds extensions to import statements that are missing them, and optionally replaces existing extensions with specified ones.
 * @param options - {@link Options} to configure the plugin's behavior.
 * @returns A Rollup plugin
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Plugin
 */
function extensionsPlugin(options?: Options): Plugin {
  const defaultExtension = options?.defaultExtension ?? fallbackDefaultExtension;
  const packageJson = getPackageJson();
  const dependencies = getDependencies(packageJson);

  return {
    name: "extensions-plugin",
    transform(this: TransformPluginContext, code: string, id: string, meta) {
      if (meta.ast?.sourceType !== "module") return code;

      let charOffset = 0;

      for (const bodyItem of meta.ast.body) {
        const handlerContext: HandlerRolldownContext<unknown> = {
          node: bodyItem,
          code,
          id
        };
        const handleArgs: HandlerArgs = {
          dependencies,
          options: {
            ...options,
            defaultExtension
          },
          charOffset
        };
        let result: HandlerReturn;

        switch (bodyItem.type) {
          case "ImportDeclaration": {
            result = handleImportDeclaration(
              handlerContext as HandlerRolldownContext<ImportDeclaration>,
              handleArgs
            );
            break;
          }

          case "ExportNamedDeclaration": {
            result = handleExportNamedDeclaration(
              handlerContext as HandlerRolldownContext<ExportNamedDeclaration>,
              handleArgs
            );
            break;
          }

          case "ExportAllDeclaration": {
            result = handleExportAllDeclaration(
              handlerContext as HandlerRolldownContext<ExportAllDeclaration>,
              handleArgs
            );
            break;
          }

          default: {
            continue;
          }
        }

        code = result.code; // oxlint-disable-line eslint(no-param-reassign);
        charOffset += result.charOffset;
      }

      return {
        code
      };
    }
  };
}

export { extensionsPlugin };
