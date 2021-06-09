<template>
  <div>
    <h1 class="text-center c-goals-slider-title">
      Choose your <span class="text-danger">Goal</span>
    </h1>
    <p class="text-secondary text-center">
      you need to find a workout that appeals to you and is feasible based on
      your abilities.
    </p>

    <div class="c-goals-slider-slider d-flex justify-content-center">
      <img
        src="@/assets/images/stayFit.png"
        alt=""
        class="c-goals-slider-goal mx-3 mb-4"
      />
      <img
        src="@/assets/images/buildBulk.png"
        alt=""
        class="c-goals-slider-goal mx-3 mb-4"
      />
      <img
        src="@/assets/images/beHealthy.png"
        alt=""
        class="c-goals-slider-goal mx-3 mb-4"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-goals-slider-title,
.c-goals-slider-title * {
  font-family: "Bebas Neue", cursive;
}
.c-goals-slider-goal {
  width: 250px;
}

.c-goals-slider-slider {
  flex-wrap: wrap;
}
</style>