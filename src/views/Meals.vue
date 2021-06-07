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

      <div class="c-meals-popular-meals">
        <h1 class="u-title-font">
          Popular <span class="text-success">Meals</span>
        </h1>

        <div class="row">
          <div
            class="col-sm-12 col-md-3 mb-4"
            v-for="recipe in recipes"
            :key="recipe.id"
          >
            <router-link
              :to="{ name: 'SingleMeal', params: { id: recipe.id } }"
            >
              <MealCard :recipe="recipe" />
            </router-link>
          </div>
        </div>
      </div>

      <b-pagination
        v-model="meta.page"
        :total-rows="meta.total"
        :per-page="meta.limit"
        @change="
          (page) => {
            getRecipes(page);
          }
        "
        align="right"
        first-number
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getRecipes(1);
  },

  data: () => ({
    recipes: null,
    meta: {},
  }),

  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
    MealCard: () => import("@/components/MealCard.vue"),
  },

  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    async getRecipes(recipesPage) {
      try {
        const response = await this.axios.get(`recipes?page=${recipesPage}`);
        const recipes = response.data.data.recipes;

        const { count, limit, page, total } = response.data;
        const meta = { count, limit, page, total };
        this.meta = meta;
        this.recipes = recipes;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>
