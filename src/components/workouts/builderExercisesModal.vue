<template>
  <b-modal
    id="builderExercisesModal"
    scrollable
    size="lg"
    :title="`Add exercises to ${dayName}`"
    :ok-title="`Add Exercises (${selectedExercises.length})`"
    @ok="addExercises"
    cancel-variant="outline-primary"
  >
    <div class="row">
      <div
        class="col-sm-6 col-md-3 mb-3"
        v-for="exercise in exerciseData"
        :key="exercise.id"
      >
        <div
          class="c-builder-exercises-modal__exercise-wrapper h-100"
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
                min="0"
                @click.stop=""
              ></b-form-input>

              <b-form-input
                type="number"
                v-model="exercise.reps"
                placeholder="Reps"
                min="0"
                @click.stop=""
              ></b-form-input>
            </div>
            <!-- <i class="fas fa-check-circle"></i> -->
          </div>
          <ExerciseCard :data="exercise" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  created() {
    this.getExercises();
  },

  data() {
    return {
      exerciseData: [],
    };
  },

  props: {
    dayName: {
      type: String,
      default: "this day",
    },
  },

  computed: {
    selectedExercises() {
      return this.exerciseData.filter(
        (exercise) =>
          exercise.selected && Number(exercise.sets) && Number(exercise.reps)
      );
    },
  },

  methods: {
    async getExercises() {
      try {
        const response = await this.axios.get("exercises");
        let exercises = response.data.data.exercises;

        exercises = exercises.map((exercise) => {
          exercise.exercise_id = exercise.id;
          exercise.selected = false;
          exercise.reps = "";
          exercise.sets = "";

          return exercise;
        });

        this.exerciseData = exercises;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    addExercises() {
      this.$emit("addExercises", this.selectedExercises);
      this.resetExercises();
    },
    resetExercises() {
      this.exerciseData = this.exerciseData.map((exercise) => {
        exercise.selected = false;
        return exercise;
      });
    },
  },

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard"),
  },
};
</script>

<style lang="scss" scoped>
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
  z-index: 2;
}
.c-builder-exercises-modal__selected-overlay--selected {
  opacity: 1;
  visibility: visible;
}
</style>