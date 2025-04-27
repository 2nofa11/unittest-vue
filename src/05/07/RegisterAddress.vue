<script setup lang="ts">
import { ref } from "vue";
import Form from "../06/Form.vue";
import { postMyAddress } from "./fetchers";
import { checkPhoneNumber, ValidationError } from "./validations";

interface FormData {
  phoneNumber: string;
  name: string;
  postalCode?: string;
  prefecture?: string;
  municipalities?: string;
  streetAddress?: string;
  pastDeliveryAddress?: string;
}

const postResult = ref<string>("");

const submitLogic = (values: Partial<FormData>) => {
  postResult.value = "";
  try {
    checkPhoneNumber(values.phoneNumber);

    postMyAddress(values)
      .then(() => {
        // API Success
        postResult.value = "登録しました";
      })
      .catch((apiError) => {
        // API Failure (e.g., 500 error, network error caught by fetch)
        console.error("API Error:", apiError); // Optional logging
        postResult.value = "登録に失敗しました";
      });
  } catch (err) {
    // --- Catch sync errors (ValidationError or others before API call) ---
    if (err instanceof ValidationError) {
      postResult.value = "不正な入力値が含まれています";
    } else {
      // Other unexpected synchronous errors
      console.error("Unexpected Sync Error:", err);
      postResult.value = "不明なエラーが発生しました";
    }
  }
};
</script>

<template>
  <div>
    <Form @submit="submitLogic" data-test="register-address-form" />
    <p v-if="postResult" data-test="post-result">{{ postResult }}</p>
  </div>
</template>
