<template>
  <div>
    <div class="container">
      <ImageText
        title="Recipes"
        imgSrc="recipe.png"
        :primaryButtonText="
          loggedInUser && loggedInUser.role === 'nutritionist'
            ? 'Create your own recipe'
            : ''
        "
        :primaryButtonRoute="
          loggedInUser && loggedInUser.role === 'nutritionist'
            ? 'RecipesBuilder'
            : ''
        "
        :description="[
          'How to get through the week with healthy but satisfying meals that will make you feel good as well as virtuous?',
          'Get inspired by our nutritious flavour-packed recipes including vegetarian, vegan and meat options.',
        ]"
        theme="success"
      />

      <LatestRecipes />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
    LatestRecipes: () => import("@/components/LatestRecipes"),
  },

  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
};
</script>
