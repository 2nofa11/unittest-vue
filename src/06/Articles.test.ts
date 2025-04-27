import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import Articles from "./Articles.vue";

describe("Articles.vue", () => {
  test("読み込み中の場合「...loading」が表示される", () => {
    const wrapper = mount(Articles, {
      props: { items: [], isLoading: true },
    });
    expect(wrapper.find('[data-test="loading-indicator"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading-indicator"]').text()).toBe(
      "...loading"
    );
  });

  test("一覧要素が空の場合「投稿記事がありません」が表示される", () => {
    const wrapper = mount(Articles, {
      props: { items: [], isLoading: false },
    });
    expect(wrapper.find('[data-test="no-articles-message"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test="no-articles-message"]').text()).toBe(
      "投稿記事がありません"
    );
  });

  test("一覧要素がある場合、一覧が表示される", () => {
    const items = [
      { id: 1, title: "Testing Next.js" },
      { id: 2, title: "Storybook play function" },
      { id: 3, title: "Visual Regression Testing" },
    ];
    const wrapper = mount(Articles, {
      props: { items: items, isLoading: false },
    });
    expect(wrapper.find('[data-test="article-list"]').exists()).toBe(true);

    const listItems = wrapper.findAll('[data-test="article-item"]'); // data-test 属性で検索
    expect(listItems).toHaveLength(items.length);
    items.forEach((item, index) => {
      expect(listItems[index].text()).toContain(item.title);
    });
  });
});
