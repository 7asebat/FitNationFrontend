<template>
  <div class="d-flex flex-column justify-content-center">
    <div class="mb-5">
      <h1 class="c-popular-exercises-title">
        <span class="text-dark">Popular </span>
        <span class="text-danger">Exercises</span>
      </h1>
      <p class="text-secondary">
        Lorem ipsum dolor sit amet, nconsectetur adipisicing elit.
      </p>
    </div>

    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
        v-for="workout in popularExercises"
        :key="workout"
      >
        <ExerciseCard :data="exerciseData[0]"/>
      </div>
    </div>
  </div>
</template>

<script>
import exerciseData from "@/assets/json/popularExercises.json";
export default {
  name: "PopularExercises",

  data: () => ({
    popularExercises: [0, 1, 2, 3, 4, 5, 6, 7, 8],

    // TODO(Abdelrahman) Assign this
    exerciseData 
  }),

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
  },
};
</script>

<style lang="scss" scoped>
.c-popular-exercises-title,
.c-popular-exercises-title * {
  font-family: "Bebas Neue", cursive;
}
</style>
