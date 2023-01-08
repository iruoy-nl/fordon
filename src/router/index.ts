import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "~/pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/inloggen",
      name: "login",
      component: LoginPage,
    },
  ],
});

export default router;
