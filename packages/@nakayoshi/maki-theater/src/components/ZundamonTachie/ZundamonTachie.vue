<script setup lang="ts">
import { computed } from "vue";
import { ZundamonVariant } from "./model";

const props = defineProps<{
  readonly variant: ZundamonVariant;
}>();

const url = computed(() => {
  switch (props.variant) {
    case "angry":
      return "/assets/zundamon/angry.webp";
    case "joyful":
      return "/assets/zundamon/joyful.webp";
    case "embarrassed":
      return "/assets/zundamon/embarrassed.webp";
    case "fearful":
      return "/assets/zundamon/fearful.webp";
    case "thinking":
      return "/assets/zundamon/thinking.webp";
    case "normal":
    default:
      return "/assets/zundamon/normal.webp";
  }
});
</script>

<template>
  <div class="content" :style="{ backgroundImage: `url(${url})` }"></div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
