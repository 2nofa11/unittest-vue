import { describe, expect, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
// import { defineComponent, ref } from "vue"; // No longer needed
import RegisterDeliveryAddress from "./RegisterDeliveryAddress.vue";

describe("新しいお届け先を登録しますか？", () => {
  test("ラジオボタンをクリックすると、コールバックハンドラが呼ばれる", async () => {
    // Mount the component directly
    const wrapper = mount(RegisterDeliveryAddress, {
      // Optionally provide initial props if needed, but not strictly necessary for this test
      props: {
        modelValue: undefined, // Or false/true if you want a default
      },
    });

    // Find radio buttons directly on the wrapper
    const noRadio = wrapper.find<HTMLInputElement>(
      '[data-test="register-no-input"]'
    );
    const yesRadio = wrapper.find<HTMLInputElement>(
      '[data-test="register-yes-input"]'
    );

    // Click 'いいえ'
    await noRadio.setValue();
    const emittedNo = wrapper.emitted("update:modelValue");
    expect(emittedNo).toBeTruthy();
    if (emittedNo) {
      expect(emittedNo[0]).toEqual([false]);
    }

    // Click 'はい'
    await yesRadio.setValue();
    const emittedYes = wrapper.emitted("update:modelValue");
    expect(emittedYes).toBeTruthy();
    if (emittedYes) {
      expect(emittedYes.length).toBe(2);
      expect(emittedYes[1]).toEqual([true]);
    }
  });
});
