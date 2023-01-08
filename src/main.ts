import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";

import "./style.scss";

createApp(App) //
  .use(Router)
  .mount("#app");
