import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "lib/emitter.js",
    format: "cjs",
  },
  plugins: [typescript()],
};
