import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      name: "is",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [commonjs()],
  },
  {
    input: "src/index.js",
    plugins: [babel({ exclude: "node_modules/**" })],
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
  },
];
