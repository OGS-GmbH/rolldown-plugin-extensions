import type { Options } from "./types.js";

type Dependencies = Record<string, string | undefined>;

type HandlerRolldownContext<T> = {
  node: T;
  code: string;
  id: string;
};

type HandlerArgs = {
  dependencies: Dependencies;
  options: Options;
  charOffset: number;
};

type HandlerReturn = {
  charOffset: number;
  code: string;
};

type HandlerFn<T> = (context: HandlerRolldownContext<T>, args: HandlerArgs) => HandlerReturn;

export type { Dependencies, HandlerRolldownContext, HandlerArgs, HandlerReturn, HandlerFn };
