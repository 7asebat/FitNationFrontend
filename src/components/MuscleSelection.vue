<template>
  <div class="c-muscle-selection">
    <div
      class="
        d-flex
        flex-row flex-wrap-reverse
        justify-content-between
        text-left
      "
    >
      <div id="muscle-text" class="d-flex flex-column col-md-8">
        <div id="muscle-text-title" class="c-image-text-title mt-5">
          <span class="c-image-text-title text-danger">{{ muscleTitleName }}</span> Muscle
        </div>

        <div id="muscle-text-info" class="my-3">
          {{ muscles[selectedMuscle].info }}
        </div>

        <div id="muscle-text-exercises" class="d-flex flex-row mt-2">
          <span class="text-danger"><i class="fas fa-dumbbell"></i></span>
          <div class="mx-1 text-danger">{{ muscles[selectedMuscle].exercises }}+</div>
          <div>Exercises</div>
        </div>

        <div id="muscle-text-workoutPlans" class="d-flex flex-row mt-0">
          <span class="mr-1 text-danger"><i class="fas fa-weight"></i></span>
          <div class="mx-1 text-danger">{{ muscles[selectedMuscle].workoutPlans }}+</div>
          <div>Workout Plans</div>
        </div>

        <div id="muscle-text-action" class="d-flex flex-row mt-5">
          <div>
            <a href="" class="btn btn-primary text-uppercase">Browse {{ muscleTitleName }} exercises</a>
          </div>

          <div class="d-flex align-items-center ml-5">
            <a href="" class="text-secondary">Need help? Get a personal trainer</a>
          </div>
        </div>
      </div>

      <!-- TODO(Abdelrahman) Insert muscle vector here -->
      <div id="muscle-image" class="d-flex flex-column col-md-4">
        <img
          class="img-fluid my-auto"
          :src="getImgSrc(muscles[selectedMuscle].imgSrc)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import muscles from "@/assets/json/muscles.json";

export default {
  name: "MuscleSelection",
  
  props: {
    selectedMuscle: String,
  },

  data: () => ({
    muscles,
  }),

  computed: {
    // TODO(Abdelrahman) See if this is needed
    muscleTitleName() {
      return this.muscles[this.selectedMuscle].title.split(" ")[0];
    },
  },

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>

<style lang="scss" scoped>
.c-image-text-title {
  font-size: 62px !important;
  font-family: 'Bebas Neue', cursive;
}


.c-muscle-selection {
}
</style>
