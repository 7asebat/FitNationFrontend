<template>
  <div>
    <div class="container">
      <ImageText
        title="Workout Plans"
        imgSrc="workoutsHeader.png"
        primaryButtonText="Create your own plan"
        primaryButtonRoute="WorkoutBuilder"
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
  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
    GoalsSlider: () => import("@/components/GoalsSlider.vue"),
    PopularWorkouts: () => import("@/components/PopularWorkouts.vue"),
  },
};
</script>
