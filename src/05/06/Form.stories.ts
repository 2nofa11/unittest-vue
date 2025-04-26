import type { Meta, StoryObj } from "@storybook/vue3";
import { deliveryAddresses as fixtureDeliveryAddresses } from "./fixtures";
import Form from "./Form.vue";

export default {
  component: Form,
  argTypes: {
    deliveryAddresses: { control: "object" }, // Allow editing past addresses in Controls
  },
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

const baseArgs = {
  deliveryAddresses: fixtureDeliveryAddresses,
};

export const HasDeliveryAddresses: Story = {
  name: "過去のお届け先がある場合",
  args: {
    ...baseArgs,
  },
};

export const NoDeliveryAddresses: Story = {
  name: "過去のお届け先がない場合",
  args: {
    deliveryAddresses: [], // Override with empty array
  },
};
