import type { Meta, StoryObj } from "@storybook/vue3";
import Agreement from "./Agreement.vue";

export default {
  component: Agreement,
  args: {
    modelValue: false, // Default state
  },
  argTypes: {
    modelValue: { control: "boolean" }, // Add control for checkbox
    // 'update:modelValue': { action: 'updated' } // If you want to see the event in Actions tab
  },
} satisfies Meta<typeof Agreement>;

type Story = StoryObj<typeof Agreement>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    modelValue: true,
  },
};
