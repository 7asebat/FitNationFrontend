<template>
  <b-modal
    :id="modalId"
    size="lg"
    title="Add this week's workout"
    ok-title="Confirm"
    @ok="confirmEdits"
  >
    <div class="d-flex flex-column">
      <h4>Recommended Based on your workouts</h4>
      <!-- <b-input-group class="mx-auto mb-3">
        <template #append>
          <b-input-group-text class="bg-white border-left-0 pr-3">
            <i class="fas fa-search" />
          </b-input-group-text>
        </template>

        <b-form-input
          v-model="exerciseQuery"
          class="border-right-0 text-right"
        />
      </b-input-group> -->

      <div class="row rounded border-primary py-3">
        <div
          class="col-12 mb-3"
          v-for="exercise in exercises"
          :key="exercise.id"
        >
          <div class="d-flex">
            <img
              class="exerciseImage"
              src="@/assets/images/stayFit.png"
              alt=""
            />
            <div class="ml-3">
              <h4>{{ exercise.name }}</h4>
              <div class="d-flex">
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
            </div>
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
    // ExerciseCard: () => import("@/components/ExerciseCard.vue"),
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
          if (!exercise.reps) exercise.reps = "";
          if (!exercise.sets) exercise.sets = "";
          if (!exercise.weight) exercise.weight = "";

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
.exerciseImage {
  width: 100px;
}
</style>
