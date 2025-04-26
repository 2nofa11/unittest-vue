import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import ArticleListItem, { type ItemProps } from "./ArticleListItem.vue";

const item: ItemProps = {
  id: "howto-testing-with-typescript",
  title: "TypeScript を使ったテストの書き方",
  body: "テストを書く時、TypeScript を使うことで、テストの保守性が向上します…",
};

describe("ArticleListItem.vue", () => {
  test("ID に紐づいたリンクが表示される", () => {
    const wrapper = mount(ArticleListItem, { props: item });
    const link = wrapper.find('[data-test="article-link"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("もっと見る");
    expect(link.attributes("href")).toBe(
      "/articles/howto-testing-with-typescript"
    );
  });

  test("Snapshot: 一覧要素が表示される", () => {
    const wrapper = mount(ArticleListItem, { props: item });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
