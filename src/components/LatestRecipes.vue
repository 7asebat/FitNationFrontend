<template>
  <div>
    <div class="c-meals-popular-meals">
      <h1 class="u-title-font">
        Popular <span class="text-success">Meals</span>
      </h1>
      <p class="text-secondary">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div class="row">
        <div
          class="col-sm-12 col-md-3 mb-4"
          v-for="recipe in recipesFiltered"
          :key="recipe.id"
        >
          <router-link :to="{ name: 'SingleMeal', params: { id: recipe.id } }">
            <MealCard :recipe="recipe" />
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
    MealCard: () => import("@/components/MealCard.vue"),
  },
};
</script>