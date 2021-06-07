<template>
  <div>
    <!-- <div v-for="(dayValue, dayKey) in days" :key="dayValue.day">
      dayValue : {{ dayValue }} dayKey :{{ dayKey }}
      
    </div> -->

    <b-tabs pills card vertical v-if="days">
      <b-tab
        v-for="(dayValue, dayKey) in days"
        :key="dayKey"
        :title="daysNames[dayKey]"
      >
        <div class="row">
          <div
            class="col-sm-12 col-md-4 col-lg-3"
            v-for="exercise in dayValue"
            :key="exercise.name"
          >
            <ExerciseCard
              :data="exercise.exercise"
              :sets="exercise.sets"
              :reps="exercise.reps"
            />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  props: {
    days: Object,
  },

  data() {
    return {
      // days: [],
    };
  },

  computed: {
    daysNames() {
      return this.$store.state.enums.days;
    },
  },

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
  },
};
</script>