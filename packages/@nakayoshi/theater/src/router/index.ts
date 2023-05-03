import { createRouter, createWebHistory } from "vue-router";
import Ranking from "../components/Ranking.vue";

const routes = [
  {
    path: "/",
    name: "ranking",
    component: Ranking,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
