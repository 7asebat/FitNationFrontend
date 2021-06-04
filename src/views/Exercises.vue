<template>
  <div class="container">
    <div
      id="exercises-view"
      class="
        d-flex
        flex-column
        justify-content-center
        align-items-center
        text-center
        py-4
        px-4
      "
    >
      <div class="d-flex flex-column align-items-center">
        <div
          v-if="$route.params.id === undefined"
          class="d-flex flex-column align-items-center mb-5"
        >
          <h1 class="c-image-text-title text-dark my-5">Exercises</h1>
          <div class="text-secondary w-75">
            {{ subtitle }}
          </div>

          <div id="muscle-text-action" class="d-flex flex-row mt-5">
            <!-- TODO(Abdelrahman) Make this button wider -->
            <div>
              <a href="" class="btn btn-primary text-uppercase"
                >Browse all exercises</a
              >
            </div>

            <div class="d-flex align-items-center ml-5">
              <a href="" class="c-no-underline text-secondary"
                >Need help? Get a personal trainer</a
              >
            </div>
          </div>
        </div>

        <MuscleSelection
          v-else
          class="text-dark my-5"
          :selectedMuscle="muscles[selectedMuscle]"
        />

        <div class="mt-5 w-100">
          <PopularExercises />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exercises",

  components: {
    MuscleSelection: () => import("@/components/MuscleSelection.vue"),
    PopularExercises: () => import("@/components/PopularExercises.vue"),
  },

  data: () => ({
    selectedMuscle: 0,
    muscles: ["abs"],
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }),
};
</script>

<style lang="scss">
.c-image-text-title {
  font-size: 62px !important;
  font-family: "Bebas Neue", cursive;
}

.c-no-underline {
  text-decoration: none !important;
}
</style>
