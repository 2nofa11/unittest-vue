<script setup lang="ts">
import { ref } from "vue";
import Agreement from "./Agreement.vue";
import InputAccount from "./InputAccount.vue";

const email = ref("");
const password = ref("");
const checked = ref(false);
</script>

<template>
  <form @submit.prevent="handleSubmit" data-test="signup-form">
    <h2>新規アカウント登録</h2>
    <InputAccount v-model:email="email" v-model:password="password" />
    <Agreement v-model="checked" data-test="agreement-component" />
    <div>
      <button :disabled="!checked" data-test="submit-button">
        サインアップ
      </button>
    </div>
  </form>
</template>
