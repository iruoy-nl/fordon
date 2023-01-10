import type { RouteRecordRaw } from "vue-router";
import AppPage from "~/pages/App.vue";
import { isAuthenticated } from "~/router/middleware";

const routes: RouteRecordRaw[] = [
  {
    path: "/app",
    name: "app",
    component: AppPage,
    beforeEnter: [isAuthenticated],
  },
];

export default routes;
