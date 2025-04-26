import type { Meta, StoryObj } from "@storybook/vue3";
import InputAccount from "./InputAccount.vue";

export default {
  component: InputAccount,
  args: {
    email: "",
    password: "",
  },
  argTypes: {
    email: { control: "text" },
    password: { control: "text" },
  },
} satisfies Meta<typeof InputAccount>;

type Story = StoryObj<typeof InputAccount>;

export const Default: Story = {};
