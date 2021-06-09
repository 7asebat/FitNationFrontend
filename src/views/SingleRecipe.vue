<template>
  <div class="container d-flex flex-column my-3">
    <div v-if="recipe">
      <div class="c-single-recipe__header-container d-flex flex-wrap mb-5">
        <div class="mr-4">
          <img
            v-if="recipe.image"
            :src="recipe.image"
            alt=""
            class="c-single-recipe__image"
          />
          <img
            v-else
            src="@/assets/images/defaultRecipe.png"
            alt=""
            class="c-single-recipe__image"
          />
        </div>

        <div>
          <h1 class="u-title-font">{{ recipe.name }}</h1>
          <p class="text-secondary">{{ recipe.description }}</p>

          <button
            class="btn btn-primary"
            v-b-modal="'deleteRecipe'"
            v-if="recipeOwner"
          >
            <i class="fas fa-trash"></i>
            <span class="d-inline-block ml-3">Delete recipe</span>
          </button>
        </div>
      </div>

      <h2 class="u-title-font m-0">
        Items in this <span class="text-success">recipe</span>
      </h2>
      <p class="text-secondary">{{ recipe.foods.length }} Items</p>
      <FoodItemCard
        v-for="(foodItem, i) in recipe.foods"
        :key="i"
        :food="foodItem.food"
        :quantity="foodItem.quantity"
        class="mb-3"
      />

      <DeleteModal
        v-if="recipeOwner"
        modalId="deleteRecipe"
        title="Delete Recipe"
        @ok="deleteRecipe"
      >
        you are going to delete the following recipe :
        <b>{{ recipe ? recipe.name : "" }}</b
        >. <br />Are you sure ?
      </DeleteModal>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleRecipe",

  created() {
    this.getRecipe();
  },

  data() {
    return {
      recipe: undefined,
    };
  },

  computed: {
    recipeOwner() {
      const user = this.$store.state.user;
      if (!user) return false;

      const isNutritionist = user.role === "nutritionist";

      return isNutritionist && user.id == this.recipe.nutritionist_id;
    },
  },

  props: {
    id: String,
  },

  components: {
    FoodItemCard: () => import("@/components/FoodCard"),
    DeleteModal: () => import("@/components/common/DeleteModal"),
  },

  methods: {
    async getRecipe() {
      try {
        const response = await this.axios.get(`recipes/${this.id}`);
        const recipe = response.data.data.recipe;

        this.recipe = recipe;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    async deleteRecipe() {
      try {
        await this.axios.delete(`recipes/${this.recipe.id}`);
        this.$notification(
          "successNotification",
          "Recipe has been deleted successfully!"
        );
        this.$router.push({ name: "MyRecipes" });
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-single-recipe__image {
  max-height: 150px;
  float: right;
  border-radius: $border-radius;
}

@media screen and (max-width: 454px) {
  .c-single-recipe__header-container {
    justify-content: center;
    text-align: center;
  }
}
</style>