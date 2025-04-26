import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import ContactNumber from "./ContactNumber.vue";

describe("連絡先", () => {
  test("タイトルが表示される", () => {
    const wrapper = mount(ContactNumber);
    const legend = wrapper.find('[data-test="contact-legend"]');
    expect(legend.exists()).toBe(true);
    expect(legend.text()).toBe("連絡先");
  });

  test("電話番号", () => {
    const wrapper = mount(ContactNumber);
    const label = wrapper.find('[data-test="contact-number-label"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("電話番号");
  });

  test("お名前", () => {
    const wrapper = mount(ContactNumber);
    const label = wrapper.find('[data-test="contact-name-label"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("お名前");
  });
});
