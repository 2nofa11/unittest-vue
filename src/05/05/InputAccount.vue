<script setup lang="ts">
const email = defineModel<string>("email");
const password = defineModel<string>("password");
</script>

<template>
  <fieldset data-test="input-account-fieldset">
    <legend data-test="input-account-legend">アカウント情報の入力</legend>
    <div>
      <label>
        メールアドレス
        <input
          type="text"
          placeholder="example@test.com"
          v-model="email"
          data-test="input-email"
        />
      </label>
    </div>
    <div>
      <label>
        パスワード
        <input
          type="password"
          placeholder="8文字以上で入力"
          v-model="password"
          data-test="input-password"
        />
      </label>
    </div>
  </fieldset>
</template>
