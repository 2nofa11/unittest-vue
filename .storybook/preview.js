export const parameters = {
  // actions: { argTypesRegex: "^on[A-Z].*" }, // Removed based on Storybook 8 recommendation
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
