import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { mockPostMyAddress } from "./fetchers/mock";
import RegisterAddress from "./RegisterAddress.vue";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "./testingUtils";

jest.mock("./fetchers");

async function fillValuesAndSubmit(wrapper: ReturnType<typeof mount>) {
  const contactNumber = await inputContactNumber(wrapper);
  const deliveryAddress = await inputDeliveryAddress(wrapper);
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit(wrapper);
  return submitValues;
}

async function fillInvalidValuesAndSubmit(wrapper: ReturnType<typeof mount>) {
  const contactNumber = await inputContactNumber(wrapper, {
    name: "田中 太郎",
    phoneNumber: "abc-defg-hijkl",
  });
  const deliveryAddress = await inputDeliveryAddress(wrapper);
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit(wrapper);
  return submitValues;
}

beforeEach(() => {
  jest.resetAllMocks();
});

describe("RegisterAddress.vue", () => {
  test("成功時「登録しました」が表示される", async () => {
    const mockFn = mockPostMyAddress();
    const wrapper = mount(RegisterAddress);
    const submitValues = await fillValuesAndSubmit(wrapper);
    await wrapper.vm.$nextTick();

    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
    const result = wrapper.find('[data-test="post-result"]');
    expect(result.exists()).toBe(true);
    expect(result.text()).toBe("登録しました");
  });

  test("失敗時「登録に失敗しました」が表示される", async () => {
    const mockFn = mockPostMyAddress(500);
    const wrapper = mount(RegisterAddress);
    const submitValues = await fillValuesAndSubmit(wrapper);
    await wrapper.vm.$nextTick();

    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
    const result = wrapper.find('[data-test="post-result"]');
    expect(result.exists()).toBe(true);
    expect(result.text()).toBe("登録に失敗しました");
  });

  test("バリデーションエラー時「不正な入力値が含まれています」が表示される", async () => {
    const wrapper = mount(RegisterAddress);
    await fillInvalidValuesAndSubmit(wrapper);
    await wrapper.vm.$nextTick();

    const result = wrapper.find('[data-test="post-result"]');
    expect(result.exists()).toBe(true);
    expect(result.text()).toBe("不正な入力値が含まれています");
  });

  test("不明なエラー時「不明なエラーが発生しました」が表示される", async () => {
    const wrapper = mount(RegisterAddress);
    await fillValuesAndSubmit(wrapper);
    await wrapper.vm.$nextTick();

    const result = wrapper.find('[data-test="post-result"]');
    expect(result.exists()).toBe(true);
    expect(result.text()).toBe("不明なエラーが発生しました");
  });

  test("Snapshot: 登録フォームが表示される", () => {
    const wrapper = mount(RegisterAddress);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
