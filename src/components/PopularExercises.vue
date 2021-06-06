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

    <Loading v-if="isLoading" />

    <div v-if="!isLoading" class="row">
      <div
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
        v-for="exercise in popularExercises"
        :key="exercise.id"
      >
        <ExerciseCard :data="exercise" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularExercises",

  created() {
    this.getExercises();
  },

  data: () => ({
    popularExercises: [],
    isLoading: false,
  }),

  methods: {
    async getExercises() {
      this.isLoading = true;
      try {
        const response = await this.axios.get("exercises");
        this.popularExercises = response.data.data.exercises;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
  },

  components: {
    Loading: () => import("@/components/common/Loading.vue"),
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
