<template>
  <b-modal
    scrollable
    :id="`workoutPerfBuilderModal-${modalId}`"
    size="lg"
    title="Add this week's workout"
    ok-title="Add Exercises"
    cancel-variant="outline-primary"
  >
    <b-input-group class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        type="search"
        v-model="exerciseQuery"
        placeholder="Search Exercises"
        @input="getExercises"
      ></b-form-input>
    </b-input-group>

    <div class="d-flex flex-column">
      <div class="row rounded border-primary py-3">
        <div
          class="col-12 mb-3"
          v-for="exercise in exercises"
          :key="exercise.id"
        >
          <div class="d-flex bg-light round-corner overflow-hidden">
            <video
              v-if="exercise.clip"
              :src="exercise.clip"
              class="exerciseImage"
              type="video/mp4"
            ></video>

            <img
              v-else-if="exercise.image"
              class="exerciseImage"
              :src="exercise.image"
              alt=""
            />

            <img
              v-else
              class="exerciseImage"
              src="@/assets/images/defaultExercise.png"
              alt=""
            />

            <div class="mx-3 py-3">
              <h4>{{ exercise.name }}</h4>
              <div class="d-flex flex-wrap">
                <b-form-input
                  type="number"
                  v-model="exercise.sets"
                  placeholder="Sets"
                  class="mr-3 mb-2 h-auto flexItem"
                  @click.stop=""
                ></b-form-input>

                <b-form-input
                  type="number"
                  v-model="exercise.reps"
                  placeholder="Reps"
                  class="mr-3 mb-2 h-auto flexItem"
                  @click.stop=""
                ></b-form-input>

                <b-form-input
                  type="number"
                  v-model="exercise.performance"
                  placeholder="Weight"
                  class="mr-3 mb-2 h-auto flexItem"
                  @click.stop=""
                ></b-form-input>

                <button
                  class="btn mb-2 btn-success flexItem h-auto"
                  @click.prevent="addExercise(exercise)"
                  :disabled="
                    !exercise.reps || !exercise.sets || !exercise.performance
                  "
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="!exercises.length" class="text-center round-corner py-4">
        <h1 class="u-title-font">
          No search results for :
          <span class="text-primary">{{ exerciseQuery }}</span>
        </h1>
        <p class="text-secondary">
          No exercises match this name, try searching with another query.
        </p>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ExercisePerfBuilderModal",

  created() {
    this.getExercises(this.exerciseQuery);
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
    async getExercises(query) {
      this.isLoading = true;
      try {
        const response = await this.axios.get(`exercises?q=${query}`);
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
  object-fit: cover;
}

.flexItem {
  flex: 0 0 140px;
}
</style>
