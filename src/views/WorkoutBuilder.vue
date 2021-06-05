<template>
  <div class="container py-5">
    <h1>Workout Builder</h1>
    <p class="text-secondary">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero ea non et
      adipisci libero possimus veniam minus, autem facilis illo pariatur minima
      rerum, doloremque quis quidem sint. Doloribus, veniam officia.
    </p>

    <b-tabs content-class="mt-3" @activate-tab="changeSelectedDay">
      <b-tab
        v-for="(dayValue, dayKey) in days"
        :key="dayKey"
        :title="`Day ${Number(dayKey) + 1}`"
        :active="selectedDay === Number(dayKey)"
      >
        <div class="row">
          <div
            class="col-sm-6 col-md-3"
            v-for="exercise in dayValue.exercises"
            :key="exercise.id"
          >
            <div
              class="c-workout-builder__exercise-card-wrapper"
              @click.prevent="removeExercise(exercise)"
            >
              <div class="c-workout-builder__delete-overlay">
                <h1
                  class="
                    text-danger
                    d-flex
                    justify-content-center
                    align-items-center
                    h-100
                  "
                >
                  <i class="fas fa-trash-alt"></i>
                </h1>
              </div>
              <ExerciseCard :data="exercise" />
            </div>
          </div>
        </div>

        <BuilderEmptyState
          v-show="!dayValue.exercises.length"
          :dayName="`Day ${Number(dayKey) + 1}`"
          @clicked="showExercisesModal"
        />
      </b-tab>
    </b-tabs>

    <ButtonMain class="my-3 float-right" @clicked="addWorkout"
      >Add Workout</ButtonMain
    >

    <BuilderExercisesModal
      :dayName="`Day ${selectedDay}`"
      @addExercises="addExercises"
    />
  </div>
</template>

<script>
export default {
  created() {
    this.initData();
  },
  data() {
    return {
      days: {},
      selectedDay: 0,
    };
  },
  methods: {
    async addWorkout(loading) {
      loading(true);

      try {
        const payload = {
          days: this.days,
          client_id: 1,
        };

        await this.axios.post("workout_plans", payload);
      } catch (err) {
        console.log(err);
      }

      loading(false);
    },
    showExercisesModal() {
      this.$bvModal.show("builderExercisesModal");
    },
    changeSelectedDay(updatedDayIndex) {
      this.selectedDay = updatedDayIndex;
    },
    addExercises(exercises) {
      const currentDays = { ...this.days };
      currentDays[this.selectedDay].exercises.push(...exercises);
      this.days = currentDays;
    },
    removeExercise(exerciseToRemove) {
      this.days[this.selectedDay].exercises = this.days[
        this.selectedDay
      ].exercises.filter((exercise) => exercise.id !== exerciseToRemove.id);
    },
    initData() {
      for (let day = 0; day < 7; day++) {
        this.days[day] = { exercises: [] };
      }
    },
  },
  components: {
    BuilderEmptyState: () => import("@/components/workouts/builderEmptyState"),
    BuilderExercisesModal: () =>
      import("@/components/workouts/builderExercisesModal"),
    ExerciseCard: () => import("@/components/ExerciseCard"),
    ButtonMain: () => import("@/components/common/ButtonMain"),
  },
};
</script>

<style lang="scss" scoped>
.c-workout-builder__exercise-card-wrapper {
  position: relative;
  cursor: pointer;
}
.c-workout-builder__exercise-card-wrapper:hover
  .c-workout-builder__delete-overlay {
  opacity: 1;
}
.c-workout-builder__delete-overlay {
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
</style>