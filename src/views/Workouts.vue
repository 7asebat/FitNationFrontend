<template>
  <div>
    <div class="container">
      <ImageText
        title="Workout Plans"
        imgSrc="workoutsHeader.png"
        :primaryButtonText="canCreateWorkout ? 'Create your own plan' : ''"
        :primaryButtonRoute="canCreateWorkout ? 'WorkoutBuilder' : ''"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          veniam iusto esse impedit expedita itaque praesentium dolorum, dolorem
          eum earum fuga cum explicabo provident consequuntur. Ea dolorem non
          natus voluptates."
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
