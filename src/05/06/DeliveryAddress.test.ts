import { mount } from "@vue/test-utils";
import DeliveryAddress from "./DeliveryAddress.vue";

describe("お届け先", () => {
  test("タイトル", () => {
    const wrapper = mount(DeliveryAddress);
    const legend = wrapper.find('[data-test="delivery-address-legend"]');
    expect(legend.exists()).toBe(true);
    expect(legend.text()).toBe("お届け先");
  });

  test("タイトルが変更できる", () => {
    const title = "新しいお届け先";
    const wrapper = mount(DeliveryAddress, { props: { title } });
    const legend = wrapper.find('[data-test="delivery-address-legend"]');
    expect(legend.exists()).toBe(true);
    expect(legend.text()).toBe(title);
  });

  test("郵便番号", () => {
    const wrapper = mount(DeliveryAddress);
    const input = wrapper.find('[data-test="postal-code-input"]');
    expect(input.exists()).toBe(true);
  });

  test("都道府県", () => {
    const wrapper = mount(DeliveryAddress);
    const input = wrapper.find('[data-test="prefecture-input"]');
    expect(input.exists()).toBe(true);
  });

  test("市区町村", () => {
    const wrapper = mount(DeliveryAddress);
    const input = wrapper.find('[data-test="municipalities-input"]');
    expect(input.exists()).toBe(true);
  });

  test("番地番号", () => {
    const wrapper = mount(DeliveryAddress);
    const input = wrapper.find('[data-test="street-address-input"]');
    expect(input.exists()).toBe(true);
  });
});
