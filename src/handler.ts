import { isBuiltin } from "node:module";
import path from "node:path";
import type {
  ImportDeclaration,
  ExportNamedDeclaration,
  ExportAllDeclaration,
  StringLiteral
} from "@oxc-project/types";
import type {
  HandlerArgs,
  HandlerFn,
  HandlerReturn,
  HandlerRolldownContext
} from "./internal-types.js";
import { isDependency, isDirectory, isProjectFile } from "./path.js";

type RolldownStatics = {
  literal: StringLiteral;
  code: string;
  id: string;
};

const handleNode = function (statics: RolldownStatics, args: HandlerArgs): HandlerReturn {
  let target = statics.literal.value;

  if (!isProjectFile(target) || isDependency(args.dependencies, target) || isBuiltin(target)) {
    return {
      code: statics.code,
      charOffset: 0
    };
  }

  try {
    if (isDirectory(path.join(statics.id, target))) target = path.join(target, "index");
  } catch {}

  const parsedSourceValue = path.parse(target);

  if (parsedSourceValue.ext === "") {
    statics.code =
      statics.code.slice(0, statics.literal.start + args.charOffset + 1) +
      target +
      args.options.defaultExtension +
      statics.code.slice(statics.literal.end + args.charOffset - 1);

    return {
      code: statics.code,
      charOffset: args.options.defaultExtension!.length
    };
  }

  if (args.options.extensions === undefined) {
    return {
      code: statics.code,
      charOffset: 0
    };
  }

  const replacementExtension = args.options.extensions[parsedSourceValue.ext];

  if (replacementExtension === undefined) {
    return {
      code: statics.code,
      charOffset: 0
    };
  }

  statics.code =
    statics.code.slice(0, statics.literal.end + args.charOffset - 1) +
    replacementExtension +
    statics.code.slice(statics.literal.end + args.charOffset - 1);

  return {
    code: statics.code,
    charOffset: replacementExtension.length
  };
};

const handleImportDeclaration: HandlerFn<ImportDeclaration> = function (
  context: HandlerRolldownContext<ImportDeclaration>,
  args: HandlerArgs
): HandlerReturn {
  return handleNode(
    {
      ...context,
      literal: context.node.source
    },
    args
  );
};

const handleExportNamedDeclaration: HandlerFn<ExportNamedDeclaration> = function (
  context: HandlerRolldownContext<ExportNamedDeclaration>,
  args: HandlerArgs
): HandlerReturn {
  if (context.node.source === null) {
    return {
      code: context.code,
      charOffset: 0
    };
  }

  return handleNode(
    {
      ...context,
      literal: context.node.source
    },
    args
  );
};

const handleExportAllDeclaration: HandlerFn<ExportAllDeclaration> = function (
  context: HandlerRolldownContext<ExportAllDeclaration>,
  args: HandlerArgs
): HandlerReturn {
  if (context.node.source === null) {
    return {
      code: context.code,
      charOffset: 0
    };
  }

  return handleNode(
    {
      ...context,
      literal: context.node.source
    },
    args
  );
};

export { handleImportDeclaration, handleExportNamedDeclaration, handleExportAllDeclaration };
