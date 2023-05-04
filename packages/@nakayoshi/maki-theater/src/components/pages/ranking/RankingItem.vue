<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  description: String,
  rank: Number,
  image_url: String,
});

const image = "url(" + props.image_url + ")";
</script>

<template>
  <div class="card">
    <div class="card__imgframe"></div>
    <div class="card__rank">第{{ rank }}位</div>
    <div class="card__textbox">
      <div class="card__titletext">
        {{ title }}
      </div>
      <div class="card__overviewtext">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 525px;
  height: 1080px;
  margin: 10px;
  overflow: hidden;
  background-color: black;
  padding: 0%;
}
.card__imgframe {
  width: 525px;
  height: 490px;
  background: v-bind(image);
  box-sizing: border-box;
}
.card__textbox {
  width: 525px;
  height: auto;
  padding: 20px 18px;
  box-sizing: border-box;
}
.card__textbox > * + * {
  margin-top: 10px;
}
.card__titletext {
  font-size: 20px;
  font-weight: bold;
  line-height: 125%;
  color: white;
  text-align: center;
  font-size: 30px;
  margin-top: 20%;
}
.card__overviewtext {
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
  width: 525pxß;
}
</style>
