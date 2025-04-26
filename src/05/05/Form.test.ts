import { mount } from "@vue/test-utils";
import Form from "./Form.vue";

describe("Form.vue", () => {
  test("主要エリアが表示されている", () => {
    const wrapper = mount(Form);
    expect(wrapper.find("h2").text()).toBe("新規アカウント登録");
    expect(wrapper.find('[data-test="input-account-legend"]').text()).toBe(
      "アカウント情報の入力"
    );
    expect(wrapper.find('[data-test="agreement-legend"]').text()).toBe(
      "利用規約の同意"
    );
    expect(wrapper.find('[data-test="submit-button"]').text()).toBe(
      "サインアップ"
    );
  });

  test("初期状態では「サインアップ」ボタンは非活性", () => {
    const wrapper = mount(Form);
    const button = wrapper.find('[data-test="submit-button"]');
    expect(button.attributes("disabled")).toBeDefined(); // disabled 属性が存在する
  });

  test("「利用規約の同意」チェックボックスをチェックすると「サインアップ」ボタンは活性化", async () => {
    const wrapper = mount(Form);
    const checkbox = wrapper.find('[data-test="agreement-checkbox"]');
    const button = wrapper.find('[data-test="submit-button"]');

    expect(button.attributes("disabled")).toBeDefined(); // 初期状態は非活性
    await checkbox.setValue(true);
    expect(button.attributes("disabled")).toBeUndefined(); // 活性化 (disabled 属性がなくなる)
  });

  test("Snapshot: 新規アカウント登録フォームが表示される", () => {
    const wrapper = mount(Form);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
