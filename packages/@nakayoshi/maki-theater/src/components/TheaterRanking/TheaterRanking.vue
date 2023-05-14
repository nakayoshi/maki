<script setup lang="ts">
import { ref } from "vue";

import RankingItem from "./RankingItem.vue";
import { RankingScenario } from "../../models/scenario";

const props = withDefaults(
  defineProps<{
    readonly scenario: RankingScenario;
    readonly screenWidth: string;
    readonly itemWidth?: string;
    readonly gap: string;
  }>(),
  {
    screenWidth: "1920px",
    gap: "8px",
  }
);

const ranking = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div class="ranking" ref="ranking">
    <div class="title" :style="{ width: props.screenWidth }">
      <h1>
        {{ scenario?.title ?? "" }}
      </h1>
    </div>

    <div class="ranking-list" :style="{ gap: props.gap }">
      <RankingItem
        :width="props.itemWidth"
        v-for="item in scenario?.items ?? []"
        :key="item.rank"
        :title="item.title"
        :description="item.description"
        :rank="item.rank"
        :imageUrl="item.url"
      />
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none !important;
}

.ranking {
  display: flex;
  width: 100%;
  height: 100%;
}

.title {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 32px;
}

.ranking-list {
  flex: 1 0 auto;
  display: flex;
  height: 100%;
}
</style>
