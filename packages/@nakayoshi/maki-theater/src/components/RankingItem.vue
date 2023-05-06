<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
  description: string;
  rank: number;
  imageUrl: string;
}>();
</script>

<template>
  <div class="card">
    <img class="card__image" :src="props.imageUrl" :alt="title" />
    <div class="card__rank">第{{ rank }}位</div>
    <div class="card__text-box">
      <div class="card__title">
        {{ title }}
      </div>
      <div class="card__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 525px;
  height: 100%;
  overflow: hidden;
  background-color: black;
  padding: 0%;
}

.card__image {
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 100%;
  max-height: 490px;
}

.card__rank {
  flex: 0 0 auto;
  width: 100%;
  text-align: center;
  color: black;
  font-size: 110px;
  font-weight: bold;
  background-color: darkgray;
}

.card__text-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;

  flex: 1 0 auto;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.card__title {
  font-weight: bold;
  line-height: 1.25;
  color: white;
  text-align: center;
  font-size: 48px;
}

.card__description {
  font-size: 12px;
  line-height: 150%;
  color: white;
  text-align: center;
  font-size: 40px;
}
</style>
