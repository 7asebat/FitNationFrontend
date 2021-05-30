<template>
  <div class="c-meal-card">
    <img src="@/assets/images/meal.jpeg" alt="" class="c-meal-card-image" />

    <h4 class="mt-2">Meal Name</h4>
    <p>
      <span class="text-success mr-2"><i class="fas fa-utensils"></i></span>
      5 Food Items
    </p>
  </div>
</template>

<style lang="scss" scoped>
.c-meal-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius;
}
</style>