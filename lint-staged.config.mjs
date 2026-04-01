export default {
  "*.{ts,mts,cts,js,mjs,cjs}": "oxlint",
  "*.{md,json,json5,jsonc}": "eslint",
  "*.{ts,mts,cts,js,mjs,cjs,md,json,json5,jsonc}": "oxfmt --check"
};
