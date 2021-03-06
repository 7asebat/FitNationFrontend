import Vue from "vue";
import Vuex from "vuex";
import enums from "./enums";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    enums,
  },

  state: {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      context.state.user = null;
      context.state.token = null;
    },
  },
});
