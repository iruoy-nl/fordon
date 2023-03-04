import {createRouter, createWebHistory} from 'vue-router';
import App from '~/pages/App.vue';
import AppDashboard from '~/pages/AppDashboard.vue';
import AppGarage from '~/pages/AppGarage.vue';
import AppGarageShow from '~/pages/AppGarageShow.vue';
import AppMaintenance from '~/pages/AppMaintenance.vue';
import AppMileages from '~/pages/AppMileages.vue';
import AppParts from '~/pages/AppParts.vue';
import AppSettings from '~/pages/AppSettings.vue';
import OAuthPage from '~/pages/OAuth.vue';
import {isAuthenticated} from './middleware';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/oauth',
      name: 'oauth',
      component: OAuthPage
    },
    {
      path: '/app',
      name: 'app',
      redirect: {name: 'dashboard'},
      component: App,
      children: [
        {
          path: 'garage',
          name: 'garage',
          component: AppGarage
        },
        {
          path: 'garage/:id',
          name: 'garage-show',
          component: AppGarageShow
        },
        {
          path: 'kilometers',
          name: 'mileages',
          component: AppMileages
        },
        {
          path: 'onderdelen',
          name: 'parts',
          component: AppParts
        },
        {
          path: 'onderhoud',
          name:'maintenance',
          component: AppMaintenance
        },
        {
          path: 'instellingen',
          name: 'settings',
          component: AppSettings
        },
        {
          path: 'overzicht',
          name: 'dashboard',
          component: AppDashboard
        }
      ]
    }
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  const protect = /^\/app.*/;

  if (protect.test(to.path)) {
    const result = isAuthenticated(to, from, next);
    if (result) {
      next(result);
      return;
    }
  }

  next();
});

export default router;
