<template>
  <div class="container-fluid">
    <div class="d-flex mb-3 align-items-center justify-content-center">
      <h3 class="u-title-font mr-3">
        Select
        <span class="text-primary">Week</span>
      </h3>

      <div>
        <b-form-datepicker
          id="week-datepicker"
          v-model="selectedDay"
          @input="selectWeek"
          class="mb-2"
        ></b-form-datepicker>
      </div>
    </div>

    <b-tabs
      class="workoutPerformanceTabs"
      @activate-tab="
        (newIndex) => {
          activeDay = days[newIndex].date;
        }
      "
    >
      <b-tab
        v-for="day in days"
        :key="day.date.getTime()"
        :title="daysNames[day.date.getDay()]"
        :active="new Date().getDay() == day.date.getDay()"
      >
        <DayExercises :date="day.date" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "WorkoutPerformance",

  created() {
    this.selectWeek(new Date());
  },

  components: {
    DayExercises: () => import("@/components/Profile/DayExercises"),
  },

  data: () => ({
    currentWeakOfYear: "",
    workoutInfo: [],
    days: [],
    selectedDay: new Date(),
    activeDay: new Date(),
  }),
  methods: {
    addExerciseToActiveDay() {},
    selectWeek(selectedDate) {
      const startDate = new Date(selectedDate);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      const days = [];
      for (let i = 0; i < 7; i++) {
        days.push({
          date: new Date(startDate),
        });
        startDate.setDate(startDate.getDate() + 1);
      }

      this.days = days;
    },
    changeSelectedDay(updatedDayIndex) {
      this.selectedDay = updatedDayIndex;
    },

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
      const muscleIds = exerciseMetaData.muscle_groups;
      const muscles = this.$store.state.enums.muscles;

      return muscleIds.map((id) => muscles[id]).join(",");
    },
  },

  computed: {
    daysNames() {
      return this.$store.state.enums.days;
    },

    workoutInfoSorted() {
      const sorted = this.workoutInfo.slice();
      return sorted.sort((a, b) => b.week - a.week);
    },
  },
};
</script>

<style></style>
