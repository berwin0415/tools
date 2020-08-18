import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: {
      name: "is",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [commonjs(), typescript()],
  },
  {
    input: "src/index.ts",
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      babel({ exclude: "node_modules/**" }),
    ],
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
