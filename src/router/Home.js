import store from "@/store/index";

export default [
  {
    path: "",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Index.vue"),
  },
  {
    path: "/about",
    name: "About",
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
    meta: {
      roles: ["client", "trainer"],
    },
  },

  {
    path: "/exercises",
    name: "Exercises",
    component: () =>
      import(/* webpackChunkName: "exercises" */ "@/views/Exercises.vue"),
  },

  {
    path: "/recipes",
    name: "Recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/Recipes.vue"),
  },
  {
    path: "/recipes/:id",
    name: "SingleRecipe",
    props: true,
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/SingleRecipe.vue"),
  },
  {
    path: "/workout-builder",
    name: "WorkoutBuilder",
    component: () =>
      import(/* webpackChunkName: "workouts" */ "@/views/WorkoutBuilder.vue"),
    meta: {
      roles: ["client", "trainer"],
    },
  },
  {
    path: "/recipes-builder",
    name: "RecipesBuilder",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/RecipesBuilder.vue"),
    meta: {
      roles: ["nutritionist"],
    },
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    redirect: () => {
      const user = store.state.user;
      if (!user) return { name: "Index" };

      const userRole = user.role;
      switch (userRole) {
        case "client":
          return { name: "ProfileOverview" };

        case "trainer":
          return { name: "MyWorkoutPlans" };

        case "nutritionist":
          return { name: "MyRecipes" };

        case "admin":
          return { name: "PanelDashboard" };

        default:
          return { name: "Index" };
      }
    },
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
      {
        path: "my-recipes",
        name: "MyRecipes",
        component: () => import("@/components/Profile/MyRecipes.vue"),
        meta: { requiresAuth: true },
      },
    ],
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
      import(/* webpackChunkName: "recipes" */ "@/views/ListPanel.vue"),
  },
];
