<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";
import DebugButton from "../components/DebugButton.vue";
import { InjectionZundamonEvent } from "../models/inject-scenario-event";
import { ZundamonItem } from "../models/scenario";
import ZundamonImage from "../components/ZundamonImage.vue";

// const DEV = import.meta.env.DEV;
const DEV = true;

const videoScreen = ref<HTMLDivElement | null>(null);
const scenario: Ref<ZundamonItem | null> = ref(null);

const handleInjectScenario = (e: InjectionZundamonEvent) => {
  scenario.value = e.detail;
};

onMounted(() => {
  window.addEventListener("InjectScenario", handleInjectScenario);
});

onUnmounted(() => {
  window.removeEventListener("InjectScenario", handleInjectScenario);
});

console.log("ZundamonScreen");
</script>

<template>
  <div class="theater-screen">
    <div class="video-screen" ref="videoScreen">
      <img
        class="back-img"
        :src="scenario?.url ?? 'https://placehold.jp/1920x1080.png'"
      />
      <div class="zundamon-character">
        <ZundamonImage
          :facial_expression="scenario?.facial_expression ?? 'neutral'"
        />
      </div>
      <div class="text">
        <p>{{ scenario?.text }}</p>
      </div>

      <div class="debug-container" v-if="DEV">
        <DebugButton />
      </div>
    </div>
  </div>
</template>

<style scoped>
.theater-screen {
  position: relative;
  width: 100%;
  height: 100%;
}

.zundamon-character {
  position: absolute;
  top: 45%;
  left: 80%;
}
.back-img {
  width: 1920px;
  height: 1080px;
}

.text {
  position: absolute;
  top: 80%;
  left: 15%;
  font-size: 30px;
  background-color: aliceblue;
}

.text > p {
  color: black;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
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
