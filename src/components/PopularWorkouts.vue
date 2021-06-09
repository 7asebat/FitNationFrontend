<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <h1 class="c-popular-workouts-title">
          Latest
          <span class="text-danger">Workouts</span>
        </h1>
        <p class="text-secondary">Find the right workout routine for you!</p>
      </div>

      <div v-if="canCreateWorkout">
        <router-link class="btn btn-primary" :to="{ name: 'WorkoutBuilder' }">
          Create your own workout
        </router-link>
      </div>
    </div>

    <div class="row">
      <div
        class="col-12 col-md-4 col-lg-3 mb-4"
        v-for="workout in workoutsFiltered"
        :key="workout.id"
      >
        <router-link
          :to="{ name: 'SingleWorkout', params: { id: workout.id } }"
        >
          <WorkoutCard
            :title="workout.name"
            :level="workout.level"
            :exercisesNumber="workout.exercises_count"
            :equipmentsRequired="workout.requires_equipment"
            :image="workout.image"
          />
        </router-link>
      </div>
    </div>

    <div
      v-if="!workoutsFiltered || !workoutsFiltered.length"
      class="text-center py-5 bg-light round-corner"
    >
      <h3 class="u-title-font">No workouts yet</h3>
      <p class="m-0">No trainer have built workouts yet!</p>
    </div>

    <b-pagination
      v-if="showPagination"
      v-model="meta.page"
      :total-rows="meta.total"
      :per-page="meta.limit"
      @change="
        (page) => {
          getWorkouts(page);
        }
      "
      align="right"
      first-number
    ></b-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getWorkouts(1);
  },

  data() {
    return {
      workouts: [],
      meta: {},
    };
  },

  props: {
    limit: Number,
    showPagination: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    async getWorkouts(workoutsPage) {
      try {
        const response = await this.axios.get(
          `workout_plans?page=${workoutsPage}`
        );
        const workouts = response.data.data.workout_plans;

        const { count, limit, page, total } = response.data;
        const meta = { count, limit, page, total };
        this.meta = meta;

        this.workouts = workouts;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },

  computed: {
    canCreateWorkout() {
      const user = this.$store.state.user;
      if (user && ["client", "trainer"].includes(user.role)) return true;
      else return false;
    },

    workoutsFiltered() {
      if (this.workouts && Number(this.limit)) {
        return this.workouts.slice(0, this.limit);
      }
      return this.workouts;
    },
  },

  components: {
    WorkoutCard: () => import("@/components/WorkoutCard.vue"),
  },
};
</script>

<style lang="scss" scoped>
.c-popular-workouts-title,
.c-popular-workouts-title * {
  font-family: "Bebas Neue", cursive;
}
</style>