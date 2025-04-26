import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Form from "./Form.vue";

export default {
  component: Form,
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => ({
    setup() {
      const email = ref("");
      const password = ref("");
      const checked = ref(false);
      return { email, password, checked };
    },
    components: { Form },
    template: "<Form v-model:email v-model:password v-model:checked />",
  }),
};
