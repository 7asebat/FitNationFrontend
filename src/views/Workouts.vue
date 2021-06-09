<template>
  <div>
    <div class="container">
      <ImageText
        title="Workout Plans"
        imgSrc="workoutsHeader.png"
        :primaryButtonText="canCreateWorkout ? 'Create your own plan' : ''"
        :primaryButtonRoute="canCreateWorkout ? 'WorkoutBuilder' : ''"
        description="Now is as good a time as any to focus on getting your body into the best shape possible. Whether you want to build muscle or completely transform your body, if you follow the right workout routine for men, you will get exactly what you need."
      />
      <GoalsSlider />
      <PopularWorkouts class="my-5" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    canCreateWorkout() {
      const user = this.$store.state.user;
      if (user && ["client", "trainer"].includes(user.role)) return true;
      else return false;
    },
  },

  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
    GoalsSlider: () => import("@/components/GoalsSlider.vue"),
    PopularWorkouts: () => import("@/components/PopularWorkouts.vue"),
  },
};
</script>
