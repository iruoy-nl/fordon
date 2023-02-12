import {createRouter, createWebHistory} from "vue-router";
import App from '~/pages/App.vue';
import AppMileageList from '~/pages/AppMileageList.vue';
import AppVehicleList from '~/pages/AppVehicleList.vue';
import AppVehicleShow from '~/pages/AppVehicleShow.vue';
import OAuthPage from "~/pages/OAuth.vue";
import {isAuthenticated} from "./middleware";

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
      redirect: {name: 'mileage-list'},
      component: App,
      children: [
        {
          path: 'kilometers',
          name: 'mileage-list',
          component: AppMileageList,
        },
        {
          path: 'voertuigen',
          name: 'vehicle-list',
          component: AppVehicleList,
        },
        {
          path: 'voertuigen/:id',
          name: 'vehicle-show',
          component: AppVehicleShow,
        },
      ],
    }
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const protect = /^\/app.*/;

  if (protect.test(to.path)) {
    return isAuthenticated(to, from, next);
  }

  next();
});

export default router;
