export default [
  {
    path: "dashboard",
    name: "PanelDashboard",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/Dashboard.vue"),
  },
  {
    path: "clients",
    name: "PanelListClients",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListClients.vue"),
  },
  {
    path: "trainers",
    name: "PanelListTrainers",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListTrainers.vue"),
  },
  {
    path: "nutritionists",
    name: "PanelListNutritionists",
    component: () =>
      import(
        /* webpackChunkName: "panel" */ "@/views/Panel/ListNutritionists.vue"
      ),
  },
  {
    path: "food",
    name: "PanelListFood",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListFood.vue"),
  },
  {
    path: "exercises",
    name: "PanelListExercises",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListExercises.vue"),
  },
];
