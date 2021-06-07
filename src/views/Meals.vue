<template>
  <div>
    <div class="container">
      <ImageText
        title="Meals"
        imgSrc="meal.png"
        :primaryButtonText="
          loggedInUser && loggedInUser.role === 'nutritionist'
            ? 'Create your own meal'
            : ''
        "
        :primaryButtonRoute="
          loggedInUser && loggedInUser.role === 'nutritionist'
            ? 'RecipesBuilder'
            : ''
        "
        secondaryButtonText="Need Help? Ask a nutritionist"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          veniam iusto esse impedit expedita itaque praesentium dolorum, dolorem
          eum earum fuga cum explicabo provident consequuntur. Ea dolorem non
          natus voluptates."
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
