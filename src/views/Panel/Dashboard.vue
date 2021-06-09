<template>
  <div>
    <h1>Panel Dashboard</h1>
    <p class="mb-3 text-secondary">
      A quick overview about how the platform behaves
    </p>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <div class="statistics_card p-3 bg-primary text-light">
              <h1 class="m-0">
                <i class="fas fa-users"></i>
                {{ aggregations.clients }}
              </h1>
              <h5>Clients</h5>
            </div>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <div class="statistics_card p-3 bg-warning text-light">
              <h1 class="m-0">
                <i class="fas fa-dumbbell"></i>
                {{ aggregations.exercises }}
              </h1>
              <h5>Exercises</h5>
            </div>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <div class="statistics_card p-3 bg-success text-light">
              <h1 class="m-0">
                <i class="fas fa-utensils"></i>
                {{ aggregations.food }}
              </h1>
              <h5>Food</h5>
            </div>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <div class="statistics_card p-3 bg-info text-light">
              <h1 class="m-0">
                <i class="fas fa-running"></i>
                {{ aggregations.trainers }}
              </h1>
              <h5>Trainers</h5>
            </div>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <div class="statistics_card p-3 bg-dark text-light">
              <h1 class="m-0">
                <i class="fas fa-dumbbell"></i>
                {{ aggregations.workout_plans }}
              </h1>
              <h5>Workout Plans</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getDashboardData();
  },

  data() {
    return {
      aggregations: {},
    };
  },

  computed: {
    pieChartLabels() {
      // const muscles = this.$store.state.enums.muscles;
      return true;
    },
  },

  methods: {
    async getDashboardData() {
      try {
        const response = await this.axios.get("admins/dashboard");
        const aggregations = response.data.counts;

        this.aggregations = aggregations;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },

  components: {},
};
</script>

<style lang="scss" scoped>
.statistics_card {
  border-radius: $border-radius;
}
</style>