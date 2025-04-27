<script setup lang="ts">
import { ref, computed } from "vue";
import ContactNumber from "./ContactNumber.vue";
import DeliveryAddress from "./DeliveryAddress.vue";
import PastDeliveryAddress from "./PastDeliveryAddress.vue";
import RegisterDeliveryAddress from "./RegisterDeliveryAddress.vue";
import type { SubmitFormData } from "../types";

export interface AddressOption {
  id: string;
  value: string;
  children: string;
}

const props = defineProps<{
  deliveryAddresses?: AddressOption[];
}>();

const emit = defineEmits<{
  (e: "submit", values: Partial<SubmitFormData>): void;
}>();

const phoneNumber = ref("");
const name = ref("");
const registerNewAddress = ref<boolean | undefined>(undefined); // Initially undefined
const selectedPastAddressValue = ref("");
const postalCode = ref("");
const prefecture = ref("");
const municipalities = ref("");
const streetAddress = ref("");

// AddressValues 型をタグ付きユニオンとして再定義
type NewAddressData = {
  addressType: "new";
  postalCode?: string;
  prefecture?: string;
  municipalities?: string;
  streetAddress?: string;
};

type PastAddressData = {
  addressType: "past";
  pastDeliveryAddress?: string;
};

type NoAddressData = {
  addressType: "none";
};

type AddressValues = NewAddressData | PastAddressData | NoAddressData;

const hasPastAddresses = computed(
  () => (props.deliveryAddresses?.length || 0) > 0
);

const isPastAddressDisabled = computed(
  () => registerNewAddress.value === undefined
);

const handleFormSubmit = () => {
  // ベースとなる値
  const baseValues = {
    phoneNumber: phoneNumber.value,
    name: name.value,
  };

  let addressValues: AddressValues = { addressType: "none" };

  if (registerNewAddress.value === true || !hasPastAddresses.value) {
    // 新しい住所を登録する場合、または過去の住所がない場合
    addressValues = {
      addressType: "new",
      postalCode: postalCode.value,
      prefecture: prefecture.value,
      municipalities: municipalities.value,
      streetAddress: streetAddress.value,
    };
  } else if (registerNewAddress.value === false) {
    // 過去の住所を選択した場合
    addressValues = {
      addressType: "past",
      pastDeliveryAddress: selectedPastAddressValue.value,
    };
  }
  // 初期状態 (undefined) の場合は addressValues は { addressType: 'none' } のまま

  // addressType は内部的な状態管理用なので、送信データからは除外する
  const { addressType, ...submitAddressValues } = addressValues;

  // ベースの値と住所の値をマージして送信
  const values = { ...baseValues, ...submitAddressValues };
  emit("submit", values);
};
</script>

<template>
  <form @submit.prevent="handleFormSubmit" data-test="form">
    <h2 data-test="form-heading">お届け先情報の入力</h2>

    <ContactNumber
      v-model:phoneNumber="phoneNumber"
      v-model:name="name"
      data-test="contact-number-component"
    />

    <template v-if="hasPastAddresses">
      <RegisterDeliveryAddress
        v-model="registerNewAddress"
        data-test="register-delivery-address-component"
      />
      <DeliveryAddress
        v-if="registerNewAddress === true"
        title="新しいお届け先"
        v-model:postalCode="postalCode"
        v-model:prefecture="prefecture"
        v-model:municipalities="municipalities"
        v-model:streetAddress="streetAddress"
        data-test="new-delivery-address-component"
      />
      <PastDeliveryAddress
        v-else
        :disabled="isPastAddressDisabled"
        :options="props.deliveryAddresses || []"
        v-model="selectedPastAddressValue"
        data-test="past-delivery-address-component"
      />
    </template>
    <template v-else>
      <DeliveryAddress
        v-model:postalCode="postalCode"
        v-model:prefecture="prefecture"
        v-model:municipalities="municipalities"
        v-model:streetAddress="streetAddress"
        data-test="default-delivery-address-component"
      />
    </template>

    <hr />
    <div>
      <button type="submit" data-test="submit-button">
        注文内容の確認へ進む
      </button>
    </div>
  </form>
</template>
