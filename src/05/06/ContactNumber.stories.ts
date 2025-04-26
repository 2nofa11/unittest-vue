import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import ContactNumber from "./ContactNumber.vue";

export default {
  component: ContactNumber,
  argTypes: {
    phoneNumber: { control: "text" },
    name: { control: "text" },
  },
} satisfies Meta<typeof ContactNumber>;

type Story = StoryObj<typeof ContactNumber>;

export const Default: Story = {
  render: (args) => ({
    components: { ContactNumber },
    setup() {
      // Storybook Controls で初期値を設定・変更できるように ref を用意
      const phoneNumber = ref(args.phoneNumber || "");
      const name = ref(args.name || "");
      return { phoneNumber, name };
    },
    template:
      '<ContactNumber v-model:phoneNumber="phoneNumber" v-model:name="name" />',
  }),
  args: {
    // Controls パネルでの初期値
    phoneNumber: "090-1234-5678",
    name: "山田 太郎",
  },
};
