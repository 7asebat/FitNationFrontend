export default [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/Login.vue"),
    meta: { requiresNotAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/views/Signup.vue"),
    meta: { requiresNotAuth: true },
  },
];
