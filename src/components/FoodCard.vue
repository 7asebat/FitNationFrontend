<template>
  <div class="c-food-card d-flex round">
    <div class="c-food-card__image overflow-hidden">
      <img
        class="w-100 round-corner"
        v-if="food.image"
        :src="food.image"
        alt=""
      />
      <img
        class="w-100 round-corner"
        v-else
        src="@/assets/images/defaultFood.png"
        alt=""
      />
    </div>
    <div class="c-food-card__info ml-2 pl-2">
      <h4>{{ food.name }}</h4>
      <p class="m-0">
        <i class="fas fa-heartbeat text-success"></i>
        <span class="text-success mx-2">Nutrition Facts:</span>
        <span>{{ food.nutrition_facts }}</span>
      </p>
      <p class="m-0">
        <i class="fas fa-utensils text-success"></i>
        <span class="text-success mx-2">Food Type:</span>
        <span>{{ foodTypes[food.food_type] }}</span>
      </p>
      <p v-if="food.quantity">
        <i class="fab fa-slack-hash text-success"></i>
        <span class="text-success mx-2">Quantity:</span>
        <span>{{ food.quantity }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      required: true,
    },
  },

  computed: {
    foodTypes() {
      return this.$store.state.enums.foodTypes;
    },
  },
};
</script>

<style lang="scss" scoped>
.c-food-card {
  border-radius: $border-radius;
  overflow: hidden;
}

.c-food-card__image {
  flex: 0 0 150px;
}

.c-food-card__info {
}
</style>
