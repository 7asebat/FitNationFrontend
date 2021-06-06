<template>
  <b-modal
    :id="modalId"
    size="lg"
    title="Add this week's workout"
    ok-title="Confirm"
    @ok="confirmEdits"
  >
    <div class="d-flex flex-column container-fluid align-items-center">
      <b-input-group class="mx-auto mb-3">
        <template #append>
          <b-input-group-text class="bg-white border-left-0 pr-3">
            <i class="fas fa-search" />
          </b-input-group-text>
        </template>

        <b-form-input
          v-model="exerciseQuery"
          class="border-right-0 text-right"
        />
      </b-input-group>

      <b-row
        v-for="(exercise, i) in exercises"
        :key="i"
        class="rounded border-primary py-3"
      >
        <ExerciseCard :data="exercise" />

        <b-col class="col-4">
          <div class="d-flex align-items-center h4">
            <b-input v-model="exercise.sets" class="mx-2" type="number" />
            <div>SETS</div>
          </div>
          <div class="d-flex align-items-center h4">
            <b-input v-model="exercise.reps" class="mx-2" type="number" />
            <div>REPS</div>
          </div>
        </b-col>
      </b-row>

      <div></div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ExercisePerfBuilderModal",

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
  },
  data: () => ({
    exerciseQuery: "",
    exercises: [
      {
        name: "Bench Press",
        time: 2,
        calories: 500,
        sets: 0,
        reps: 0,
        imgSrc: "buildBulk.png",
      },
      {
        name: "Squats",
        time: 2,
        calories: 500,
        sets: 0,
        reps: 0,
        imgSrc: "buildBulk.png",
      },
    ],
  }),
  props: {
    modalId: String,
  },

  methods: {
    confirmEdits() {
      const exercises = this.exercises
        .filter((exercise) => (exercise.sets > 0) & (exercise.reps > 0))
        .map((exercise) => {
          const { name, sets, reps } = exercise;
          return { name, sets, reps };
        });
      this.$emit("confirmEdits", exercises);
      this.exercises = [];
    },
  },
};
</script>

<style scoped lang="scss"></style>
