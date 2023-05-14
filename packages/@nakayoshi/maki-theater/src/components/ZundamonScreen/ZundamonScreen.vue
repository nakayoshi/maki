<script setup lang="ts">
import { ZundamonTachie } from "../ZundamonTachie";
import { ZundamonVariant } from "../ZundamonTachie/model";

defineProps<{
  readonly facialExpression: ZundamonVariant;
  readonly text: string;
  readonly imageUrl: string;
}>();

const TACHIE_RATIO = 825 / 541;
const TACHIE_WIDTH = 450;
const TACHIE_HEIGHT = TACHIE_WIDTH * TACHIE_RATIO;
</script>

<template>
  <div class="container">
    <div class="presentation">
      <img :src="imageUrl" alt="presentation" />
    </div>

    <div class="text" :style="{ paddingRight: `${TACHIE_WIDTH - 230}px` }">
      <span>
        {{ text }}
      </span>
    </div>

    <div
      class="tachie"
      :style="{ width: `${TACHIE_WIDTH}px`, height: `${TACHIE_HEIGHT}px` }"
    >
      <ZundamonTachie :variant="facialExpression" />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
}

.presentation {
  flex: 1 1 auto;
  background-color: #333333;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  overflow: hidden;
}

.presentation img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tachie {
  position: absolute;
  bottom: -250px;
  right: -100px;
}

.text {
  flex: 0 1 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  text-align: center;
  line-break: auto;
  background-color: white;
}

.text > span {
  font-size: 48px;
  word-break: break-all;

  font-weight: bold;
  color: green;
}
</style>
