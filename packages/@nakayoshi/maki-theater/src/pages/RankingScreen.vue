<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import RankingItemComponent from "../components/RankingItem.vue";
import type { Ref } from "vue";
import { Scenario } from "../models/scenario";
import DebugButton from "../components/DebugButton.vue";
import { InjectScenarioEvent } from "../models/inject-scenario-event";

const DEV = import.meta.env.DEV;
const LINGERING_TIME = 2000;

const videoScreen = ref<HTMLDivElement | null>(null);
const scenario: Ref<Scenario | null> = ref(null);

const handleCue = () => {
  videoScreen.value?.classList.add("animate");
};

const handleAnimationEnd = () => {
  setTimeout(() => {
    __cameraman__finish?.();
  }, LINGERING_TIME);
};

watch(scenario, (s) => {
  if (s != null) {
    handleCue();
  }
});

const ITEM_WIDTH = 525;
const GAP = 8;

const finalTranslateX = computed(() => {
  if (scenario.value == null) {
    return "0px";
  }
  return `-${(ITEM_WIDTH + GAP) * scenario.value.items.length}px`;
});

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
    <div class="background-title">
      <h1>
        {{ scenario?.title ?? "" }}
      </h1>
    </div>

    <div
      class="video-screen"
      ref="videoScreen"
      @animationend="handleAnimationEnd"
    >
      <RankingItemComponent
        :width="`${ITEM_WIDTH}px`"
        v-for="item in scenario?.items ?? []"
        :key="item.rank"
        :title="item.title"
        :description="item.description"
        :rank="item.rank"
        :imageUrl="item.url"
      />
    </div>
  </div>

  <div class="debug-container" v-if="DEV">
    <DebugButton />
  </div>
</template>

<style scoped>
.theater-screen {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-title {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 32px;
  justify-content: center;
  align-items: center;
}

.video-screen {
  display: flex;
  gap: v-bind(`${GAP}px`);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-screen.animate {
  animation: scrollAnimation 60s ease-out;
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
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(calc(v-bind(finalTranslateX) + 100vw));
  }
}
</style>
