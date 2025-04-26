<script setup lang="ts">
export type ItemProps = {
  id: string;
  title: string;
  body: string;
};

defineProps<ItemProps>();
</script>

<template>
  <li data-test="article-list-item">
    <h3 data-test="article-title">{{ title }}</h3>
    <p data-test="article-body">{{ body }}</p>
    <a :href="`/articles/${id}`" data-test="article-link">もっと見る</a>
  </li>
</template>
