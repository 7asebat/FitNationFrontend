<template>
  <div class="c-exercise-card shadow-sm bg-light h-100">
    <div class="d-flex flex-column text-left">
      <div>
        <video
          loop
          muted
          v-if="data.clip"
          :src="data.clip"
          class="c-exercise-image"
          type="video/mp4"
          @mouseenter="playVideo"
          @mouseleave="pauseVideo"
        ></video>

        <img
          v-else-if="data.image"
          class="img-fluid rounded c-exercise-image"
          :src="data.image"
        />

        <img
          v-else
          class="img-fluid rounded c-exercise-image"
          src="@/assets/images/defaultExercise.png"
        />
      </div>

      <div class="mx-3">
        <h3 class="mt-2 text-uppercase text-dark c-exercise-title">
          {{ data.name }}
        </h3>
        <p>
          <i class="fas fa-dumbbell text-primary"></i>
          <span class="ml-2">{{ muscleName }}</span>
        </p>

        <p v-if="sets">
          <i class="fas fa-dumbbell text-primary"></i>
          <span class="ml-2">SETS: {{ sets }}</span>
        </p>

        <p v-if="reps">
          <i class="fas fa-dumbbell text-primary"></i>
          <span class="ml-2">REPS: {{ reps }}</span>
        </p>

        <p v-if="weight">
          <i class="fas fa-dumbbell text-primary"></i>
          <span class="ml-2">WEIGHT: {{ weight }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExerciseCard",

  props: {
    data: Object,
    sets: [Number, String],
    reps: [Number, String],
    weight: [Number, String],
  },

  computed: {
    muscleName() {
      const muscles = this.$store.state.enums.muscles;
      const selectedMuscles = this.data.meta_data.muscle_groups;

      return selectedMuscles.map((muscleId) => muscles[muscleId]).join(" , ");
    },
  },

  methods: {
    playVideo(evt) {
      const video = evt.target;
      video.play();
    },

    pauseVideo(evt) {
      const video = evt.target;
      video.pause();
    },

    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>

<style lang="scss" scoped>
.c-exercise-card {
  border-radius: $border-radius;
  overflow: hidden;
}
.c-exercise-image {
  border-radius: 15px !important;
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.c-exercise-title {
  font-family: "Bebas Neue", cursive;
}
.c-exercise-details {
  font-size: 13px !important;
}
</style>
