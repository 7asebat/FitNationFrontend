<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { EventBus } from "@/plugins/eventBus.js";

export default {
  created() {
    EventBus.$on("errorNotification", (message, title) => {
      if (!title) title = "Error happened!";
      this.makeToast(title, message, "danger");
    });

    EventBus.$on("successNotification", (message, title) => {
      if (!title) title = "Successful operation";
      this.makeToast(title, message, "success");
    });
  },
  methods: {
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
