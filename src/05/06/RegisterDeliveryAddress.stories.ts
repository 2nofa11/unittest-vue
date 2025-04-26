import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import RegisterDeliveryAddress from "./RegisterDeliveryAddress.vue";

export default {
  component: RegisterDeliveryAddress,
  argTypes: {
    // 'update:modelValue': { action: 'registered' }, // Optional: Action logger
  },
} satisfies Meta<typeof RegisterDeliveryAddress>;

type Story = StoryObj<typeof RegisterDeliveryAddress>;

export const Default: Story = {
  render: (args) => ({
    components: { RegisterDeliveryAddress },
    setup() {
      const register = ref(args.modelValue || false);
      return { register };
    },
    template: '<RegisterDeliveryAddress v-model="register" />',
  }),
  args: {
    modelValue: false,
  },
};

export const YesSelected: Story = {
  render: (args) => ({
    components: { RegisterDeliveryAddress },
    setup() {
      const register = ref(args.modelValue || true);
      return { register };
    },
    template: '<RegisterDeliveryAddress v-model="register" />',
  }),
  args: {
    modelValue: true,
  },
};
