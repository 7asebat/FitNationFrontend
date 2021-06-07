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
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  {
    path: "/list/:type",
    name: "ListPanel",

    component: () =>
      import(/* webpackChunkName: "meals" */ "@/views/ListPanel.vue"),
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
  console.log(loggedInUser);
  const userRole = loggedInUser ? loggedInUser.role : null;
  console.log(userRole);

  const requiresNotAuth = to.matched.some(
    (record) => record.meta.requiresNotAuth
  );
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const routeRoles = to.meta.roles;

  if (requiresNotAuth && loggedInUser) next({ name: "Home" });

  if (requiresAuth && !loggedInUser)
    next({
      name: "Login",
      query: {
        previous: to.fullPath,
      },
    });

  if (routeRoles && !routeRoles.includes(userRole))
    next({
      name: "Home",
    });
  else next();
});

export default router;
