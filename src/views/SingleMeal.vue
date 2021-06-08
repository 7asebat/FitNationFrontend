<template>
  <div class="container d-flex flex-column my-3">
    <div v-if="meal">
      <div class="d-flex mb-5">
        <div class="mr-4">
          <img
            v-if="meal.image"
            :src="meal.image"
            alt=""
            class="c-single-meal__image"
          />
          <img
            v-else
            src="@/assets/images/defaultRecipe.png"
            alt=""
            class="c-single-meal__image"
          />
        </div>

        <div>
          <h1 class="u-title-font">{{ meal.name }}</h1>
          <p class="text-secondary">{{ meal.description }}</p>

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
      <p class="text-secondary">{{ meal.foods.length }} Items</p>
      <FoodItemCard
        v-for="(foodItem, i) in meal.foods"
        :key="i"
        :food="foodItem"
        class="m-3"
      />

      <DeleteModal
        v-if="recipeOwner"
        modalId="deleteRecipe"
        title="Delete Recipe"
        @ok="deleteRecipe"
      >
        you are going to delete the following recipe :
        <b>{{ meal ? meal.name : "" }}</b
        >. <br />Are you sure ?
      </DeleteModal>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleMeal",

  created() {
    this.getRecipe();
  },

  data() {
    return {
      meal: undefined,
    };
  },

  computed: {
    recipeOwner() {
      const user = this.$store.state.user;
      return (
        user.role === "nutritionist" && user.id === this.meal.nutritionist_id
      );
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

        this.meal = recipe;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    async deleteRecipe() {
      try {
        await this.axios.delete(`recipes/${this.meal.id}`);
        this.$notification(
          "successNotification",
          "Recipe has been deleted successfully!"
        );
        this.$router.push({ name: "MyMeals" });
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-single-meal__image {
  max-height: 150px;
  float: right;
  border-radius: $border-radius;
}
</style>