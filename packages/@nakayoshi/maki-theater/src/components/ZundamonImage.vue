<script setup lang="ts">
defineProps<{
  facial_expression: string;
}>();
</script>

<template>
  <div v-if="facial_expression === 'neutral'">
    <img class="zundamon-img" src="../assets/neutral.png" />
  </div>
  <div v-if="facial_expression === 'fearful'">
    <img class="zundamon-img" src="../assets/fearful.png" />
  </div>
  <div v-if="facial_expression === 'thinking'">
    <img class="zundamon-img" src="../assets/thinking.png" />
  </div>
  <div v-if="facial_expression === 'joyful'">
    <img class="zundamon-img" src="../assets/joyful.png" />
  </div>
  <div v-if="facial_expression === 'angry'">
    <img class="zundamon-img" src="../assets/angry.png" />
  </div>
</template>

<style scoped>
.zundamon-img {
  width: 100%;
  height: 70%;
  object-fit: contain;
}
</style>
