import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "general",
    component: () => import("@/view/login"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login"),
    meta: {
      auth: false,
    },
  },
  {
    path: "*",
    redirect: "/login",
  },
];

Vue.router = new VueRouter({
  routes,
});

export default Vue.router;
