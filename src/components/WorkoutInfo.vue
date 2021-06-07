<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 mb-4">
        <img src="@/assets/images/workout.png" class="w-100" alt="" />
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="u-title-font">{{ workout.name }}</h1>
          <button
            class="btn btn-primary"
            @click="chooseWorkout"
            v-if="
              !loggedInUser.active_workout_plan ||
              loggedInUser.active_workout_plan.id !== workout.id
            "
          >
            Choose this workout
          </button>

          <h4 v-else class="u-title-font text-success">Active workout</h4>
        </div>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quia
          veniam repellendus iure quis id dolore? Fuga beatae ab pariatur
          doloremque. Sed, dignissimos? Similique, est illum rerum commodi nihil
          consectetur!
        </p>

        <p class="my-1 c-workout-card-workout-property">
          <span class="text-warning"><i class="fas fa-signal"></i></span>
          <span class="mx-2 text-dark">{{ levelNames[workout.level] }}</span>
        </p>

        <!-- <p class="my-1 c-workout-card-workout-property">
          <span class="text-danger"><i class="fas fa-running"></i></span>
          <span class="mx-2 text-dark">{{ workout.exercises }} Exercises</span>
        </p> -->
        <p class="my-1 c-workout-card-workout-property">
          <span class="text-danger"><i class="fas fa-dumbbell"></i></span>
          <span class="mx-2 text-dark">
            {{
              workout.requires_equipment
                ? "Equipments Required"
                : "Equipments Not Required"
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workout: {
      required: true,
    },
  },

  computed: {
    levelNames() {
      return this.$store.state.enums.workoutLevels;
    },

    loggedInUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    async chooseWorkout() {
      try {
        const payload = { workout_plan_id: this.workout.id };
        await this.axios.patch("me/workout_plans/active_plan", payload);

        this.$notification(
          "successNotification",
          "Active workout plan is set succesfully"
        );
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>