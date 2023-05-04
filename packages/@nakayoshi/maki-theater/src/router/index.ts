import { createRouter, createWebHistory } from "vue-router";
import RankingScreen from "../components/RankingScreen.vue";
import HelloWorld from "../components/HelloWorld.vue";

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
