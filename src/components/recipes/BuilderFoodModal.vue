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
            class="c-builder-food-modal__selected-overlay"
          >
            <h1
              class="text-success d-flex justify-content-center align-items-center h-100"
            >
              <i class="fas fa-check-circle"></i>
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
  data() {
    return {
      food: [
        {
          id: 2,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
        {
          id: 3,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
        {
          id: 4,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
        {
          id: 5,
          has_image: null,
          name: null,
          nutrition_facts: null,
          food_type: null,
          selected: false,
        },
        {
          id: 6,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
        {
          id: 7,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
        {
          id: 8,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
        {
          id: 9,
          has_image: false,
          name: "Rice",
          nutrition_facts: "Calorie dense",
          food_type: null,
          selected: false,
        },
      ],
    };
  },

  computed: {
    selectedFood() {
      return this.food.filter((foodItem) => foodItem.selected);
    },
  },

  methods: {
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
}
.c-builder-food-modal__selected-overlay--selected {
  opacity: 1;
}
</style>