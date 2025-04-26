import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import DeliveryAddress from "./DeliveryAddress.vue";

export default {
  component: DeliveryAddress,
  argTypes: {
    title: { control: "text" },
    postalCode: { control: "text" },
    prefecture: { control: "text" }, // Use text input for simplicity, or setup select control
    municipalities: { control: "text" },
    streetAddress: { control: "text" },
  },
} satisfies Meta<typeof DeliveryAddress>;

type Story = StoryObj<typeof DeliveryAddress>;

export const Default: Story = {
  render: (args) => ({
    components: { DeliveryAddress },
    setup() {
      const title = ref(args.title || "お届け先");
      const postalCode = ref(args.postalCode || "");
      const prefecture = ref(args.prefecture || "");
      const municipalities = ref(args.municipalities || "");
      const streetAddress = ref(args.streetAddress || "");
      return { title, postalCode, prefecture, municipalities, streetAddress };
    },
    template: `
      <DeliveryAddress
        :title="title"
        v-model:postalCode="postalCode"
        v-model:prefecture="prefecture"
        v-model:municipalities="municipalities"
        v-model:streetAddress="streetAddress"
      />
    `,
  }),
  args: {
    title: "配送先住所",
    postalCode: "123-4567",
    prefecture: "東京都",
    municipalities: "千代田区",
    streetAddress: "1-1-1",
  },
};
