<template>
  <div>
    <div class="container">
      <WorkoutInfo :workout="workout" class="my-5" />
      <WorkoutExercises :days="workout.exercise_instances" />
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
      workout: {},
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