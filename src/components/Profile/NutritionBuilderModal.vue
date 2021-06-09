<template>
  <b-modal
    :id="modalId"
    size="lg"
    title="Add today's nutrition info"
    ok-title="Confirm"
    scrollable
    @ok="confirmEdits"
    cancel-variant="outline-primary"
  >
    <div class="d-flex flex-column container-fluid align-items-center">
      <div class="d-flex flex-row align-items-center py-1">
        <span class="font-weight-bold" style="width: 150px">Weight (kg)</span>
        <b-input v-model="weight" class="w-100 m-2" type="number" />
      </div>

      <b-tabs pills card class="border rounded c-search-card">
        <b-tab title="Foods">
          <b-input-group class="mx-auto pb-2">
            <template #append>
              <b-input-group-text class="bg-white border-left-0 pr-3">
                <i class="fas fa-search" />
              </b-input-group-text>
            </template>

            <b-form-input @input="updateFoods($event)" class="border-right-0" />
          </b-input-group>

          <b-row
            v-for="(food, i) in matchingFoods"
            :key="i"
            :id="`foodRow-${i}`"
            class="rounded p-2"
          >
            <FoodCard class="col-sm-10 col-9" :food="food" />

            <div class="col-sm-2 col-3 d-flex align-items-center">
              <b-input
                v-model="food.quantity"
                class="m-0"
                type="number"
                min="0"
              />
            </div>
          </b-row>
        </b-tab>

        <b-tab title="Recipes">
          <b-input-group class="mx-auto pb-2">
            <template #append>
              <b-input-group-text class="bg-white border-left-0 pr-3">
                <i class="fas fa-search" />
              </b-input-group-text>
            </template>

            <b-form-input
              @input="updateRecipes($event)"
              class="border-right-0 text-right"
            />
          </b-input-group>

          <b-row
            v-for="(recipe, i) in matchingRecipes"
            :key="i"
            :id="`recipeRow-${i}`"
            class="rounded p-2"
          >
            <RecipeCard class="col-sm-10 col-9" :recipe="recipe" />

            <div class="col-sm-2 col-3 d-flex align-items-center">
              <b-input
                v-model="recipe.quantity"
                class="m-0"
                type="number"
                min="0"
              />
            </div>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "NutritionBuilderModal",

  created() {
    this.updateFoods("");
    this.updateRecipes("");
  },

  components: {
    FoodCard: () => import("@/components/FoodCard.vue"),
    RecipeCard: () => import("@/components/RecipeCard.vue"),
  },
  // TODO(Abdelrahman) Add recipes
  data: () => ({
    matchingFoods: [],
    matchingRecipes: [],
    weight: "",
    quantity: 0,
  }),
  props: {
    modalId: String,
  },

  methods: {
    async updateRecipes(query) {
      const response = await this.axios.get("recipes", {
        params: {
          q: query,
        },
      });

      this.matchingRecipes = response.data.data.recipes;
    },

    async updateFoods(query) {
      const response = await this.axios.get("foods", {
        params: {
          q: query,
        },
      });

      this.matchingFoods = response.data.data.food;
    },

    confirmEdits() {
      // Food ids
      let foods = this.matchingFoods.filter((food) => food.quantity > 0);
      let recipes = this.matchingRecipes.filter(
        (recipe) => recipe.quantity > 0
      );

      const payload = { foods, recipes };

      // TODO(Abdelrahman) Add validation
      if (this.weight > 0) payload.weight = this.weight;

      this.$emit("confirmEdits", payload);
    },
  },
};
</script>

<style scoped lang="scss">
.c-search-card {
  min-width: 97%;
}
</style>
