import { createRouter, createWebHistory } from "vue-router";
import RankingScreen from "../pages/RankingScreen.vue";
import HelloWorld from "../pages/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/ranking",
    name: "ranking",
    component: RankingScreen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
