<template>
  <div>
    <div v-if="!workoutPlans.length" class="text-center p-5">
      <h1 class="u-title-font">You haven't created any workout plans yet!</h1>
      <p class="text-secondary">
        Customize your experience and create your own workout plan now.
      </p>
      <router-link :to="{ name: 'WorkoutBuilder' }" class="btn btn-primary">
        Create your own workout
      </router-link>
    </div>

    <div v-if="workoutPlans.length">
      <h1 class="u-title-font m-0">My Workouts</h1>
      <p class="text-secondary">A list of all workouts you have created</p>
      <div class="row">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="workout in workoutPlans"
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
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getMyWorkoutPlans();
  },

  data() {
    return {
      workoutPlans: [],
    };
  },

  components: {
    WorkoutCard: () => import("@/components/WorkoutCard.vue"),
  },

  methods: {
    async getMyWorkoutPlans() {
      try {
        const response = await this.axios.get("me/workout_plans");
        const workoutPlans = response.data.data.workout_plans;

        this.workoutPlans = workoutPlans;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
