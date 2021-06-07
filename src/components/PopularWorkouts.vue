<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <h1 class="c-popular-workouts-title">
          Popular
          <span class="text-danger">Workouts</span>
        </h1>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, nconsectetur adipisicing elit.
        </p>
      </div>

      <div>
        <router-link class="btn btn-primary" :to="{ name: 'WorkoutBuilder' }">
          Create your own workout
        </router-link>
      </div>
    </div>

    <div class="row">
      <div
        class="col col-md-3 mb-3"
        v-for="workout in workouts"
        :key="workout.id"
      >
        <router-link
          :to="{ name: 'SingleWorkout', params: { id: workout.id } }"
        >
          <WorkoutCard
            :title="workout.name"
            :level="workout.level"
            :exercisesNumber="workout.exercises_count"
            :equipmentsRequired="workout.requires_equipment"
            :image="workout.image"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getWorkouts();
  },

  data() {
    return {
      workouts: [],
    };
  },

  methods: {
    async getWorkouts() {
      try {
        const response = await this.axios.get("workout_plans");
        const workouts = response.data.data.workout_plans;

        this.workouts = workouts;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },

  components: {
    WorkoutCard: () => import("@/components/WorkoutCard.vue"),
  },
};
</script>

<style lang="scss" scoped>
.c-popular-workouts-title,
.c-popular-workouts-title * {
  font-family: "Bebas Neue", cursive;
}
</style>