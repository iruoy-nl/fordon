import {createRouter, createWebHistory} from "vue-router";
import App from '~/pages/App.vue';
import AppVehicleAdd from '~/pages/AppVehicleAdd.vue';
import AppVehicleEdit from '~/pages/AppVehicleEdit.vue';
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
      redirect: {name: 'vehicle-list'},
      component: App,
      children: [
        {
          path: 'voertuigen',
          name: 'vehicle-list',
          component: AppVehicleList,
        },
        {
          path: 'voertuigen/add',
          name: 'vehicle-add',
          component: AppVehicleAdd,
        },
        {
          path: 'voertuigen/:id',
          name: 'vehicle-show',
          component: AppVehicleShow,
        },
        {
          path: 'voertuigen/:id/edit',
          name: 'vehicle-edit',
          component: AppVehicleEdit,
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
