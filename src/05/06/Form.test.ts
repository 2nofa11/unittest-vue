import { describe, expect, jest, test } from "@jest/globals";
import { mount, VueWrapper } from "@vue/test-utils";
import ContactNumber from "./ContactNumber.vue";
import DeliveryAddress from "./DeliveryAddress.vue";
import { deliveryAddresses } from "./fixtures";
import Form from "./Form.vue";
import PastDeliveryAddress from "./PastDeliveryAddress.vue";
import RegisterDeliveryAddress from "./RegisterDeliveryAddress.vue";

async function inputContactNumber(
  wrapper: VueWrapper<any>,
  inputValues = {
    name: "田中 太郎",
    phoneNumber: "000-0000-0000",
  }
) {
  const contactWrapper = wrapper.findComponent(ContactNumber);
  await contactWrapper
    .find('[data-test="contact-number-input"]')
    .setValue(inputValues.phoneNumber);
  await contactWrapper
    .find('[data-test="contact-name-input"]')
    .setValue(inputValues.name);
  return inputValues;
}

async function inputDeliveryAddress(
  wrapper: VueWrapper<any>,
  inputValues = {
    postalCode: "167-0051",
    prefecture: "東京都",
    municipalities: "杉並区荻窪1",
    streetAddress: "00-00",
  }
) {
  const addressWrapper = wrapper.findComponent(DeliveryAddress);
  await addressWrapper
    .find('[data-test="postal-code-input"]')
    .setValue(inputValues.postalCode);
  await addressWrapper
    .find('[data-test="prefecture-input"]')
    .setValue(inputValues.prefecture);
  await addressWrapper
    .find('[data-test="municipalities-input"]')
    .setValue(inputValues.municipalities);
  await addressWrapper
    .find('[data-test="street-address-input"]')
    .setValue(inputValues.streetAddress);
  return inputValues;
}

async function clickSubmit(wrapper: VueWrapper<any>) {
  await wrapper.find('[data-test="submit-button"]').trigger("submit");
}

// Mock submit handler (remains similar)
function mockHandleSubmit() {
  const mockFn = jest.fn();
  const onSubmit = (event: Event) => {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: { [k: string]: unknown } = {};
    formData.forEach((value, key) => (data[key] = value));
    mockFn(data);
  };
  return [mockFn, onSubmit] as const;
}

describe("Form.vue", () => {
  describe("過去のお届け先がない場合", () => {
    test("お届け先入力欄がある", () => {
      const wrapper = mount(Form);
      expect(wrapper.findComponent(ContactNumber).exists()).toBe(true);
      expect(wrapper.findComponent(DeliveryAddress).exists()).toBe(true);
    });

    test("入力・送信すると、入力内容が送信される", async () => {
      const [mockFn, onSubmit] = mockHandleSubmit();
      const wrapper = mount(Form, {
        props: { deliveryAddresses: [], onSubmit },
      });
      const contactNumber = await inputContactNumber(wrapper);
      const deliveryAddress = await inputDeliveryAddress(wrapper);
      await wrapper.find('[data-test="form"]').trigger("submit"); // Trigger submit on form

      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({ ...contactNumber, ...deliveryAddress })
      );
    });

    test("Snapshot", () => {
      const wrapper = mount(Form, { props: { deliveryAddresses: [] } });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("過去のお届け先がある場合", () => {
    test("設問に答えるまで、お届け先を選べない", () => {
      const wrapper = mount(Form, { props: { deliveryAddresses } });
      expect(wrapper.findComponent(RegisterDeliveryAddress).exists()).toBe(
        true
      );
      const pastAddressWrapper = wrapper.findComponent(PastDeliveryAddress);
      expect(pastAddressWrapper.exists()).toBe(true);

      expect((pastAddressWrapper.element as HTMLFieldSetElement).disabled).toBe(
        true
      );
    });

    test("「いいえ」を選択・入力・送信すると、入力内容が送信される", async () => {
      const [mockFn, onSubmit] = mockHandleSubmit();
      const wrapper = mount(Form, { props: { deliveryAddresses, onSubmit } });

      await wrapper.find('[data-test="register-no-input"]').setValue();

      expect(wrapper.findComponent(PastDeliveryAddress).exists()).toBe(true);

      const inputValues = await inputContactNumber(wrapper);
      await wrapper.find('[data-test="form"]').trigger("submit");

      expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(inputValues));
    });

    test("「はい」を選択・入力・送信すると、入力内容が送信される", async () => {
      const [mockFn, onSubmit] = mockHandleSubmit();
      const wrapper = mount(Form, { props: { deliveryAddresses, onSubmit } });

      await wrapper.find('[data-test="register-yes-input"]').setValue();

      expect(wrapper.findComponent(DeliveryAddress).exists()).toBe(true);

      const contactNumber = await inputContactNumber(wrapper);
      const deliveryAddress = await inputDeliveryAddress(wrapper);
      await wrapper.find('[data-test="form"]').trigger("submit");

      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({ ...contactNumber, ...deliveryAddress })
      );
    });

    test("Snapshot", () => {
      const wrapper = mount(Form, { props: { deliveryAddresses } });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
