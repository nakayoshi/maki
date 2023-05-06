<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import RankingItemComponent from "../components/RankingItem.vue";
import type { Ref } from "vue";
import RankingItem from "../models/data/RankingItem";
import DebugButton from "../components/DebugButton.vue";

const DEV = import.meta.env.DEV;
const LINGERING_TIME = 2000;

const videoScreen = ref<HTMLDivElement | null>(null);
const scenario: Ref<RankingItem[]> = ref([]);

const handleCue = () => {
  videoScreen.value?.classList.add("animate");
};

const handleAnimationEnd = () => {
  setTimeout(() => {
    __cameraman__finish?.();
  }, LINGERING_TIME);
};

watch(scenario, (s) => {
  if (s.length > 0) {
    handleCue();
  }
});

onMounted(() => {
  window.addEventListener("InjectScenario", (e) => {
    scenario.value = e.detail;
  });
});
</script>

<template>
  <div
    class="video-screen"
    ref="videoScreen"
    @animationend="handleAnimationEnd"
  >
    <RankingItemComponent
      v-for="item in scenario"
      v-bind:key="item.rank"
      v-bind:title="item.title"
      v-bind:description="item.description"
      v-bind:rank="item.rank"
      v-bind:imageUrl="item.url"
    />
  </div>

  <div class="debug-container" v-if="DEV">
    <DebugButton />
  </div>
</template>

<style scoped>
.video-screen {
  display: flex;
  gap: 8px;
  height: 1080px;
}

.video-screen.animate {
  animation: scrollAnimation 60s linear;
  animation-fill-mode: forwards;
}

.debug-container {
  display: flex;
  gap: 8px;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 20px;
}

@keyframes scrollAnimation {
  0% {
    transform: translateX(0%); /* 最初の位置 */
  }
  100% {
    transform: translateX(-100%); /* 最後の位置 */
  }
}
</style>
