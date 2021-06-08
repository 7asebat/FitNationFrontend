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
      <div class="d-flex flex-row align-items-center">
        <span class="font-weight-bold" style="width: 150px">Weight (kg)</span>
        <b-input v-model="weight" class="w-100 m-2" type="number" />
      </div>

      <b-input-group class="mx-auto mb-3">
        <template #append>
          <b-input-group-text class="bg-white border-left-0 pr-3">
            <i class="fas fa-search" />
          </b-input-group-text>
        </template>

        <b-form-input
          @input="updateFoods($event)"
          class="border-right-0 text-right"
        />
      </b-input-group>

      <b-row
        v-for="(food, i) in matchingFoods"
        :key="i"
        :id="`mealRow-${i}`"
        class="rounded py-3"
      >
        <FoodCard class="col-sm-10 col-9" :food="food.food" />

        <div class="col-sm-2 col-3 d-flex align-items-center">
          <b-input v-model="food.quantity" class="m-0" type="number" min="0" />
        </div>
      </b-row>

      <div></div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "NutritionBuilderModal",

  async created() {
    // Get all foods
    const response = await this.axios.get("foods");
    this.allFoods = response.data.data.food;
    await this.updateFoods();
  },

  components: {
    FoodCard: () => import("@/components/FoodCard.vue"),
  },
  // TODO(Abdelrahman) Add recipes
  data: () => ({
    allFoods: [],
    matchingFoods: [],
    weight: "",
    quantity: 0,
  }),
  props: {
    modalId: String,
  },

  methods: {
    updateFoods(query) {
      // Filter only matching foods
      this.matchingFoods = this.allFoods
        .filter((food) => {
          if (!food.name) return false;
          return (
            food.name.toLowerCase().search(query ? query.toLowerCase() : "") >=
            0
          );
        })
        .map((food) => ({ food, quantity: 0 }));
    },

    confirmEdits() {
      // Food ids
      const foods = this.matchingFoods
        .filter((food) => food.quantity > 0)
        .map((food) => ({ id: food.food.id, quantity: food.quantity }));

      const payload = { foods };

      // TODO(Abdelrahman) Add validation
      if (this.weight > 0) payload.weight = this.weight;

      this.$emit("confirmEdits", payload);
    },
  },
};
</script>

<style scoped lang="scss"></style>
