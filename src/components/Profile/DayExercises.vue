<template>
  <div class="position-relative">
    <div class="row my-4">
      <div class="col-12 col-md-8 col-lg-9 position-relative">
        <div class="row">
          <div
            class="col-12 col-md-4 col-lg-3 mb-3"
            v-for="exercise in exercises"
            :key="exercise.id"
          >
            <ExerciseCard :data="exercise" />
          </div>
        </div>
        <button
          class="btn btn-success"
          @click="$bvModal.show(`workoutPerfBuilderModal-${date.getDay()}`)"
        >
          + Add Exercises
        </button>
      </div>
      <div class="col-12 col-md-4 col-lg-3">
        <div class="bg-light p-3 c-day-exercises__suggested-exercises">
          <h3>Suggested Exercises</h3>
          <p class="text-secondary">
            Exercises you should do based on your current workout plan
          </p>

          <div v-for="exercise in exercises" :key="exercise.id" class="mb-3">
            <div class="d-flex">
              <img
                src="@/assets/images/beHealthy.png"
                alt=""
                class="c-day-exercises__suggested-exercise-image mr-2"
              />
              <div>
                <h6>{{ exercise.name }}</h6>
                <div class="d-flex">
                  <b-form-input
                    v-model="text"
                    placeholder="Weight"
                    class="h-auto mr-2"
                  ></b-form-input>
                  <button class="btn btn-success">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <WorkoutPerfBuilderModal
      :modalId="String(date.getDay())"
      :activeDay="date"
      @addExercise="addExercise"
    />
  </div>
</template>

<script>
export default {
  created() {
    this.getExercises();
  },

  props: {
    date: Date,
  },

  data() {
    return {
      text: "",
      exercises: [],
    };
  },

  methods: {
    addExercise(exercise) {
      this.exercises.push(exercise);
    },
    async getExercises() {
      try {
        const year = `0${this.date.getUTCFullYear()}`.slice(-2);
        const month = `0${this.date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${this.date.getUTCDate()}`.slice(-2);

        const response = await this.axios.get(
          `me/exercises_instances?date=${year}-${month}-${day}`
        );

        let exercises = response.data.client_exercise_instances;
        exercises = exercises.map((exercise) => exercise.exercise);

        this.exercises = exercises;
        console.log(response);
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
    WorkoutPerfBuilderModal: () =>
      import("@/components/Profile/WorkoutPerfBuilderModal"),
  },
};
</script>

<style lang="scss" scoped>
.c-day-exercises__suggested-exercises {
  border-radius: $border-radius;
}
.c-day-exercises__suggested-exercise-image {
  width: 80px;
}
</style>