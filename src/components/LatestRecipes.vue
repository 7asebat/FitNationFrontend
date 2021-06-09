<template>
  <div>
    <div class="c-recipes-popular-recipes">
      <h1 class="u-title-font">
        Latest <span class="text-success">Recipes</span>
      </h1>
      <p class="text-secondary">
        A list of the latest recipes listed by our nutritionists
      </p>

      <div class="row">
        <div
          class="col-sm-12 col-md-3 mb-4"
          v-for="recipe in recipesFiltered"
          :key="recipe.id"
        >
          <router-link
            :to="{ name: 'SingleRecipe', params: { id: recipe.id } }"
          >
            <RecipeCard :recipe="recipe" />
          </router-link>
        </div>
      </div>
    </div>

    <b-pagination
      v-if="showPagination"
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
</template>

<script>
export default {
  created() {
    this.getRecipes(1);
  },

  props: {
    limit: Number,
    showPagination: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    recipes: null,
    meta: {},
  }),

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

  computed: {
    recipesFiltered() {
      if (this.recipes && Number(this.limit)) {
        return this.recipes.slice(0, this.limit);
      }
      return this.recipes;
    },
  },

  components: {
    RecipeCard: () => import("@/components/RecipeCard.vue"),
  },
};
</script>