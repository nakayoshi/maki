<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from "vue";
import ZundamonScreen from "../components/ZundamonScreen/ZundamonScreen.vue";
import { InjectExplanationScenarioEvent } from "../models/inject-scenario-event";
import { ExplanationScenario } from "../models/scenario";
import { injectExplanationScenarioEvent } from "../__fixtures__/inject-explanation-scenario-event";
import DebugButton from "../components/DebugButton.vue";

const DEV = import.meta.env.DEV;
const scenario: Ref<ExplanationScenario | null> = ref(null);

const handleInjectScenario = (e: InjectExplanationScenarioEvent) => {
  scenario.value = e.detail;
};

const handleInjectFixtureScenario = () => {
  window.dispatchEvent(injectExplanationScenarioEvent);
};

onMounted(() => {
  window.addEventListener("InjectExplanationScenario", handleInjectScenario);
});

onUnmounted(() => {
  window.removeEventListener("InjectExplanationScenario", handleInjectScenario);
});
</script>

<template>
  <div class="theater-screen">
    <ZundamonScreen
      v-for="(scene, i) in scenario?.scenes ?? []"
      :key="i"
      :facial-expression="scene.facialExpression"
      :text="scene.text"
      :image-url="scene.imageUrl"
      :data-screen-index="i"
    />

    <div class="debug-container" v-if="DEV">
      <DebugButton @click="handleInjectFixtureScenario" />
    </div>
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
