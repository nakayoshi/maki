<script setup lang="ts">
import { onMounted, ref } from "vue";
import RankingItem from "./pages/ranking/RankingItem.vue";
import type { Ref } from "vue";
import { ScenarioEvent } from "../models/scenarioEvent";
import RankingData from "../models/data/RankingData";

const props = defineProps<{
  list: RankingData[];
}>();

const scenario: Ref<RankingData[]> = ref(props.list);

onMounted(() => {
  window.addEventListener("InjectScenario", (e: ScenarioEvent) => {
    scenario.value = e.detail;
  });
});
</script>

<template>
  <div class="video-screen">
    <RankingItem
      v-for="item in scenario"
      v-bind:key="item.rank"
      v-bind:title="item.title"
      v-bind:description="item.description"
      v-bind:rank="item.rank"
      v-bind:imageUrl="item.url"
    />
    <h1></h1>
  </div>
</template>

<style scoped>
.video-screen {
  width: fit-content;
  height: 1080px;
  display: flex;
}
</style>
