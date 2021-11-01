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
    path: "/admin",
    name: "admin",
    component: () => import("@/view/admin"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/view/user"),
    meta: {
      auth: true,
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
