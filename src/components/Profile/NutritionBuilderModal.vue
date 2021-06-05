<template>
  <b-modal
    :id="modalId"
    size="lg"
    title="Add today's nutrition info"
    ok-title="Confirm"
    @ok="confirmEdits"
  >
    <div class="d-flex flex-column container-fluid align-items-center">
      <b-input v-model="weight" placeholder="Weight (kg)" class="w-50 m-2" />

      <b-input-group class="mx-auto mb-3">
        <template #append>
          <b-input-group-text class="bg-white border-left-0 pr-3">
            <i class="fas fa-search" />
          </b-input-group-text>
        </template>

        <b-form-input v-model="mealQuery" class="border-right-0 text-right" />
      </b-input-group>

      <b-row
        v-for="(meal, i) in meals"
        :key="i"
        :id="`mealRow-${i}`"
        @mouseenter="meals[i].isHovered = true"
        @mouseleave="meals[i].isHovered = false"
        class="rounded border-primary py-3"
        :class="{ border: meal.isHovered }"
      >
        <MealCard class="col-10" :meal="meal" />

        <div class="col-2 d-flex align-items-center h1">
          x <b-input v-model="meal.amount" class="ml-3" />
        </div>
      </b-row>

      <div></div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "NutritionBuilderModal",

  components: {
    MealCard: () => import("@/components/MealCard.vue"),
  },
  data: () => ({
    weight: "",
    mealQuery: "",
    meals: [
      {
        name: "Protein Shake",
        amount: 0,
        count: 6,
        isHovered: false,
      },
      {
        name: "French Toast",
        amount: 0,
        count: 6,
        isHovered: false,
      },
    ],
  }),
  props: {
    modalId: String,
  },

  methods: {
    confirmEdits() {
      const meals = this.meals
        .filter((meal) => meal.amount > 0)
        .map((meal) => {
          const { name, amount, count } = meal;
          return { name, amount, count };
        });
      this.$emit("confirmEdits", { weight: this.weight, meals });
    },
  },
};
</script>

<style scoped lang="scss"></style>
