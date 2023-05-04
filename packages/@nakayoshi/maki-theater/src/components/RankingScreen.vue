<script setup lang="ts">
import { PropType, defineProps } from "vue";

// import { useRoute } from "vue-router";

import RankingItem from "./pages/ranking/RankingItem.vue";

interface RankingData {
  rank: number;
  title: string;
  description: string;
  url: string;
}

defineProps<{
  list: RankingData[];
}>();
</script>

<template>
  <div class="video-screen">
    <RankingItem
      v-for="item in list"
      v-bind:key="item.rank"
      v-bind:title="item.title"
      v-bind:description="item.description"
      v-bind:rank="item.rank"
      v-bind:imageUrl="item.url"
    />
    <audio src="/public/maou_14_shining_star.ogg" autoplay loop>
      あなたのブラウザーは <code>audio</code>要素をサポートしていません。
    </audio>
  </div>
</template>

<style scoped>
.video-screen {
  width: fit-content;
  height: 1080px;
  display: flex;
}
</style>
