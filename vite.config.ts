import { defineConfig } from "vite-plus";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";

export default defineConfig({
  base: "./",
  build: {
    license: {
      fileName: "license.md",
    },
  },
  plugins: [devtools(), solidPlugin()],
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
