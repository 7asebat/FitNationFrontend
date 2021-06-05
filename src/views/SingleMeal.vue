<template>
  <div class="container d-flex flex-column my-3">
    <ImageText
      :title="meal.title"
      :imgSrc="meal.imgSrc"
      :description="meal.description"
    />
    <FoodItemCard
      v-for="(foodItem, i) in meal.foods"
      :key="i"
      :food="foodItem"
      class="m-3"
    />
  </div>
</template>

<script>
export default {
  name: "SingleMeal",
  // TODO(Abdelrahman) Add macros and count
  data: () => ({
    meal: {
      title: "Breakfast",
      description: "Oats, Milk, Cinnamon, Honey, what more could you ask for?",
      imgSrc: "meal.png",
      foods: [
        {
          id: 2,
          has_image: false,
          name: "Carrots",
          nutrition_facts: "High in Vitamin A",
          food_type: null,
          selected: false,
        },
        {
          id: 3,
          has_image: false,
          name: "Carrots",
          nutrition_facts: "High in Vitamin A",
          food_type: null,
          selected: false,
        },
        {
          id: 4,
          has_image: false,
          name: "Carrots",
          nutrition_facts: "High in Vitamin A",
          food_type: null,
          selected: false,
        },
      ],
    },
  }),

  components: {
    ImageText: () => import("@/components/common/ImageText.vue"),
    FoodItemCard: () => import("@/components/FoodCard"),
  },
};
</script>

<style scoped></style>
