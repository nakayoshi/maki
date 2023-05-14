<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const query_msg = route.query.text;

defineProps<{ msg: string }>();
</script>

<template>
  <h1>{{ query_msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
