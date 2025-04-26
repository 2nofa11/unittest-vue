import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import Agreement from "./Agreement.vue";

describe("Agreement.vue", () => {
  test("fieldset が表示され、legend が含まれる", () => {
    const wrapper = mount(Agreement, { props: { modelValue: false } });
    const fieldset = wrapper.find('[data-test="agreement-fieldset"]');
    expect(fieldset.exists()).toBe(true);
    expect(fieldset.find("legend").text()).toBe("利用規約の同意");
  });

  test("チェックボックスはチェックが入っていない", () => {
    const wrapper = mount(Agreement, { props: { modelValue: false } });
    const checkbox = wrapper.find<HTMLInputElement>(
      '[data-test="agreement-checkbox"]'
    );
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.element.checked).toBe(false);
  });

  test("利用規約へのリンクがある", () => {
    const wrapper = mount(Agreement, { props: { modelValue: false } });
    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("利用規約");
    expect(link.attributes("href")).toBe("/terms");
  });

  test("Snapshot: 利用規約の同意が表示される", () => {
    const wrapper = mount(Agreement, { props: { modelValue: false } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
