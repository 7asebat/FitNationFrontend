export default [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/views/Signup.vue"),
  },
];
