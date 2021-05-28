export default [
  {
    path: "/login",
    name: "Login",

    component: () => import(/* webpackChunkName: "auth" */ "@/views/Login.vue"),
  },
];
