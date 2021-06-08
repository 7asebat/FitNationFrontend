<template>
  <b-modal
    id="builderFoodModal"
    scrollable
    size="lg"
    :title="`Add food to recipe`"
    :ok-title="`Add Selected Food`"
    @ok="addFood"
  >
    <div class="row">
      <div class="col-12 mb-3" v-for="foodItem in food" :key="foodItem.id">
        <div
          class="c-builder-food-modal__exercise-wrapper"
          @click.prevent="foodItem.selected = !foodItem.selected"
        >
          <div
            :class="{
              'c-builder-food-modal__selected-overlay--selected':
                foodItem.selected,
            }"
            class="c-builder-food-modal__selected-overlay p-4"
          >
            <h1
              class="
                text-success
                d-flex
                justify-content-center
                align-items-center
                h-100
              "
            >
              <b-form-input
                class="c-builder-food-modal__quantity-input"
                type="number"
                v-model="foodItem.quantity"
                placeholder="Quantity"
                @click.stop=""
              ></b-form-input>

            </h1>
          </div>
          <FoodItemCard :food="foodItem" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  created() {
    this.getAllFood();
  },

  data() {
    return {
      food: [],
    };
  },

  computed: {
    selectedFood() {
      return this.food.filter((foodItem) => foodItem.selected && foodItem.quantity);
    },
  },

  methods: {
    async getAllFood() {
      try {
        const response = await this.axios.get("foods");
        let foods = response.data.data.food;

        foods = foods.map((food) => {
          food.selected = false;
          food.quantity = undefined;
          return food;
        });

        this.food = foods;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    addFood() {
      this.$emit("addFood", this.selectedFood);
      this.resetFood();
    },
    resetFood() {
      this.food = this.food.map((foodItem) => {
        foodItem.selected = false;
        return foodItem;
      });
    },
  },

  components: {
    FoodItemCard: () => import("@/components/FoodCard"),
  },
};
</script>

<style lang="scss" scoped>
.c-builder-food-modal__exercise-wrapper {
  position: relative;
  cursor: pointer;
}
.c-builder-food-modal__selected-overlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: $border-radius;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
}
.c-builder-food-modal__selected-overlay--selected {
  opacity: 1;
  visibility: visible;
}
.c-builder-food-modal__quantity-input{
  max-width: 300px;
  margin: 0 auto;
}
</style>