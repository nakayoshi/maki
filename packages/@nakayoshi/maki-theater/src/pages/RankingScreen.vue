<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";

import { Scenario } from "../models/scenario";
import DebugButton from "../components/DebugButton.vue";
import { InjectScenarioEvent } from "../models/inject-scenario-event";
import TheaterRanking from "../components/TheaterRanking";

const DEV = import.meta.env.DEV;
const scenario: Ref<Scenario | null> = ref(null);

const handleInjectScenario = (e: InjectScenarioEvent) => {
  scenario.value = e.detail;
};

onMounted(() => {
  window.addEventListener("InjectScenario", handleInjectScenario);
});

onUnmounted(() => {
  window.removeEventListener("InjectScenario", handleInjectScenario);
});
</script>

<template>
  <div class="theater-screen">
    <TheaterRanking v-if="scenario != null" :scenario="scenario" />
  </div>

  <div class="debug-container" v-if="DEV">
    <DebugButton />
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
