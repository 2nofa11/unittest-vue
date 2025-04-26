<script setup lang="ts">
const phoneNumber = defineModel<string>("phoneNumber");
const name = defineModel<string>("name");
</script>

<template>
  <fieldset data-test="contact-fieldset">
    <legend data-test="contact-legend">連絡先</legend>
    <div>
      <label data-test="contact-number-label">
        電話番号
        <input
          type="tel"
          v-model="phoneNumber"
          data-test="contact-number-input"
        />
      </label>
    </div>
    <div>
      <label data-test="contact-name-label">
        お名前
        <input type="text" v-model="name" data-test="contact-name-input" />
      </label>
    </div>
  </fieldset>
</template>
