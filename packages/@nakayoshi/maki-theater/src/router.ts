import { createRouter, createWebHistory } from "vue-router";
import RankingPage from "./pages/RankingPage.vue";
import TextPage from "./pages/TextPage.vue";
import ZundamonPage from "./pages/ZundamonPage.vue";

const routes = [
  {
    path: "/",
    component: TextPage,
  },
  {
    path: "/ranking",
    component: RankingPage,
  },
  {
    path: "/explanation",
    component: ZundamonPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
