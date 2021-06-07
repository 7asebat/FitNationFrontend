export default [
  {
    path: "dashboard",
    name: "PanelDashboard",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/Dashboard.vue"),
    meta: {},
  },
  {
    path: "clients",
    name: "PanelListClients",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListClients.vue"),
    meta: {},
  },
  {
    path: "trainers",
    name: "PanelListTrainers",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListTrainers.vue"),
    meta: {},
  },
  {
    path: "nutritionists",
    name: "PanelListNutritionists",
    component: () =>
      import(
        /* webpackChunkName: "panel" */ "@/views/Panel/ListNutritionists.vue"
      ),
    meta: {},
  },
  {
    path: "food",
    name: "PanelListFood",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListFood.vue"),
    meta: {},
  },
  {
    path: "exercises",
    name: "PanelListExercises",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListExercises.vue"),
    meta: {},
  },
];
