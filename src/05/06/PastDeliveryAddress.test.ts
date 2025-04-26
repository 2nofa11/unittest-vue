import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import PastDeliveryAddress from "./PastDeliveryAddress.vue";

interface AddressOption {
  id: string;
  value: string;
  children: string;
}

describe("過去のお届け先", () => {
  const options: AddressOption[] = [
    {
      id: "xxx",
      value: "xxx",
      children: "〒167-0051 東京都杉並区荻窪1-00-00",
    },
  ];

  test("disabled={true} の場合、fieldset は非活性", () => {
    const wrapper = mount(PastDeliveryAddress, {
      props: { disabled: true, options },
    });
    const fieldset = wrapper.find<HTMLFieldSetElement>(
      '[data-test="past-delivery-address-fieldset"]'
    );
    expect(fieldset.element.disabled).toBe(true);
  });
});
