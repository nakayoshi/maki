<script setup lang="ts">
import { onMounted, ref } from "vue";
import RankingItemComponent from "./pages/ranking/RankingItem.vue";
import type { Ref } from "vue";
import RankingItem from "../models/data/RankingItem";

const props = defineProps<{
  list: RankingItem[];
}>();

const scenario: Ref<RankingItem[]> = ref(props.list);

onMounted(() => {
  window.addEventListener("InjectScenario", (e) => {
    scenario.value = e.detail;
    console.log(e.detail);
  });
});
</script>

<template>
  <div class="video-screen">
    <RankingItemComponent
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
