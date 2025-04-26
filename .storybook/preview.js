import React from "react";
import { createApp } from "vue";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const component = context.component;
    // Identify Vue component (check for typical keys or __file extension)
    const isVue =
      component &&
      (component.setup ||
        component.render ||
        component.template ||
        component.__file?.endsWith(".vue"));

    if (!isVue) {
      // Not a Vue story, render it normally (assuming React)
      return <Story {...context.args} />;
    }

    // It's a Vue story, return a React component that mounts the Vue component
    const VueWrapper = ({ args }) => {
      const vueRootRef = React.useRef(null);

      React.useEffect(() => {
        if (vueRootRef.current) {
          const app = createApp(component, args);
          app.mount(vueRootRef.current);
          // Cleanup on unmount
          return () => app.unmount();
        }
      }, [args]); // Re-mount if args change

      // Render the div element that Vue will mount into
      return <div ref={vueRootRef} />;
    };

    // Pass the story's args to the VueWrapper
    return <VueWrapper args={context.args} />;
  },
];
