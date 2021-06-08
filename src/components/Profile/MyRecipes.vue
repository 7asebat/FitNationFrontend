<template>
  <div>
    <div v-if="!recipes.length" class="text-center p-5 bg-light round-corner">
      <h1><i class="fas fa-utensils"></i></h1>
      <h1 class="u-title-font">You haven't created any recipes yet!</h1>
      <p class="text-secondary">
        Create your recipe now and share it with all the clients.
      </p>
      <router-link :to="{ name: 'RecipesBuilder' }" class="btn btn-primary">
        Create your own recipe
      </router-link>
    </div>

    <div v-else>
      <div class="row">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="recipe in recipes"
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
  </div>
</template>

<script>
export default {
  created() {
    this.getRecipes();
  },

  data() {
    return {
      recipes: [],
    };
  },

  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    async getRecipes() {
      try {
        const response = await this.axios.get(
          `recipes/nutritionist/${this.loggedInUser.id}`
        );

        const recipes = response.data.data.recipes;
        this.recipes = recipes;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },

  components: {
    RecipeCard: () => import("@/components/RecipeCard.vue"),
  },
};
</script>