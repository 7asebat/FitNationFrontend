import store from "@/store/index";

export default [
  {
    path: "",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Index.vue"),
    meta: {
      title: "FitNation",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "About",
    },
  },
  {
    path: "/workouts",
    name: "Workouts",
    component: () =>
      import(/* webpackChunkName: "workouts" */ "@/views/Workouts.vue"),
    meta: {
      title: "Workouts",
    },
  },

  {
    path: "/workouts/:id",
    name: "SingleWorkout",
    props: true,
    component: () =>
      import(/* webpackChunkName: "workouts" */ "@/views/SingleWorkout.vue"),
    meta: {
      meta: {
        title: "Workout",
      },
    },
  },

  {
    path: "/exercises",
    name: "Exercises",
    component: () =>
      import(/* webpackChunkName: "exercises" */ "@/views/Exercises.vue"),
    meta: {
      title: "Exercises",
    },
  },

  {
    path: "/recipes",
    name: "Recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/Recipes.vue"),
    meta: {
      title: "Recipes",
    },
  },
  {
    path: "/recipes/:id",
    name: "SingleRecipe",
    props: true,
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/SingleRecipe.vue"),
    meta: {
      title: "Recipe",
    },
  },
  {
    path: "/workout-builder",
    name: "WorkoutBuilder",
    component: () =>
      import(/* webpackChunkName: "workouts" */ "@/views/WorkoutBuilder.vue"),
    meta: {
      roles: ["client", "trainer"],
      requiresAuth: true,
      title: "Workout Builder",
    },
  },
  {
    path: "/recipes-builder",
    name: "RecipesBuilder",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/RecipesBuilder.vue"),
    meta: {
      roles: ["nutritionist"],
      requiresAuth: true,
      title: "Recipes Builder",
    },
  },
  {
    path: "inbox",
    name: "Inbox",
    component: () => import("@/components/Profile/Inbox.vue"),
    meta: { requiresAuth: true, roles: ["client", "trainer"] },
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
        meta: { requiresAuth: true, title: "Profile Overview" },
      },
      {
        path: "nutrition-info",
        name: "NutritionInfo",
        component: () => import("@/components/Profile/NutritionInfo.vue"),
        meta: { requiresAuth: true, title: "Nutrition Info" },
      },
      {
        path: "workout-performance",
        name: "WorkoutPerformance",
        component: () => import("@/components/Profile/WorkoutPerformance.vue"),
        meta: { requiresAuth: true, title: "Workout Performance" },
      },
      {
        path: "my-workout-plans",
        name: "MyWorkoutPlans",
        component: () => import("@/components/Profile/MyWorkoutPlans.vue"),
        meta: { requiresAuth: true, title: "My Workout Plans" },
      },
      {
        path: "my-recipes",
        name: "MyRecipes",
        component: () => import("@/components/Profile/MyRecipes.vue"),
        meta: { requiresAuth: true, title: "My Recipes" },
      },
    ],
  },
];
