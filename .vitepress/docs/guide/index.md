---
prev: false
next: false
---

# Getting started

## Installation

### Prerequisites

- Node.js version 18 or higher.
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm add -D @ogs-gmbh/rolldown-plugin-extensions
```

```sh [pnpm]
$ pnpm add -D @ogs-gmbh/rolldown-plugin-extensions
```

```sh [yarn]
$ yarn add -D @ogs-gmbh/rolldown-plugin-extensions
```

```sh [bun]
$ bun add -D @ogs-gmbh/rolldown-plugin-extensions
```

:::

### Usage

`rolldown-plugin-extensions` can be integrated with either [`tsdown`](https://tsdown.dev/) or [`Rolldown`](https://rolldown.rs/). Here's an example showing the usage of this plugin with `tsdown`. You can get a deeper understanding about this plugin by taking a look into the [reference](/reference).

```ts [tsdown.config.ts]
import { defineConfig } from "tsdown";
import { extensionsPlugin } from "@ogs-gmbh/rolldown-plugin-extensions";

export default defineConfig({
  entry: "src/**/*.ts",
  dts: true,
  outDir: "dist/main",
  unbundle: true,
  plugins: [
    extensionsPlugin({
      defaultExtensions: ".mjs",
      extensions: {
        ".js": ".mjs",
        ".ts": ".mts"
      }
    })
  ]
});
```

If a file gets referenced by any `import` or `export` statement, `.mjs` will be added to import targets, that doesn't include a extension. Files with `.js` and `.ts` extensions will be manipulated to have `.mjs` and `.mts` extensions instead.
