<template>
  <div class="container my-5">
    <h1 class="u-title-font">Recipes Builder</h1>
    <p class="text-secondary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eveniet
      ea maxime natus laboriosam, sunt nesciunt magnam at inventore, commodi
      velit vero ratione, unde provident vel fuga ut doloribus minus.
    </p>

    <div class="row mt-5">
      <div class="col-12 col-md-12 col-lg-6">
        <h3 class="mb-3 u-title-font">Recipe Info</h3>

        <b-form-input
          v-model="recipeName"
          placeholder="Recipe Name"
          class="mb-3"
        ></b-form-input>

        <b-form-file
          v-model="recipeImage"
          :state="Boolean(recipeImage)"
          class="mb-3"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>

        <b-form-textarea
          v-model="recipeDescription"
          placeholder="Recipe description ..."
          rows="6"
          max-rows="8"
          class="mb-3"
        ></b-form-textarea>
      </div>
      <div class="col-12 col-md-12 col-lg-6">
        <h3 class="mb-3 u-title-font">Food in this recipe</h3>
        <div class="c-recipes-builder__food-container round-corner">
          <div
            class="c-recipes-builder__food-card-container mb-3"
            v-for="foodItem in food"
            :key="foodItem.id"
            @click="removeFoodItem(foodItem)"
          >
            <div
              class="
                c-recipes-builder__food-card-overlay
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <h1><i class="fas fa-trash text-danger"></i></h1>
            </div>
            <FoodCard :food="foodItem" />
          </div>

          <BuilderEmptyState @clicked="showFoodModal" />
        </div>
      </div>
    </div>

    <button class="btn btn-primary mt-3" @click.prevent="addRecipe">
      Save Recipe
    </button>

    <BuilderFoodModal @addFood="addFood" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipeImage: undefined,
      recipeName: "",
      recipeDescription: "",
      food: [],
    };
  },

  components: {
    BuilderEmptyState: () => import("@/components/recipes/BuilderEmptyState"),
    BuilderFoodModal: () => import("@/components/recipes/BuilderFoodModal"),
    FoodCard: () => import("@/components/FoodCard"),
  },

  methods: {
    async addRecipe() {
      try {
        const foods = this.food.map((foodItem) => ({
          id: foodItem.id,
          quantity: foodItem.quantity,
        }));

        const payload = {
          recipe: {
            name: this.recipeName,
            description: this.recipeDescription,
            foods,
          },
        };

        const response = await this.axios.post("recipes", payload);

        const recipe = response.data.data.recipe;

        if (this.recipeImage) {
          try {
            const payload = new FormData();
            payload.append("image", this.recipeImage);

            await this.axios.patch(`recipes/${recipe.id}/image`, payload);
          } catch (err) {
            this.$errorsHandler(new Error("Failed to upload recipe image"));
          }
        }

        this.$notification(
          "successNotification",
          "Recipe created successfully"
        );
        this.$router.push({ name: "Recipes" });
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    showFoodModal() {
      this.$bvModal.show("builderFoodModal");
    },
    addFood(foodToAdd) {
      this.food.push(...foodToAdd);
    },
    removeFoodItem(foodItemToRemove) {
      this.food = this.food.filter(
        (foodItem) => foodItem.id !== foodItemToRemove.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.c-recipes-builder__food-card-container {
  position: relative;
  border-radius: $border-radius;
  overflow: hidden;
  cursor: pointer;
}

.c-recipes-builder__food-card-container:hover
  .c-recipes-builder__food-card-overlay {
  opacity: 1;
}

.c-recipes-builder__food-card-overlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: all 0.3s;
  z-index: 2;
}

.c-recipes-builder__food-container {
  max-height: 600px;
  overflow: scroll;
}
</style>
