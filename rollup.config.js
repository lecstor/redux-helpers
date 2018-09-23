import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const config = {
  input: "./src/index.ts",
  plugins: [
    typescript({
      clean: true,
      typescript: require("typescript"),
      tsconfigOverride: {
        exclude: ["node_modules", "test"]
      }
    })
  ],
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
};

export default config;

// import nodeResolve from "rollup-plugin-node-resolve";
// import babel from "rollup-plugin-babel";
// import replace from "rollup-plugin-replace";
// import commonjs from "rollup-plugin-commonjs";
// import uglify from "rollup-plugin-uglify";

// const env = process.env.NODE_ENV;

// const config = {
//   input: "index.js",
//   output: {
//     format: "umd",
//     name: "LecstorReduxHelpers"
//   },
//   plugins: [
//     nodeResolve(),
//     babel({
//       exclude: "**/node_modules/**"
//     }),
//     replace({
//       "process.env.NODE_ENV": JSON.stringify(env)
//     }),
//     commonjs()
//   ]
// };

// if (env === "production") {
//   config.plugins.push(
//     uglify({
//       compress: {
//         pure_getters: true,
//         unsafe: true,
//         unsafe_comps: true,
//         warnings: false
//       }
//     })
//   );
// }

// export default config;
