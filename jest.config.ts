export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "ts", "vue"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["esbuild-jest", { sourcemap: true }],
    "^.+\\.vue$": ["@vue/vue3-jest", { sourcemap: true }],
  },
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
