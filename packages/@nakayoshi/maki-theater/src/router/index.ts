import { createRouter, createWebHistory } from "vue-router";
import RankingScreen from "../components/RankingScreen.vue";

const routes = [
  {
    path: "/",
    name: "ranking",
    component: RankingScreen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
