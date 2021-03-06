<template>
  <div class="d-flex flex-column justify-content-center" id="exercises">
    <div class="pb-3">
      <h1 class="c-popular-exercises-title">
        <span class="text-dark">Popular </span>
        <span class="text-danger">Exercises</span>
        <span v-if="muscleGroup"> for {{ muscleGroup }}</span>
      </h1>
      <p class="text-secondary">List of exercises you can choose from them</p>
    </div>

    <div
      class="round-corner p-5 text-center bg-light"
      v-show="muscleGroup && !popularExercises.length"
    >
      <h1><i class="fas fa-exclamation"></i></h1>
      <h3 class="u-title-font">No Exercises for the selected muscle</h3>
      <p class="text-secondary">
        unfortunately, there are no exercises for this muscle currently. Please
        check again soon.
      </p>
    </div>

    <div v-if="!isLoading" class="row">
      <div
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
        v-for="exercise in popularExercises"
        :key="exercise.id"
      >
        <ExerciseCard :data="exercise" />
      </div>
    </div>

    <b-pagination
      v-model="meta.page"
      :total-rows="meta.total"
      :per-page="meta.limit"
      @change="
        (page) => {
          getExercises(page);
        }
      "
      align="right"
      first-number
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: "PopularExercises",

  created() {
    this.getExercises(1);
  },

  data: () => ({
    popularExercises: [],
    isLoading: false,
    meta: {},
  }),

  props: {
    muscleGroup: {
      type: String,
      default: "",
    },
  },

  computed: {
    musclesEnum() {
      return this.$store.state.enums.muscles;
    },
  },

  methods: {
    async getExercises(exercisesPage) {
      this.isLoading = true;
      try {
        let response;
        if (this.muscleGroup) {
          const muscleGroup = Object.keys(this.musclesEnum).find(
            (key) => this.musclesEnum[key] === this.muscleGroup.toLowerCase()
          );

          response = await this.axios.get(
            `exercises/muscle_group?muscle_group=${muscleGroup}&page=${exercisesPage}`
          );
        } else
          response = await this.axios.get(`exercises?page=${exercisesPage}`);

        const { count, limit, page, total } = response.data;
        const meta = { count, limit, page, total };

        this.meta = meta;

        this.popularExercises = response.data.data.exercises;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
  },

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
  },

  watch: {
    muscleGroup() {
      this.getExercises(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.c-popular-exercises-title,
.c-popular-exercises-title * {
  font-family: "Bebas Neue", cursive;
}
</style>
