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
        <a href="" class="btn btn-primary">Create your own workout</a>
      </div>
    </div>

    <div class="row">
      <div
        class="col col-md-3 mb-3"
        v-for="workout in popularWorkouts"
        :key="workout"
      >
        <WorkoutCard
          level="Intermediate"
          :calories="1200"
          :exercisesNumber="5"
          :equipmentsRequired="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popularWorkouts: [1, 2, 3, 4, 5, 6, 7, 8],
    };
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