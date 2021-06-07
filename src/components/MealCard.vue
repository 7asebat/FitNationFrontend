<template>
  <div class="c-meal-card bg-light shadow-sm h-100">
    <!-- TODO(Abdelrahman) add a photo here -->
    <img
      v-if="recipe.image"
      :src="recipe.image"
      alt=""
      class="c-meal-card-image"
    />

    <img
      v-else
      src="@/assets/images/defaultRecipe.png"
      alt=""
      class="c-meal-card-image"
    />

    <div class="px-3">
      <h4 class="c-meal-card__food-name mt-2 w-100 text-dark">
        {{ recipe.name }}
      </h4>
      <p class="text-secondary">{{ recipe.description }}</p>
      <p class="text-dark">
        <span class="text-success mr-2"><i class="fas fa-utensils"></i></span>
        {{ recipe.foods.length }} foods
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MealCard",
  props: {
    recipe: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-meal-card {
  overflow: hidden;
  border-radius: $border-radius;
}

.c-meal-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius;
}

.c-meal-card__food-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
