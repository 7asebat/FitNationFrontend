<template>
  <div>
    <div class="container">
      <ImageText
        title="Meals"
        imgSrc="meal.png"
        primaryButtonText="Create your own meal"
        primaryButtonRoute="RecipesBuilder"
        secondaryButtonText="Need Help? Ask a nutritionist"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          veniam iusto esse impedit expedita itaque praesentium dolorum, dolorem
          eum earum fuga cum explicabo provident consequuntur. Ea dolorem non
          natus voluptates."
        theme="success"
      />

      <div class="c-meals-popular-meals">
        <h1 class="u-title-font">
          Popular <span class="text-success">Meals</span>
        </h1>

        <div class="row">
          <div
            class="col-sm-12 col-md-3 mb-2"
            v-for="recipe in recipes"
            :key="recipe.id"
          >
            <MealCard :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getRecipes();
  },

  data: () => ({
    recipes: null,
  }),

  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
    MealCard: () => import("@/components/MealCard.vue"),
  },
  methods: {
    async getRecipes() {
      try {
        const response = await this.axios.get("recipes");
        const recipes = response.data.data.recipes;

        this.recipes = recipes;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>
