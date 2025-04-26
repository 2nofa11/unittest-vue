import type { Meta, StoryObj } from "@storybook/vue3";
import ArticleList from "./ArticleList.vue";
import { items } from "./fixture";

export default {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

type Story = StoryObj<typeof ArticleList>;

export const Default: Story = {
  args: { items },
};

export const NoItem: Story = {
  args: { items: [] },
};
