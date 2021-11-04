import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "general",
    component: () => import("@/view/general"),
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
    path: "/registration",
    name: "registration",
    component: () => import("@/view/registration"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/cabinet",
    name: "cabinet",
    component: () => import("@/view/cabinet"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/history",
    name: "history",
    component: () => import("@/view/history"),
    meta: {
      auth: {
        roles: "client",
        redirect: "/",
      },
    },
  },
  {
    path: "/cabinet_factory",
    name: "cabinetFactory",
    component: () => import("@/view/cabinetFactory"),
    meta: {
      auth: {
        roles: ["admin", "owner"],
        redirect: "/",
      },
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
