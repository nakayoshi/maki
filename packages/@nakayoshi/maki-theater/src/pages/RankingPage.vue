<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";

import DebugButton from "../components/DebugButton.vue";
import TheaterRanking from "../components/TheaterRanking";
import { RankingScenario } from "../models/scenario";
import { InjectRankingScenarioEvent } from "../models/inject-scenario-event";
import { injectRankingScenarioEvent } from "../__fixtures__/inject-ranking-scenario-event";

const DEV = import.meta.env.DEV;
const scenario: Ref<RankingScenario | null> = ref(null);

const handleInjectScenario = (e: InjectRankingScenarioEvent) => {
  scenario.value = e.detail;
};

const handleInjectFixtureScenario = () => {
  window.dispatchEvent(injectRankingScenarioEvent);
};

onMounted(() => {
  window.addEventListener("InjectRankingScenario", handleInjectScenario);
});

onUnmounted(() => {
  window.removeEventListener("InjectRankingScenario", handleInjectScenario);
});
</script>

<template>
  <div class="theater-screen">
    <TheaterRanking v-if="scenario != null" :scenario="scenario" />
  </div>

  <div class="debug-container" v-if="DEV">
    <DebugButton @click="handleInjectFixtureScenario" />
  </div>
</template>

<style scoped>
.theater-screen {
  width: 100%;
  height: 100%;
}

.debug-container {
  display: flex;
  gap: 8px;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 20px;
}
</style>
