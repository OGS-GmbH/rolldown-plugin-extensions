> _We're OGS, check out our work on [github.com/ogs-gmbh](https://github.com/ogs-gmbh)_

# Extension Plugin for Rolldown

_Handles and resolves import extensions automatically, ensuring consistent module specifiers and seamless compatibility across different environments and build configurations._

![Preview](./docs/preview.avif)

<a href="./LICENSE" target="_blank"><img alt="license badge" src="https://img.shields.io/github/license/OGS-GmbH/rolldown-plugin-extensions?color=0f434e&logo=hackthebox&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://github.com/OGS-GmbH/rolldown-plugin-extensions/actions/workflows/main-trusted-deploy.yml" target="_blank"><img alt="workflow badge" src="https://img.shields.io/github/actions/workflow/status/OGS-GmbH/rolldown-plugin-extensions/main-trusted-deploy.yml?color=0f434e&logo=rocket&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://www.npmjs.com/package/@ogs-gmbh/rolldown-plugin-extensions" target="_blank"><img alt="npm badge" src="https://img.shields.io/npm/v/%40ogs-gmbh%2Frolldown-plugin-extensions?color=0f434e&logo=npm&logoColor=000000&labelColor=ffffff" /></a>

- **Default Extension Resolution**\
  Assigns a predefined default extension to imports that omit an explicit file extension.

- **Extension Transformation**\
  Converts existing import extensions into alternative target extensions according to configurable rules.

- **ESM Compliance**\
  Maintains compatibility with ECMAScript module semantics and modern Node.js resolution behavior.

- **Transparent Integration**\
  Integrates seamlessly into existing build pipelines with minimal configuration overhead.

## Getting Started

> [!IMPORTANT]
> We're offering an extensive API-Reference covered with in-depth usage examples of this project.

To get a starting point, simply refer to our documentation at [ogs-gmbh.github.io/rolldown-plugin-extensions](https://ogs-gmbh.github.io/rolldown-plugin-extensions).

### Prerequisites

- Node.js version 18 or higher
- A package manager: e.g. npm, pnpm, ...

### Installation

Using npm:

```sh
$ npm add -D @ogs-gmbh/rolldown-plugin-extensions
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>
  
  Using yarn:
  ```sh
  $ pnpm add -D @ogs-gmbh/rolldown-plugin-extensions
  ```
  
  Using pnpm:
  ```sh
  $ pnpm add -D @ogs-gmbh/rolldown-plugin-extensions
  ```
  
  Using bun:
  ```sh
  $ bun add -D @ogs-gmbh/rolldown-plugin-extensions
  ```

</details>

### Usage

`rolldown-plugin-extensions` can be integrated with either [`tsdown`](https://tsdown.dev/) or [`Rolldown`](https://rolldown.rs/). Here's an example showing the usage of this plugin with `tsdown`. You can get a deeper understanding about this plugin by taking a look into the [reference](https://ogs-gmbh.github.io/rolldown-plugin-extensions/reference).

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

## License

The MIT License (MIT) - Please have a look at the [LICENSE file](./LICENSE) for more details.

## Contributing

Contributions are always welcome and greatly appreciated. Whether you want to report a bug, suggest a new feature, or improve the documentation, your input helps make the project better for everyone.

Feel free to submit a pull request, issue or feature request.

### Issues and Feature Requests

Reporting an issue or creating a feature request is made by creating a new issue on this repository.

You can create a [new issue or feature request here](../../issues/new/choose).

### Pull Requests

GitHub offers a solid guideline for contributing to open source projects through pull requests, covering key practices. These best practices provide a reliable starting point for making effective contributions.

You can find the [guidelines here](https://docs.github.com/get-started/exploring-projects-on-github/contributing-to-a-project).

### Code Of Conduct

We are committed to keeping a welcoming, inclusive, and respectful community for everyone. To help us achieve this, we kindly ask that you adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Disclaimer

All trademarks and registered trademarks mentioned are property of their respective owners and are used for identification purposes only. Use of these names does not imply endorsement or affiliation.

This project is a trademark of OGS Gesellschaft für Datenverarbeitung und Systemberatung mbH. The License does not grant rights to use the trademark without permission.

---

<a href="https://www.ogs.de/en/">
  <picture>
    <source
      srcset="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/light.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img height="64" alt="OGS Logo" src="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/dark.svg"
  </picture>
</a>

Gesellschaft für Datenverarbeitung und Systemberatung mbH

[Imprint](https://www.ogs.de/en/imprint/) | [Contact](https://www.ogs.de/en/contact/) | [Careers](https://www.ogs.de/en/about-ogs/#Careers)
