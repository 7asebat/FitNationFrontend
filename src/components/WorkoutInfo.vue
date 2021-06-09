<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 mb-4">
        <img
          v-if="!workout.image"
          src="@/assets/images/defaultWorkout.png"
          class="w-100"
          alt=""
        />
        <img v-else :src="workout.image" class="w-100" alt="" />
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="u-title-font">{{ workout.name }}</h1>

          <div v-if="true">
            <button
              class="btn btn-primary"
              @click="chooseWorkout"
              v-if="canChooseWorkout"
            >
              Choose this workout
            </button>

            <h4 v-if="isActiveWorkout" class="u-title-font text-success">
              Active workout
            </h4>
          </div>
        </div>
        <p class="text-secondary">
          You can find all the info related to your workout and the exercises
          attached to each day from this view.
        </p>

        <p class="my-1 c-workout-card-workout-property">
          <span
            :class="{
              'text-warning': workout.level === 1,
              'text-success': workout.level === 0,
              'text-danger': workout.level === 2,
            }"
          >
            <i class="fas fa-signal"></i>
          </span>
          <span class="mx-2 text-dark">{{ levelNames[workout.level] }}</span>
        </p>

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

        <button
          class="btn btn-primary mt-4"
          @click.prevent="deleteWorkout"
          v-if="isWorkoutOwner"
        >
          <i class="fas fa-trash-alt"></i>
          <span class="ml-2 d-inline-block">Delete workout</span>
        </button>
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
    isActiveWorkout() {
      const user = this.loggedInUser;
      if (!user) return false;

      const isClient = user.role === "client";
      const activePlan = user.active_workout_plan;

      return isClient && activePlan && activePlan.id == this.workout.id;
    },

    canChooseWorkout() {
      const user = this.loggedInUser;
      if (!user) return false;

      const isClient = user.role === "client";
      const activePlan = user.active_workout_plan;

      return isClient && (!activePlan || activePlan.id != this.workout.id);
    },

    levelNames() {
      return this.$store.state.enums.workoutLevels;
    },

    loggedInUser() {
      return this.$store.state.user;
    },

    isWorkoutOwner() {
      const user = this.loggedInUser;
      if (!user) return false;

      const isClientOwner =
        user.role === "client" &&
        this.workout.client &&
        this.workout.client.id === user.id;

      const isTrainerOwner =
        user.role === "trainer" &&
        this.workout.trainer &&
        this.workout.trainer.id === user.id;

      return isClientOwner || isTrainerOwner;
    },
  },

  methods: {
    async chooseWorkout() {
      try {
        const payload = { workout_plan_id: this.workout.id };
        await this.axios.patch("me/workout_plans/active_plan", payload);

        await this.updateLoggedInUser();

        this.$notification(
          "successNotification",
          "Active workout plan is set succesfully"
        );
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    async updateLoggedInUser() {
      try {
        const response = await this.axios.get("authentication/current_user");
        const user = response.data.data.user;

        this.$store.commit("setUser", user);
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    async deleteWorkout() {
      try {
        await this.axios.delete(`workout_plans/${this.workout.id}`);
        this.$notification(
          "successNotification",
          "Your workout has been deleted successfully!"
        );
        this.$router.push({ name: "MyWorkoutPlans" });
        this.updateLoggedInUser();
      } catch (err) {
        this.$errorsHandler(new Error("Error deleting your workout."));
      }
    },
  },
};
</script>