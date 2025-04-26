import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import Form from "./Form.vue";

describe("Form.vue", () => {
  test("名前の表示", () => {
    const wrapper = mount(Form, { props: { name: "taro" } });
    expect(wrapper.text()).toContain("taro");
  });

  test("ボタンの表示", () => {
    const wrapper = mount(Form, { props: { name: "taro" } });
    expect(wrapper.find("button").exists()).toBe(true);
  });

  test("見出しの表示", () => {
    const wrapper = mount(Form, { props: { name: "taro" } });
    expect(wrapper.find("h2").text()).toBe("アカウント情報");
  });

  test("ボタンを押下すると、イベントハンドラーが呼ばれる", async () => {
    const wrapper = mount(Form, { props: { name: "taro" } });
    await wrapper.find("form").trigger("submit");
    expect(wrapper.emitted().submit).toBeTruthy();
  });

  test("Snapshot: アカウント名「taro」が表示される", () => {
    const wrapper = mount(Form, { props: { name: "taro" } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // test("logRoles: レンダリング結果からロール・アクセシブルネームを確認", () => { });
});
