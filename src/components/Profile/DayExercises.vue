<template>
  <div class="position-relative">
    <div class="row my-4">
      <div
        class="col-12 position-relative"
        :class="{ 'col-md-8 col-lg-9': loggedInUser.active_workout_plan }"
      >
        <div v-show="!exercises.length">
          <h2 class="u-title-font">No exercises tracked for this day</h2>
          <p class="text-secondary">
            Add exercises to this day to keep track of your performance
          </p>
        </div>
        <div class="row">
          <div
            class="col-12 mb-3 col-md-4 col-lg-3"
            v-for="exercise in exercises"
            :key="exercise.instance_id"
          >
            <ExerciseCard
              :data="exercise"
              :sets="exercise.sets"
              :reps="exercise.reps"
              :weight="exercise.performance"
            />
          </div>
        </div>
        <button
          class="btn btn-success"
          @click="$bvModal.show(`workoutPerfBuilderModal-${date.getDay()}`)"
        >
          + Add Exercises
        </button>
      </div>
      <div
        class="col-12 col-md-4 col-lg-3"
        v-if="loggedInUser.active_workout_plan"
      >
        <div class="bg-light p-3 c-day-exercises__suggested-exercises">
          <h3 class="u-title-font">
            This day's <span class="text-primary"> Exercises </span>
          </h3>
          <p class="text-secondary">
            Exercises you should do based on your current workout plan
          </p>

          <div
            v-for="exercise in exercises"
            :key="exercise.instance_id"
            class="mb-3"
          >
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

  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
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
        exercises = exercises.map((exerciseInstance) => {
          const exercise = exerciseInstance.exercise;
          exercise.reps = exerciseInstance.reps;
          exercise.sets = exerciseInstance.sets;
          exercise.duration = exerciseInstance.duration;
          exercise.performance = exerciseInstance.performance;
          exercise.instance_id = exerciseInstance.id;
          return exercise;
        });

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