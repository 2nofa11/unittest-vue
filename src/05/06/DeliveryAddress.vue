<script setup lang="ts">
// import { prefectures } from "./fixtures"; // Removed import

const props = withDefaults(defineProps<{ title?: string }>(), {
  title: "お届け先",
});

const postalCode = defineModel<string>("postalCode");
const prefecture = defineModel<string>("prefecture");
const municipalities = defineModel<string>("municipalities");
const streetAddress = defineModel<string>("streetAddress");
</script>

<template>
  <fieldset data-test="delivery-address-fieldset">
    <legend data-test="delivery-address-legend">{{ props.title }}</legend>
    <div>
      <label data-test="postal-code-label">
        郵便番号
        <input
          type="text"
          placeholder="167-0051"
          v-model="postalCode"
          data-test="postal-code-input"
        />
      </label>
    </div>
    <div>
      <label data-test="prefecture-label">
        都道府県
        <input
          type="text"
          placeholder="東京都"
          v-model="prefecture"
          data-test="prefecture-input"
        />
      </label>
    </div>
    <div>
      <label data-test="municipalities-label">
        市区町村
        <input
          type="text"
          placeholder="杉並区荻窪1"
          v-model="municipalities"
          data-test="municipalities-input"
        />
      </label>
    </div>
    <div>
      <label data-test="street-address-label">
        番地番号
        <input
          type="text"
          placeholder="00-00"
          v-model="streetAddress"
          data-test="street-address-input"
        />
      </label>
    </div>
  </fieldset>
</template>
