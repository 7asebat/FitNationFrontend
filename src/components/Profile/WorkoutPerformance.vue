<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <template #tabs-start>
        <b-button @click="insertWeek" class="bg-dark rounded-circle mr-2">
          +
        </b-button>
      </template>
      <b-tab
        v-for="(week, w) in workoutInfoSorted"
        :key="w"
        :title="`Week ${week.week}`"
      >
        <b-table fixed :items="week.workouts" borderless></b-table>
        <b-row align-h="end">
          <b-button
            variant="primary"
            pill
            class="py-3 px-5 mr-5 mb-4"
            @click="$bvModal.show(`workout-perf-modal${w}`)"
          >
            <i class="fas fa-pen mr-2" />
            <span>Edit</span>
          </b-button>
        </b-row>

        <WorkoutPerfBuilderModal
          :modalId="`workout-perf-modal${w}`"
          @confirmEdits="confirmEdits(workoutInfo[w].week, ...arguments)"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "WorkoutPerformance",

  components: {
    WorkoutPerfBuilderModal: () =>
      import("@/components/Profile/WorkoutPerfBuilderModal.vue"),
  },

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

    insertWeek() {
      const week = this.workoutInfoSorted[0].week;
      this.workoutInfo.unshift({ week: week + 1, workouts: [] });
    },

    confirmEdits(week, edits) {
      let w = this.workoutInfo.findIndex((el) => el.week === week);
      if (edits) {
        if (this.workoutInfo[w].workouts) {
          this.workoutInfo[w].workouts.push(...edits);
        } else {
          this.workoutInfo[w].workouts = edits;
        }
      }
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
