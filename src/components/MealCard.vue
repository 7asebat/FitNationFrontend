<template>
  <div class="c-meal-card">
    <!-- TODO(Abdelrahman) add a photo here -->
    <img src="@/assets/images/meal.jpeg" alt="" class="c-meal-card-image" />

    <h4 class="mt-2">{{ meal.name }}</h4>
    <p>
      <span class="text-success mr-2"><i class="fas fa-utensils"></i></span>
      {{ meal.count }} foods
    </p>
  </div>
</template>

<script>
export default {
  name: "MealCard",
  props: {
    meal: {
      type: Object,
      default: () => ({
        count: 0,
        name: "Meal Name",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.c-meal-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius;
}
</style>
