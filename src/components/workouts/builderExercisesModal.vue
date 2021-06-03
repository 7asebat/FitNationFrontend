<template>
  <b-modal
    id="builderExercisesModal"
    scrollable
    size="lg"
    :title="`Add exercises to ${dayName}`"
    :ok-title="`Add Exercises (${selectedExercises.length})`"
    @ok="addExercises"
  >
    <div class="row">
      <div
        class="col-sm-6 col-md-3 mb-3"
        v-for="exercise in exerciseData"
        :key="exercise.name"
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
            class="c-builder-exercises-modal__selected-overlay"
          >
            <h1
              class="text-success d-flex justify-content-center align-items-center h-100"
            >
              <i class="fas fa-check-circle"></i>
            </h1>
          </div>
          <ExerciseCard :data="exercise" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      exerciseData: [
        {
          name: "Leg Raises",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
        {
          name: "Leg Raises 2",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
        {
          name: "Leg Raises 3",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
        {
          name: "Leg Raises 4",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
        {
          name: "Leg Raises 5",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
        {
          name: "Leg Raises 6",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
        {
          name: "Leg Raises 7",
          time: 30,
          calories: 120,
          imgSrc: "stayFit.png",
          selected: false,
        },
      ],
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
      return this.exerciseData.filter((exercise) => exercise.selected);
    },
  },

  methods: {
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
}
.c-builder-exercises-modal__selected-overlay--selected {
  opacity: 1;
}
</style>