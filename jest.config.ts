export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "vue"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["esbuild-jest", { sourcemap: true }],
    "^.+\\.vue$": ["@vue/vue3-jest", { sourcemap: true }],
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "__reports__",
        filename: "jest.html",
      },
    ],
  ],
};
