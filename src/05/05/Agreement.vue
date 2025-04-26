<script setup lang="ts">
const checked = defineModel<boolean>();
</script>

<template>
  <fieldset data-test="agreement-fieldset">
    <legend data-test="agreement-legend">利用規約の同意</legend>
    <label>
      <input type="checkbox" v-model="checked" data-test="agreement-checkbox" />
      当サービスの<a href="/terms">利用規約</a>を確認し、これに同意します
    </label>
  </fieldset>
</template>
