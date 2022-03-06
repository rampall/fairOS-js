import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";

const config = [
  {
    input: "build/compiled/index.js",
    output: {
      file: "dist/fairos.js",
      format: "cjs",
      sourcemap: true,
    },
    external: ["axios"],
    plugins: [typescript(), resolve()],
  },
  {
    input: "build/compiled/index.d.ts",
    output: {
      file: "dist/fairos.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
export default config;
