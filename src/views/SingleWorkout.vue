<template>
  <div>
    <div class="container">
      <div v-if="workout">
        <WorkoutInfo :workout="workout" class="my-5" />
        <WorkoutExercises :days="workout.exercise_instances" />
      </div>

      <div v-else class="py-5 text-center">
        <h1 class="u-title-font">No workout found</h1>
        <p class="text-secondary">
          No workout with this id was found in our database.
        </p>
        <router-link :to="{ name: 'Index' }" class="btn btn-primary"
          >Back to homepage</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getWorkoutData();
  },

  props: {
    id: String,
  },

  data() {
    return {
      workout: undefined,
    };
  },

  methods: {
    async getWorkoutData() {
      try {
        const response = await this.axios.get(`workout_plans/${this.id}`);
        const workout = response.data.workout_plan;

        this.workout = workout;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },

  components: {
    WorkoutInfo: () => import("@/components/WorkoutInfo.vue"),
    WorkoutExercises: () => import("@/components/WorkoutExercises.vue"),
  },
};
</script>