import type { Meta, StoryObj } from "@storybook/vue3";
import RegisterAddress from "./RegisterAddress.vue";

export default {
  component: RegisterAddress,
} satisfies Meta<typeof RegisterAddress>;

type Story = StoryObj<typeof RegisterAddress>;

export const Default: Story = {};
