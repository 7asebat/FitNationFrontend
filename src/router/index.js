import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AuthRoutes from "./Auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "Index",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Index.vue"),
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
        path: "/workouts",
        name: "Workouts",
        component: () =>
          import(/* webpackChunkName: "workouts" */ "@/views/Workouts.vue"),
      },

      {
        path: "/workouts/:id",
        name: "SingleWorkout",
        component: () =>
          import(
            /* webpackChunkName: "workouts" */ "@/views/SingleWorkout.vue"
          ),
      },

      {
        path: "/exercises",
        name: "Exercises",
        component: () =>
          import(/* webpackChunkName: "exercises" */ "@/views/Exercises.vue"),
      },

      {
        path: "/meals",
        name: "Meals",
        component: () =>
          import(/* webpackChunkName: "meals" */ "@/views/Meals.vue"),
      },
      ...AuthRoutes,
    ],
  },
  {
    path: "/panel",
    name: "Panel",
    component: () =>
      import(/* webpackChunkName: "Panel" */ "../views/Panel.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
