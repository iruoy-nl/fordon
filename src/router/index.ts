import { isNone } from "fp-ts/lib/Option";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "~/pages/Login.vue";
import RootPage from "~/pages/Root.vue";
import { user$ } from "~/store/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "root" },
    },
    {
      path: "/app",
      name: "root",
      component: RootPage,
      beforeEnter: () => {
        // Only allow authenticated users.
        if (isNone(user$.value)) return { name: "login" };
      },
    },
    {
      path: "/inloggen",
      name: "login",
      component: LoginPage,
    },
  ],
});

export default router;
