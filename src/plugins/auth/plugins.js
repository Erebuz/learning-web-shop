import Vue from "vue";

import auth from "@websanova/vue-auth/src/v2.js";
import driverHttpAxios from "@websanova/vue-auth/src/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/src/drivers/router/vue-router.2.x.js";

Vue.use(auth, {
  plugins: {
    http: Vue.axios,
    router: Vue.router,
  },
  drivers: {
    auth: require("./authDriver.js"),
    http: driverHttpAxios,
    router: driverRouterVueRouter,
  },
  options: {
    rolesKey: "username",
    rememberKey: "user",
    tokenDefaultKey: "access_token",
    stores: ["storage"],
    notFoundRedirect: { path: "/login" },
    forbiddenRedirect: { path: "/login" },
    logoutData: { redirect: "/login", forceRedirect: false },
    loginData: {
      url: "/auth",
      method: "POST",
    },
    fetchData: { url: "/auth/me", method: "GET", enabled: true },
    refreshData: {
      // url: "/auth/refresh",
      // method: "POST",
      // interval: 20,
      enabled: false,
    },
    makeRequest: true,
    parseUserData: (req) => {
      return req.me;
    },
  },
});
