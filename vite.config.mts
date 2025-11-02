/// <reference types="vite/client" />
/// <reference types="vitest" />

import { resolve } from "path"
import dts from "vite-plugin-dts"

import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    dts({
      include: ["src", "types"],
      exclude: ["test"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Undo",
      fileName: (format) =>
        format === "umd" ? "bundle.js" : `bundle.${format}.js`,
      formats: ["umd", "es"],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
})
