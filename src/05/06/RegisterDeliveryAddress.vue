<script setup lang="ts">
const register = defineModel<boolean>();
</script>

<template>
  <fieldset data-test="register-delivery-address-fieldset">
    <legend data-test="register-delivery-address-legend">
      新しいお届け先を登録しますか？
    </legend>
    <label data-test="register-no-label">
      <input
        type="radio"
        name="registerDeliveryAddress"
        :value="false"
        v-model="register"
        data-test="register-no-input"
      />
      いいえ
    </label>
    <label data-test="register-yes-label">
      <input
        type="radio"
        name="registerDeliveryAddress"
        :value="true"
        v-model="register"
        data-test="register-yes-input"
      />
      はい
    </label>
  </fieldset>
</template>
