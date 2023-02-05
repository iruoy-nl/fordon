import {createRouter, createWebHistory} from "vue-router";
import App from '~/pages/App.vue';
import AppVehicleList from '~/pages/AppVehicleList.vue';
import OAuthPage from "~/pages/OAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/oauth",
      name: "oauth",
      component: OAuthPage,
    },
    {
      path: '/app',
      name: 'app',
      redirect: {name: 'vehicles'},
      component: App,
      children: [
        {
          path: 'voertuigen',
          name: 'vehicles',
          component: AppVehicleList,
        }
      ],
    }
  ],
  linkActiveClass: "active",
});

export default router;
