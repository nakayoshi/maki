<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
  description: string;
  rank: number;
  imageUrl: string;
}>();

const image = "url(" + props.imageUrl + ")";
</script>

<template>
  <div class="card">
    <div class="card__img-frame"></div>
    <div class="card__rank">第{{ rank }}位</div>
    <div class="card__text-box">
      <div class="card__title-text">
        {{ title }}
      </div>
      <div class="card__overview-text">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 1 0 auto;
  width: 525px;
  height: 1080px;
  margin: 10px;
  overflow: hidden;
  background-color: black;
  padding: 0%;
  font: "Noto Sans JP";
}
.card__img-frame {
  width: 525px;
  height: 490px;
  background: v-bind(image);
  box-sizing: border-box;
}
.card__text-box {
  width: 525px;
  height: auto;
  padding: 20px 18px;
  box-sizing: border-box;
}
.card__text-box > * + * {
  margin-top: 10px;
}
.card__title-text {
  font-size: 20px;
  font-weight: bold;
  line-height: 125%;
  color: white;
  text-align: center;
  font-size: 40px;
  margin-top: 10%;
}
.card__overview-text {
  font-size: 12px;
  line-height: 150%;
  color: white;
  text-align: center;
  font-size: 50px;
}
.card__rank {
  text-align: center;
  color: black;
  font-size: 110px;
  font-weight: bold;
  background-color: darkgray;
  width: 525px;
}
</style>
