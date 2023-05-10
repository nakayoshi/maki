import { createRouter, createWebHistory } from "vue-router";
import RankingScreen from "../pages/RankingScreen.vue";
import HelloWorld from "../pages/HelloWorld.vue";
import ZundamonScreen from "../pages/ZundamonScreen.vue";

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
  {
    path: "/zundamon",
    name: "zundamon",
    component: ZundamonScreen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
