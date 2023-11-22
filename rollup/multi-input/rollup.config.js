// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; // 解析js
import typescript from "@rollup/plugin-typescript"; // 解析ts

const getBasePlugins = (tsConfig) => {
  return [
    resolve(),
    commonjs(),
    typescript({
      ...tsConfig,
    }),
  ];
};

export default [
  // 主逻辑代码打包
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    plugins: [
      ...getBasePlugins({
        outDir: "dist",
        declaration: true,
        filterRoot: "src",
      }),
    ],
  },
  // adapter导出
  {
    input: {
      "web-request": "adapter/web-request.ts",
      "wx-request": "adapter/wx-request.ts",
    },
    output: [
      {
        dir: "lib",
        format: "esm",
        sourcemap: true
      },
    ],
    plugins: [
      ...getBasePlugins({
        outDir: "lib",
        declaration: true,
        filterRoot: "adapter",
      }),
    ],
  },
];
