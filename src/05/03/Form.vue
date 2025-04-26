<script setup lang="ts">
defineProps<{ name: string }>();

const emit = defineEmits<{ (e: "submit", event: Event): void }>();
const handleSubmit = (event: Event) => {
  emit("submit", event);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2>アカウント情報</h2>
    <p>{{ name }}</p>
    <div>
      <button>編集する</button>
    </div>
  </form>
</template>
