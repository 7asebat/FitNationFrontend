export default [
  {
    path: "dashboard",
    name: "PanelDashboard",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/Dashboard.vue"),
    meta: { roles: ["admin"], title: "Dashboard" },
  },
  {
    path: "clients",
    name: "PanelListClients",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListClients.vue"),
    meta: { roles: ["admin"], title: "List Clients" },
  },
  {
    path: "trainers",
    name: "PanelListTrainers",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListTrainers.vue"),
    meta: { roles: ["admin"], title: "List Trainers" },
  },
  {
    path: "nutritionists",
    name: "PanelListNutritionists",
    component: () =>
      import(
        /* webpackChunkName: "panel" */ "@/views/Panel/ListNutritionists.vue"
      ),
    meta: { roles: ["admin"], title: "List Nutritionists" },
  },
  {
    path: "food",
    name: "PanelListFood",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListFood.vue"),
    meta: { roles: ["admin"], title: "List Food" },
  },
  {
    path: "exercises",
    name: "PanelListExercises",
    component: () =>
      import(/* webpackChunkName: "panel" */ "@/views/Panel/ListExercises.vue"),
    meta: { roles: ["admin"], title: "List Exercises" },
  },
];
