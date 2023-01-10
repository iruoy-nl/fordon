import { createRouter, createWebHistory } from "vue-router";
import OAuthPage from "~/pages/OAuth.vue";
import AppRoutes from "~/router/modules/app";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AppRoutes,
    {
      path: "/oauth",
      name: "oauth",
      component: OAuthPage,
    },
  ],
});

export default router;
