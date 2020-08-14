import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "lib/is.js",
    format: "cjs",
  },
  plugins: [typescript()],
};
