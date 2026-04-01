import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  entry: "src/**/*.ts",
  dts: {
    enabled: true,
    sourcemap: true
  },
  outDir: "dist/main",
  unbundle: false,
  sourcemap: true,
  deps: { skipNodeModulesBundle: true, neverBundle: [/.*/] }
});
