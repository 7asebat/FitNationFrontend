<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <b-tab
        v-for="(week, w) in workoutInfo"
        :key="w"
        :title="`Week ${week.week}`"
      >
        <b-table fixed :items="week.workouts" borderless></b-table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "WorkoutPerformance",

  data: () => ({
    workoutInfo: [
      {
        week: 5,
        workouts: [
          {
            name: "Bench Press",
            weight: 20,
            sets: 3,
            reps: 10,
          },
          {
            name: "Squats",
            weight: 40,
            sets: 4,
            reps: 8,
          },
        ],
      },
      {
        week: 4,
        workouts: [
          {
            name: "Alternating Bicep Curls",
            weight: 10,
            sets: 4,
            reps: 15,
          },
          {
            name: "Lat Pulldown",
            weight: 40,
            sets: 4,

            reps: 8,
          },
        ],
      },
    ],
  }),
  methods: {
    dateToString(date) {
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },
  },
  computed: {
    workoutInfoSorted() {
      const sorted = this.workoutInfo.slice();
      return sorted.sort((a, b) => b.week - a.week);
    },
  },
};
</script>

<style></style>
