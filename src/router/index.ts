import {createRouter, createWebHistory} from 'vue-router';
import App from '~/pages/App.vue';
import AppGarage from '~/pages/AppGarage.vue';
import AppGarageShow from '~/pages/AppGarageShow.vue';
import AppMileages from '~/pages/AppMileages.vue';
import AppParts from '~/pages/AppParts.vue';
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
      redirect: {name: 'mileages'},
      component: App,
      children: [
        {
          path: 'voertuigen',
          name: 'garage',
          component: AppGarage
        },
        {
          path: 'voertuigen/:id',
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
        }
      ]
    }
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  const protect = /^\/app.*/;

  if (protect.test(to.path)) {
    return isAuthenticated(to, from, next);
  }

  next();
});

export default router;
