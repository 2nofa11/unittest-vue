<script setup lang="ts">
import ArticleListItem, { type ItemProps } from "./ArticleListItem.vue";

type Props = {
  items: ItemProps[];
};

defineProps<Props>();
</script>

<template>
  <div>
    <h2 data-test="article-list-heading">記事一覧</h2>
    <ul v-if="items.length" data-test="article-list">
      <ArticleListItem
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :body="item.body"
      />
    </ul>
    <p v-else data-test="no-articles-message">投稿記事がありません</p>
  </div>
</template>
