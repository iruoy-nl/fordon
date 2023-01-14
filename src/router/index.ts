import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "~/pages/Landing.vue";
import OAuthPage from "~/pages/OAuth.vue";
import { syncTitle } from "~/router/middleware";
import AppRoutes from "~/router/modules/app";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AppRoutes,
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/oauth",
      name: "oauth",
      component: OAuthPage,
    },
  ],
  linkActiveClass: "active",
});

router.beforeEach(syncTitle);

export default router;
