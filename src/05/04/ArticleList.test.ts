import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import ArticleList from "./ArticleList.vue";
import { items } from "./fixture";

describe("ArticleList.vue", () => {
  test("タイトルの表示", () => {
    const wrapper = mount(ArticleList, { props: { items } });
    const heading = wrapper.find('[data-test="article-list-heading"]');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("記事一覧");
  });

  test("items の数だけ一覧表示される", () => {
    const wrapper = mount(ArticleList, { props: { items } });
    expect(wrapper.findAll('[data-test="article-list-item"]').length).toBe(
      items.length
    );
  });

  test("一覧アイテムが空のとき「投稿記事がありません」が表示される", () => {
    const wrapper = mount(ArticleList, { props: { items: [] } });
    const list = wrapper.find('[data-test="article-list"]');
    expect(list.exists()).toBe(false);
    const message = wrapper.find('[data-test="no-articles-message"]');
    expect(message.exists()).toBe(true);
    expect(message.text()).toContain("投稿記事がありません");
  });

  test("Snapshot: items の数だけ一覧表示される", () => {
    const wrapper = mount(ArticleList, { props: { items } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
