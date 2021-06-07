<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { EventBus } from "@/plugins/eventBus.js";

export default {
  created() {
    if (this.loggedInUser) this.updateLoggedInUser();

    EventBus.$on("errorNotification", (message, title) => {
      if (!title) title = "Error happened!";
      this.makeToast(title, message, "danger");
    });

    EventBus.$on("successNotification", (message, title) => {
      if (!title) title = "Successful operation";
      this.makeToast(title, message, "success");
    });
  },

  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    async updateLoggedInUser() {
      try {
        const response = await this.axios.get("authentication/current_user");
        const user = response.data.data.user;

        this.$store.commit("setUser", user);
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    makeToast(title, message, variant = null) {
      this.$bvToast.toast(message, {
        title,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style lang="scss">
</style>
