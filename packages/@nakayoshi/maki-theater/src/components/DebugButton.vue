<script setup lang="ts">
import TheaterButton from "./TheaterButton.vue";

const handleClick = () => {
  console.log("event dispatched");
  window.dispatchEvent(
    new CustomEvent("InjectScenario", {
      detail: {
        text: "これがぼくの大政奉還の解説なのだ。また次回のお話も楽しみにしていてほしいのだ！",
        facial_expression: "joyful",
        url: "https://placehold.jp/300x300.png",
      },
    })
  );
};
</script>

<template>
  <TheaterButton @click="handleClick">Dispatch</TheaterButton>
</template>

<style scoped>
button {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}
</style>
