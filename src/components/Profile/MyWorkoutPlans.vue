<template>
  <div>
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  created() {
    this.getMyWorkoutPlans();
  },

  methods: {
    async getMyWorkoutPlans() {
      try {
        const response = await this.axios.get("me/workout_plans");
        console.log(response);
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
