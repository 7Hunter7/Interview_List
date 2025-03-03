import { createRouter, createWebHistory } from "vue-router";
import type {
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Импорт функций для работы с авторизацией

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let isAuth = false;

  // Проверка авторизации пользователя
  onAuthStateChanged(getAuth(), (user) => {
    if (user && !isAuth) {
      isAuth = true;
      next();
    } else if (!user && !isAuth) {
      isAuth = true;
      next("/auth");
    }
  });
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/PageHome.vue"),
    beforeEnter: checkAuth, // Проверка авторизации перед переходом на страницу
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/PageAuth.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/interview/:id",
    name: "Interview",
    component: () => import("@/views/PageInterview.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/views/PageList.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: () => import("@/views/PageStatistic.vue"),
    beforeEnter: checkAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
