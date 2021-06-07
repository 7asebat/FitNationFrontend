export default [
  {
    path: "dashboard",
    name: "PanelDashboard",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/Dashboard.vue"),
    meta: {
      roles: ["admin"],
    },
  },
  {
    path: "clients",
    name: "PanelListClients",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListClients.vue"),
    meta: {
      roles: ["admin"],
    },
  },
  {
    path: "trainers",
    name: "PanelListTrainers",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListTrainers.vue"),
    meta: {
      roles: ["admin"],
    },
  },
  {
    path: "nutritionists",
    name: "PanelListNutritionists",
    component: () =>
      import(
        /* webpackChunkName: "panel" */ "@/views/Panel/ListNutritionists.vue"
      ),
    meta: {
      roles: ["admin"],
    },
  },
  {
    path: "food",
    name: "PanelListFood",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListFood.vue"),
    meta: {
      roles: ["admin"],
    },
  },
  {
    path: "exercises",
    name: "PanelListExercises",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListExercises.vue"),
    meta: {
      roles: ["admin"],
    },
  },
];
