<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
  options: AddressOption[];
}>();

const selectedAddress = defineModel<string>(); // Model for the selected address value
</script>

<template>
  <fieldset
    :disabled="props.disabled"
    :style="{ opacity: props.disabled ? 0.3 : 1 }"
    data-test="past-delivery-address-fieldset"
  >
    <legend data-test="past-delivery-address-legend">過去のお届け先</legend>
    <select
      v-model="selectedAddress"
      name="pastDeliveryAddress"
      data-test="past-delivery-address-select"
    >
      <option
        v-for="option in props.options"
        :key="option.id"
        :value="option.value"
        data-test="past-delivery-address-option"
      >
        {{ option.children }}
      </option>
    </select>
  </fieldset>
</template>
