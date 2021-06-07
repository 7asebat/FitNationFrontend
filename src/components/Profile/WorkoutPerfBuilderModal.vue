<template>
  <b-modal
    :id="`workoutPerfBuilderModal-${modalId}`"
    size="lg"
    title="Add this week's workout"
    ok-title="Add Exercises"
    @ok="confirmEdits"
  >
    <div class="d-flex flex-column">
      <div class="row rounded border-primary py-3">
        <div
          class="col-12 mb-3"
          v-for="exercise in exercises"
          :key="exercise.id"
        >
          <div class="d-flex">
            <div>
              <img
                class="exerciseImage"
                src="@/assets/images/stayFit.png"
                alt=""
              />
            </div>
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
                  v-model="exercise.performance"
                  placeholder="Weight"
                  @click.stop=""
                ></b-form-input>

                <button
                  class="btn btn-success"
                  @click.prevent="addExercise(exercise)"
                >
                  Add
                </button>
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
    activeDay: Date,
  },

  methods: {
    async addExercise(exercise) {
      try {
        const payload = {
          performance: exercise.performance,
          date: this.activeDay,
          exercise_id: exercise.id,
          sets: exercise.seps,
          reps: exercise.reps,
        };

        await this.axios.post("clients/exercises_instances", payload);

        this.$notification(
          "successNotification",
          "Exercises of your day have been updated successfully"
        );

        this.$emit("addExercise", exercise);
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
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
          if (!exercise.performance) exercise.performance = "";

          return exercise;
        });

        this.exercises = exercises;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    async confirmEdits() {
      try {
        // const payload

        await this.axios.post("clients/exercises_instances");
      } catch (err) {
        this.$errorsHandler(err);
      }

      const exercises = this.exercises.filter(
        (exercise) => (exercise.sets > 0) & (exercise.reps > 0)
      );

      // await this

      console.log(exercises);

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
  width: 80px;
}
</style>
