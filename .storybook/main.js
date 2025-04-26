const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },

  docs: {
    autodocs: true
  }
};
