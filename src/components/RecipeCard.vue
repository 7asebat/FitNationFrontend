<template>
  <div class="c-recipe-card bg-light shadow-sm h-100">
    <!-- TODO(Abdelrahman) add a photo here -->
    <img
      v-if="recipe.image"
      :src="recipe.image"
      alt=""
      class="c-recipe-card-image"
    />

    <img
      v-else
      src="@/assets/images/defaultRecipe.png"
      alt=""
      class="c-recipe-card-image"
    />

    <div class="px-3">
      <h4 class="c-recipe-card__food-name mt-2 w-100 text-dark">
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
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-recipe-card {
  overflow: hidden;
  border-radius: $border-radius;
}

.c-recipe-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius;
}

.c-recipe-card__food-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
