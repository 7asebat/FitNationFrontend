<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <b-tab
        v-for="(week, w) in workoutInfoSorted"
        :key="w"
        :title="`Week ${week.week} of ${new Date().getFullYear()}`"
      >
        <!-- <div class="row">
          <div
            class="col-12 col-md-4 col-lg-3"
            v-for="exercise in week.exercises"
            :key="exercise.id"
          >
            <ExerciseCard :data="exercise" />
          </div>
        </div> -->
        <b-table
          striped
          responsive
          hover
          :items="week.exercises"
          :fields="[
            'id',
            'name',
            'tips',
            {
              key: 'meta_data',
              label: 'Targeted Muscles',
              formatter: formatExerciseType,
            },
          ]"
          borderless
        ></b-table>
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

  created() {
    let d = new Date();
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    this.currentWeakOfYear = weekNo;

    const workoutInfo = [];
    for (let i = weekNo; i > weekNo - 7 && i > 0; i--) {
      workoutInfo.push({
        week: i,
        exercises: [
          {
            id: 1,
            name: "push ups",
            tips: "technique is much more important than reps",
            exercise_type: 0,
            meta_data: {
              muscle_groups: [1, 2, 3],
            },
          },
          {
            id: 4,
            name: "test new exercise",
            tips: " etmaran gamed",
            exercise_type: null,
            meta_data: {
              muscle_groups: ["3"],
            },
          },
          {
            id: 5,
            name: "hamada",
            tips: "ganzabel",
            exercise_type: null,
            meta_data: {
              muscle_groups: ["6"],
            },
          },
          {
            id: 6,
            name: "test b number",
            tips: "test",
            exercise_type: null,
            meta_data: {
              muscle_groups: [6],
            },
          },
          {
            id: 7,
            name: "tst",
            tips: "tesada",
            exercise_type: null,
            meta_data: {
              muscle_groups: [6],
            },
          },
        ],
      });
    }

    this.workoutInfo = workoutInfo;
  },

  components: {
    // ExerciseCard: () => import("@/components/ExerciseCard.vue"),

    WorkoutPerfBuilderModal: () =>
      import("@/components/Profile/WorkoutPerfBuilderModal.vue"),
  },

  data: () => ({
    currentWeakOfYear: "",
    workoutInfo: [],
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

    formatExerciseType(exerciseMetaData) {
      console.log(exerciseMetaData);
      const muscleIds = exerciseMetaData.muscle_groups;
      const muscles = this.$store.state.enums.muscles;

      return muscleIds.map((id) => muscles[id]).join(",");
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
