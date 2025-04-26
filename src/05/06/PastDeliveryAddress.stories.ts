import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { AddressOption } from "./Form.vue";
import PastDeliveryAddress from "./PastDeliveryAddress.vue";

// Sample options data
const sampleOptions: AddressOption[] = [
  {
    id: "xxx",
    value: "xxx",
    children: "〒167-0051 東京都杉並区荻窪1-00-00",
  },
  {
    id: "yyy",
    value: "yyy",
    children: "〒150-0041 東京都渋谷区神南2-1-1",
  },
];

export default {
  component: PastDeliveryAddress,
  argTypes: {
    disabled: { control: "boolean" },
    // 'update:modelValue': { action: 'selected' } // Action for v-model update
  },
} satisfies Meta<typeof PastDeliveryAddress>;

type Story = StoryObj<typeof PastDeliveryAddress>;

// Base render function to handle v-model
const render = (args: any) => ({
  components: { PastDeliveryAddress },
  setup() {
    // Initialize ref with a value, potentially from args if needed for control, but not directly as a component prop arg
    const initialValue = args.options?.length > 0 ? args.options[0].value : "";
    const selectedAddress = ref(initialValue);
    // Pass down props explicitly defined in the component
    return { disabled: args.disabled, options: args.options, selectedAddress };
  },
  template:
    '<PastDeliveryAddress :disabled="disabled" :options="options" v-model="selectedAddress" />',
});

export const Enabled: Story = {
  render,
  args: {
    // Args should only contain props the component accepts
    disabled: false,
    options: sampleOptions,
    // selectedAddress: sampleOptions[0].value, // Removed from args
  },
};

export const Disabled: Story = {
  render,
  args: {
    // Args should only contain props the component accepts
    disabled: true,
    options: sampleOptions,
    // selectedAddress: sampleOptions[0].value, // Removed from args
  },
};
