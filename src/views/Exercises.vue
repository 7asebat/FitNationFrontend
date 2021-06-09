<template>
  <div class="container">
    <div id="exercises-view" class="pt-4">
      <div :class="{ 'c-exerccises__header--small': !selectedMuscle }">
        <div v-show="!selectedMuscle" class="mb-4">
          <div class="d-flex flex-column align-items-center text-center">
            <h1 class="c-image-text-title text-dark">Exercises</h1>
            <p class="text-secondary">
              Bodyweight exercises are simple, effective ways to improve
              balance, flexibility, and strength without gym machines or
              equipment. You can do all these bodyweight exercises at home or at
              gym.
            </p>

            <p class="text-secondary">
              From legs and shoulders to chest and abs, we’ve covered every part
              of your body that can get stronger with body resistance alone.
            </p>
            <p class="text-secondary">
              We’ve also provided some basic bodyweight exercises for beginners
              and compared bodyweight workout results to those of weighted, gym,
              and cardio routines.
            </p>

            <div id="muscle-text-action" class="d-flex flex-row mt-3">
              <div>
                <a href="#exercises" class="btn btn-primary text-uppercase">
                  Browse all exercises
                </a>
              </div>

              <div class="d-flex align-items-center ml-5">
                <a href="" class="c-no-underline text-secondary"
                  >Need help? Get a personal trainer</a
                >
              </div>
            </div>
          </div>
        </div>

        <MuscleSelector @selectMuscle="selectMuscle" />
      </div>

      <div class="mt-5 w-100">
        <PopularExercises :muscleGroup="selectedMuscle" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exercises",

  components: {
    MuscleSelector: () => import("@/components/Exercises/MuscleSelector.vue"),
    PopularExercises: () => import("@/components/PopularExercises.vue"),
  },

  data: () => ({
    selectedMuscle: "",
    muscles: ["abs"],
  }),

  methods: {
    selectMuscle(selectedMuscle) {
      this.selectedMuscle = selectedMuscle;
    },
  },
};
</script>

<style lang="scss">
.c-exerccises__header--small {
  max-width: 700px;
  margin-right: auto;
  margin-left: auto;
}

.c-image-text-title {
  font-size: 62px !important;
  font-family: "Bebas Neue", cursive;
}

.c-no-underline {
  text-decoration: none !important;
}
</style>
