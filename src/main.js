import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { store } from "@/store";
import router from "@/router";
import http from "@/plugins/http";
import auth from "@/plugins/auth";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  http,
  auth,
  render: (h) => h(App),
}).$mount("#app");
