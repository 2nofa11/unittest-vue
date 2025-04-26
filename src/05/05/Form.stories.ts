import type { Meta, StoryObj } from "@storybook/vue3";
import Form from "./Form.vue";

export default {
  component: Form,
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};
