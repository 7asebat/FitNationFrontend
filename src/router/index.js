import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";

import AuthRoutes from "./Auth";
import PanelRoutes from "./Panel";
import HomeRoutes from "./Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [...HomeRoutes, ...AuthRoutes],
  },
  {
    path: "/panel",
    name: "Panel",
    redirect: { name: "PanelDashboard" },
    component: () =>
      import(/* webpackChunkName: "Panel" */ "../views/Panel.vue"),
    children: [...PanelRoutes],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;

  const loggedInUser = store.state.user;
  loggedInUser;
  const userRole = loggedInUser ? loggedInUser.role : null;
  userRole;

  const requiresNotAuth = to.matched.some(
    (record) => record.meta.requiresNotAuth
  );
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const routeRoles = to.meta.roles;

  if (requiresNotAuth && loggedInUser) next({ name: "Index" });

  if (requiresAuth && !loggedInUser)
    next({
      name: "Login",
      query: {
        previous: to.fullPath,
      },
    });

  if (routeRoles && !routeRoles.includes(userRole))
    next({
      name: "Index",
    });
  else next();
});

export default router;
