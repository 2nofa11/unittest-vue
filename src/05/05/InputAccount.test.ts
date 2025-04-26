import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import InputAccount from "./InputAccount.vue";

describe("InputAccount.vue", () => {
  test("fieldset が表示され、legend が含まれる", () => {
    const wrapper = mount(InputAccount, { props: { email: "", password: "" } });
    const fieldset = wrapper.find('[data-test="input-account-fieldset"]');
    expect(fieldset.exists()).toBe(true);
    expect(fieldset.find("legend").text()).toBe("アカウント情報の入力");
  });

  test("メールアドレス入力欄", async () => {
    const wrapper = mount(InputAccount, { props: { email: "", password: "" } });
    const emailInput = wrapper.find<HTMLInputElement>(
      '[data-test="input-email"]'
    );
    const testEmail = "test@example.com";

    await emailInput.setValue(testEmail);

    expect(emailInput.element.value).toBe(testEmail);
  });

  test("パスワード入力欄", async () => {
    const wrapper = mount(InputAccount, { props: { email: "", password: "" } });
    const passwordInput = wrapper.find<HTMLInputElement>(
      '[data-test="input-password"]'
    );
    expect(passwordInput.element.placeholder).toBe("8文字以上で入力");
    const testPassword = "password123";

    await passwordInput.setValue(testPassword);

    expect(passwordInput.element.value).toBe(testPassword);
  });

  test("Snapshot: アカウント情報の入力フォームが表示される", () => {
    const wrapper = mount(InputAccount, { props: { email: "", password: "" } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
