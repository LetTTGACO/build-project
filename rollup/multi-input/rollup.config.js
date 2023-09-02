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
      dir: "dist/cjs", // 打包到cjs目录
      format: "cjs", // 以cjs模式打包
      exports: "named", // 指定导出模式（自动、默认、命名、无）
      preserveModules: true, // 保留模块结构，以原来的文件夹结构输出js
      preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
    },
    plugins: [
      ...getBasePlugins({
        outDir: "dist/cjs", // 声明文件输出目录
        declaration: true,
        // 指定声明文件的解析目录，这里主要是用于忽略adapter目录
        filterRoot: "src",
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      ...getBasePlugins({
        outDir: "dist/esm",
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
        dir: "dist/cjs/adapter",
        format: "cjs",
      },
    ],
    plugins: [
      ...getBasePlugins({
        outDir: "dist/cjs/adapter",
        declaration: true,
        // 指定声明文件的解析目录，这里主要是用于忽略src目录
        // 注意tsconfig.json中不要指定rootDir，否则会导致adapter目录识别不到
        filterRoot: "adapter",
      }),
    ],
  },
  {
    input: {
      "web-request": "adapter/web-request.ts",
      "wx-request": "adapter/wx-request.ts",
    },
    output: [
      {
        dir: "dist/esm/adapter",
        format: "esm",
      },
    ],
    plugins: [
      ...getBasePlugins({
        outDir: "dist/esm/adapter",
        declaration: true,
        filterRoot: "adapter",
      }),
    ],
  },
];
