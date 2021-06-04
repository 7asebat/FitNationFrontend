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
  },
  {
    path: "/panel",
    name: "Panel",
    component: () =>
      import(/* webpackChunkName: "Panel" */ "../views/Panel.vue"),
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
      import(/* webpackChunkName: "workouts" */ "@/views/SingleWorkout.vue"),
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

  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    redirect: { name: "ProfileOverview" },
    children: [
      {
        path: "overview",
        name: "ProfileOverview",
        component: () => import("@/components/Profile/ProfileOverview.vue"),
      },
      {
        path: "nutrition-info",
        name: "NutritionInfo",
        component: () => import("@/components/Profile/NutritionInfo.vue"),
      },
      {
        path: "workout-performance",
        name: "WorkoutPerformance",
        component: () => import("@/components/Profile/WorkoutPerformance.vue"),
      },
    ],
  },
  ...AuthRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
