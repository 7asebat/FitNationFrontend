<template>
  <div class="container-fluid p-4">
    <p class="c-profile-overview__notification bg-light p-3 text-dark">
      <i class="fas fa-running"></i>
      <span class="ml-2">Time is running out, you should run too!</span>
    </p>
    <div class="row p-2">
      <div class="col-xl-3 col-lg-6 col-md-12 my-1">
        <div class="c-activity-card bg-primary py-3 px-4 text-light">
          <h1 class="m-0"><i class="fas fa-dumbbell"></i></h1>
          <h1 class="m-0">{{ exercisesCount }}</h1>
          <p class="m-0 text-black">
            {{ exercisesCount == 1 ? "Exercise" : "Exercises" }}
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-12 my-1">
        <div class="c-activity-card bg-success py-3 px-4 text-light">
          <h1 class="m-0"><i class="fas fa-award"></i></h1>
          <h1 class="m-0">
            {{ longestStreak }} {{ longestStreak == 1 ? "Day" : "Days" }}
          </h1>
          <p class="m-0 text-black">Longest Streak</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileOverview",

  data() {
    return {
      longestStreak: "",
      exercisesCount: "",
    };
  },

  async created() {
    this.getOverview();
  },

  methods: {
    async getOverview() {
      try {
        const response = await this.axios.get("clients/dashboard");

        this.longestStreak = response.data.longest_streak;
        this.exercisesCount = response.data.exercise_instances_count;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style></style>

<style lang="scss" scoped>
.c-profile-overview__notification {
  border-radius: $border-radius;
}
.c-activity-card {
  border-radius: $border-radius;
}
</style>
