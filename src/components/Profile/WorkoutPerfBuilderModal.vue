<template>
  <b-modal
    :id="modalId"
    size="lg"
    title="Add this week's workout"
    ok-title="Confirm"
    @ok="confirmEdits"
  >
    <div class="d-flex flex-column container-fluid align-items-center">
      <b-input-group class="mx-auto mb-3">
        <template #append>
          <b-input-group-text class="bg-white border-left-0 pr-3">
            <i class="fas fa-search" />
          </b-input-group-text>
        </template>

        <b-form-input
          v-model="exerciseQuery"
          class="border-right-0 text-right"
        />
      </b-input-group>

      <div class="row rounded border-primary py-3">
        <div
          class="col-12 col-md-4 col-lg-3 mb-3"
          v-for="exercise in exercises"
          :key="exercise.id"
        >
          <div
            class="c-builder-exercises-modal__exercise-wrapper"
            @click.prevent="exercise.selected = !exercise.selected"
          >
            <div
              :class="{
                'c-builder-exercises-modal__selected-overlay--selected':
                  exercise.selected,
              }"
              class="c-builder-exercises-modal__selected-overlay px-3"
            >
              <div
                class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-center
                  h-100
                "
              >
                <b-form-input
                  type="number"
                  v-model="exercise.sets"
                  placeholder="Sets"
                  class="mb-3"
                  @click.stop=""
                ></b-form-input>

                <b-form-input
                  type="number"
                  v-model="exercise.reps"
                  placeholder="Reps"
                  class="mb-3"
                  @click.stop=""
                ></b-form-input>

                <b-form-input
                  type="number"
                  v-model="exercise.weight"
                  placeholder="Weight"
                  @click.stop=""
                ></b-form-input>
              </div>
              <!-- <i class="fas fa-check-circle"></i> -->
            </div>
            <ExerciseCard :data="exercise" />
          </div>
        </div>
      </div>

      <div></div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ExercisePerfBuilderModal",

  created() {
    this.getExercises();
  },

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
  },
  data: () => ({
    exerciseQuery: "",
    exercises: [],
  }),
  props: {
    modalId: String,
  },

  methods: {
    async getExercises() {
      this.isLoading = true;
      try {
        const response = await this.axios.get("exercises");
        let exercises = response.data.data.exercises;

        exercises = exercises.map((exercise) => {
          exercise.exercise_id = exercise.id;
          exercise.selected = false;
          exercise.reps = "";
          exercise.sets = "";
          exercise.weight = "";

          return exercise;
        });

        this.exercises = exercises;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    confirmEdits() {
      const exercises = this.exercises
        .filter((exercise) => (exercise.sets > 0) & (exercise.reps > 0))
        .map((exercise) => {
          const { name, sets, reps } = exercise;
          return { name, sets, reps };
        });
      this.$emit("confirmEdits", exercises);
      this.exercises = [];
    },
  },
};
</script>

<style scoped lang="scss">
.c-builder-exercises-modal__exercise-wrapper {
  position: relative;
  cursor: pointer;
}
.c-builder-exercises-modal__selected-overlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: $border-radius;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
}
.c-builder-exercises-modal__selected-overlay--selected {
  opacity: 1;
  visibility: visible;
}
</style>
