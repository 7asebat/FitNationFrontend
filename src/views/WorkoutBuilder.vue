<template>
  <div class="container py-5">
    <h1 class="u-title-font">Workout Builder</h1>
    <p class="text-secondary">
      Customize your experience by building your own workout plan using our
      <span class="text-primary">Workout plan builder</span>. You can add your
      preferred exercises in each day and specify sets and reps that fit your
      needs.
    </p>

    <div class="row">
      <div class="col-12 col-md-6 mb-3">
        <b-form-input
          v-model="workoutName"
          placeholder="Enter Workout Name"
          required
          style="height: auto !important"
        ></b-form-input>
      </div>
      <div class="col-12 col-md-6 mb-3">
        <b-form-select
          v-model="selectedLevel"
          :options="workoutLevels"
        ></b-form-select>
      </div>

      <div class="col-12 col-md-6 mb-3">
        <b-form-file
          v-model="image"
          :state="Boolean(image)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </div>

      <div class="col-12 col-md-6 mb-3">
        <b-form-radio-group
          v-model="equipmentsRequired"
          :options="equipmentsOptions"
          button-variant="outline-primary"
          buttons
        ></b-form-radio-group>
      </div>
    </div>

    <b-tabs content-class="mt-3" @activate-tab="changeSelectedDay">
      <b-tab
        v-for="(dayValue, dayKey) in days"
        :key="dayKey"
        :title="daysNames[dayKey]"
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

    <ButtonMain
      class="my-3 float-right"
      @clicked="addWorkout"
      :disabled="!validForm"
    >
      Add Workout
    </ButtonMain>

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
      workoutName: "",
      selectedLevel: null,
      image: undefined,
      equipmentsRequired: false,
      equipmentsOptions: [
        { text: "Equipments Required", value: true },
        { text: "No Equipments", value: false },
      ],
    };
  },
  computed: {
    daysNames() {
      return this.$store.state.enums.days;
    },

    validForm() {
      return (
        !this.emptyWorkout && this.workoutName && this.selectedLevel !== null
      );
    },
    emptyWorkout() {
      return Object.values(this.days).every((day) => day.exercises.length == 0);
    },
    workoutLevels() {
      const levels = this.$store.state.enums.workoutLevels;

      const options = Object.keys(levels).map((key) => ({
        text: levels[key],
        value: key,
      }));

      options.unshift({
        text: "Select Workout Level",
        value: null,
        disabled: true,
      });

      return options;
    },
  },
  methods: {
    async addWorkout(loading) {
      loading(true);

      try {
        const payload = {
          days: this.days,
          name: this.workoutName,
          level: this.selectedLevel,
          requires_equipment: this.equipmentsRequired,
        };

        const response = await this.axios.post("workout_plans", payload);
        const workoutPlan = response.data.data.workout_plan;

        if (this.image) {
          try {
            const payload = new FormData();
            payload.append("image", this.image);

            await this.axios.patch(
              `workout_plans/${workoutPlan.id}/image`,
              payload
            );
          } catch (err) {
            this.$errorsHandler(new Error("Failed to upload workout image"));
          }
        }

        this.$notification(
          "successNotification",
          "Workout Plan Added Successfully!"
        );

        this.$router.push({ name: "MyWorkoutPlans" });
      } catch (err) {
        this.$errorsHandler(err);
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