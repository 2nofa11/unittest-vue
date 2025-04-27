import { VueWrapper } from "@vue/test-utils";
// Import component types if needed for findComponent
import ContactNumber from "../06/ContactNumber.vue";
import DeliveryAddress from "../06/DeliveryAddress.vue";
import Form from "../06/Form.vue"; // Import Form component

// getGroupByName using roles is difficult with basic Vue Test Utils
// export function getGroupByName(wrapper: VueWrapper<any>, name: string) {
//   // Find fieldset by legend text maybe?
//   // This is less reliable than Testing Library's role query
// }

export async function inputContactNumber(
  wrapper: VueWrapper<any>,
  inputValues = {
    name: "田中 太郎",
    phoneNumber: "000-0000-0000",
  }
) {
  // Find the component instance first
  const contactWrapper = wrapper.findComponent(ContactNumber);
  if (!contactWrapper.exists())
    throw new Error("ContactNumber component not found");

  // Find inputs within the component using data-test attributes
  const phoneInput = contactWrapper.find<HTMLInputElement>(
    '[data-test="contact-number-input"]'
  );
  const nameInput = contactWrapper.find<HTMLInputElement>(
    '[data-test="contact-name-input"]'
  );

  if (!phoneInput.exists()) throw new Error("Phone number input not found");
  if (!nameInput.exists()) throw new Error("Name input not found");

  await phoneInput.setValue(inputValues.phoneNumber);
  await nameInput.setValue(inputValues.name);
  return inputValues;
}

export async function inputDeliveryAddress(
  wrapper: VueWrapper<any>,
  inputValues = {
    postalCode: "167-0051",
    prefecture: "東京都",
    municipalities: "杉並区荻窪1",
    streetAddress: "00-00", // Use the key consistent with Vue component
  }
) {
  // Find the component instance (could be default or new address)
  const addressWrapper = wrapper.findComponent(DeliveryAddress);
  if (!addressWrapper.exists())
    throw new Error("DeliveryAddress component not found");

  // Find inputs within the component using data-test attributes
  const postalInput = addressWrapper.find<HTMLInputElement>(
    '[data-test="postal-code-input"]'
  );
  const prefInput = addressWrapper.find<HTMLInputElement>(
    '[data-test="prefecture-input"]'
  );
  const muniInput = addressWrapper.find<HTMLInputElement>(
    '[data-test="municipalities-input"]'
  );
  const streetInput = addressWrapper.find<HTMLInputElement>(
    '[data-test="street-address-input"]'
  );

  if (!postalInput.exists()) throw new Error("Postal code input not found");
  if (!prefInput.exists()) throw new Error("Prefecture input not found");
  if (!muniInput.exists()) throw new Error("Municipalities input not found");
  if (!streetInput.exists()) throw new Error("Street address input not found");

  await postalInput.setValue(inputValues.postalCode);
  await prefInput.setValue(inputValues.prefecture);
  await muniInput.setValue(inputValues.municipalities);
  await streetInput.setValue(inputValues.streetAddress);
  return inputValues;
}

export async function clickSubmit(wrapper: VueWrapper<any>) {
  const formWrapper = wrapper.findComponent(Form);
  if (!formWrapper.exists()) {
    throw new Error("Form component not found within the wrapper");
  }
  await formWrapper.trigger("submit");
}
