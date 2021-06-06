<template>
  <div class="c-exercise-card shadow-sm bg-light">
    <div class="d-flex flex-column text-left">
      <div>
        <img
          class="img-fluid rounded c-exercise-image"
          src="@/assets/images/stayFit.png"
        />
      </div>

      <div class="mx-3">
        <h3 class="mt-2 text-uppercase text-dark c-exercise-title">
          {{ data.name }}
        </h3>
        <p class="font-small text-secondary">{{ data.tips }}</p>
      </div>

      <!-- <div class="text-secondary d-flex flex-row c-exercise-details">
        <span class="mr-1"><i class="fas fa-clock"></i></span>
        <div class="">{{ data.time }} Mins -</div>
        <span class="ml-1"><i class="fas fa-fire"></i></span>
        <div class="mx-1">{{ data.calories }} Est. Calories</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ExerciseCard",

  props: {
    data: {
      name: String,
      time: Number,
      calories: Number,
      imgSrc: String,
    },
  },

  computed: {},

  methods: {
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
}

.c-exercise-title {
  font-family: "Bebas Neue", cursive;
}
.c-exercise-details {
  font-size: 13px !important;
}
</style>
