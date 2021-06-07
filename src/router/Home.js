export default [
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
    props: true,
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
    path: "/meals/:id",
    name: "SingleMeal",
    component: () =>
      import(/* webpackChunkName: "meals" */ "@/views/SingleMeal.vue"),
  },
  {
    path: "/workout-builder",
    name: "WorkoutBuilder",
    component: () =>
      import(/* webpackChunkName: "workouts" */ "@/views/WorkoutBuilder.vue"),
  },
  {
    path: "/recipes-builder",
    name: "RecipesBuilder",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/RecipesBuilder.vue"),
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    redirect: { name: "ProfileOverview" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "ProfileOverview",
        component: () => import("@/components/Profile/ProfileOverview.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "nutrition-info",
        name: "NutritionInfo",
        component: () => import("@/components/Profile/NutritionInfo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "workout-performance",
        name: "WorkoutPerformance",
        component: () => import("@/components/Profile/WorkoutPerformance.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "my-workout-plans",
        name: "MyWorkoutPlans",
        component: () => import("@/components/Profile/MyWorkoutPlans.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];
