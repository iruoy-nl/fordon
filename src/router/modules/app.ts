import type { RouteRecordRaw } from "vue-router";
import AppPage from "~/pages/App.vue";
import AppDashboardPage from "~/pages/AppDashboard.vue";
import AppGaragePage from "~/pages/AppGarage.vue";
import AppMaintenancePage from "~/pages/AppMaintenance.vue";
import AppMileagePage from "~/pages/AppMileage.vue";
import AppSettingsPage from "~/pages/AppSettings.vue";
import { isAuthenticated } from "~/router/middleware";

const routes: RouteRecordRaw[] = [
  {
    path: "/app",
    name: "app",
    component: AppPage,
    beforeEnter: [isAuthenticated],
    children: [
      {
        path: "",
        redirect: { name: "dashboard" },
      },
      {
        path: "overzicht",
        name: "dashboard",
        component: AppDashboardPage,
      },
      {
        path: "kilometers",
        name: "mileage",
        component: AppMileagePage,
      },
      {
        path: "onderhoud",
        name: "maintenance",
        component: AppMaintenancePage,
      },
      {
        path: "garage",
        name: "garage",
        component: AppGaragePage,
      },
      {
        path: "instellingen",
        name: "settings",
        component: AppSettingsPage,
      },
    ],
  },
];

export default routes;
