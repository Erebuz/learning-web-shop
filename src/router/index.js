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
    path: "/order",
    name: "order",
    props: true,
    component: () => import("@/view/order"),
  },
  {
    path: "/basket",
    name: "basket",
    component: () => import("@/view/basket"),
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
      auth: true,
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
    path: "/orders",
    name: "orders",
    component: () => import("@/view/orders"),
    meta: {
      auth: {
        roles: ["seller"],
        redirect: "/",
      },
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/view/products"),
    meta: {
      auth: {
        roles: ["seller", "owner"],
        redirect: "/",
      },
    },
  },
  {
    path: "/new_product",
    name: "new_product",
    component: () => import("@/view/new_product"),
    meta: {
      auth: {
        roles: ["seller", "owner"],
        redirect: "/",
      },
    },
  },
  {
    path: "/rating",
    name: "rating",
    component: () => import("@/view/rating"),
    meta: {
      auth: {
        roles: ["owner"],
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
