<script setup lang="ts">
import { computed } from "vue";

interface Item {
  id: number;
  title: string;
}

const props = defineProps<{
  items: Item[];
  isLoading?: boolean;
}>();

const hasItems = computed(() => props.items.length > 0);
</script>

<template>
  <div>
    <h2>記事一覧</h2>
    <p v-if="isLoading" data-test="loading-indicator">...loading</p>
    <ul v-else-if="hasItems" data-test="article-list">
      <li v-for="item in items" :key="item.id" data-test="article-item">
        <a :href="`/articles/${item.id}`">{{ item.title }}</a>
      </li>
    </ul>
    <p v-else data-test="no-articles-message">投稿記事がありません</p>
  </div>
</template>
