import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/PageHome.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/PageAuth.vue"),
  },
  {
    path: "/interview/:id",
    name: "Interview",
    component: () => import("@/views/PageInterview.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/views/PageList.vue"),
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: () => import("@/views/PageStatistic.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
