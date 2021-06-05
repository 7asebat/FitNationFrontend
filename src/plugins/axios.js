import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store/index";

Vue.use(VueAxios, axios);

axios.defaults.trailingSlash = false;

axios.interceptors.request.use(
  function (config) {
    const backendEnv = process.env.VUE_APP_BACKEND_ENV;
    config.url = `${backendEnv}${config.url}`;

    const token = store.state.token;
    if (token != null) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axios;
