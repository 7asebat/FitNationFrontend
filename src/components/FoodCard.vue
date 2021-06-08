<template>
  <div class="c-food-card d-flex align-items-center shadow-sm round p-0 border">
    <BreakpointDetector @change="breakpoint = $event" />
    <div class="c-food-card__image" :class="{ 'c-overlay-image': showOverlay }">
      <img class="w-100" v-if="food.image" :src="food.image" alt="" />
      <img class="w-100" v-else src="@/assets/images/defaultFood.png" alt="" />
    </div>
    <div class="c-food-card__info p-4">
      <h4>{{ food.name }}</h4>
      <div id="nf-div" class="d-flex flex-row">
        <div class="col-1 px-0 mr-1" id="nf-div-heart">
          <i class="fas fa-heartbeat text-success"></i>
        </div>
        <div id="nf-div-info">
          <div id="nf-title" class="d-flex flex-row text-success">
            Nutrition Facts
          </div>
          <div id="nf-items" class="d-flex flex-row text-center pb-2">
            <div v-for="(key, i) in keys" :key="i" class="col px-2">
              <div class="c-nf-value">
                {{ food.nutrition_facts[key]
                }}<span class="c-nf-unit">{{ units[key] }}</span>
              </div>
              <div class="c-nf-type">{{ key }}</div>
            </div>
          </div>
        </div>
      </div>
      <p>
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
  components: {
    BreakpointDetector: () => import("@/components/BreakpointDetector"),
  },

  data: () => ({
    breakpoint: "",
    keys: ["calories", "protein", "carbs", "sugar"],
    units: {
      calories: "KCAL",
      protein: "g",
      carbs: "g",
      sugar: "g",
    },
  }),
  props: {
    food: {
      required: true,
    },
  },

  computed: {
    foodTypes() {
      return this.$store.state.enums.foodTypes;
    },

    showOverlay() {
      return this.breakpoint === "sm" || this.breakpoint === "xs";
    },
  },
};
</script>

<style lang="scss" scoped>
.c-nf-value {
  font-weight: bold;
  font-size: x-large;
}

.c-nf-unit {
  font-weight: bold;
  font-size: small;
}

.c-nf-type {
  margin-top: -5px;
  font-size: small;
}

.c-food-card {
  position: relative;
  border-radius: $border-radius;
  overflow: hidden;
}

.c-food-card:hover .c-overlay-image {
  opacity: 1;
  visibility: visible;
}

.c-food-card__image {
  flex: 0 0 220px;
}

.c-overlay-image {
  opacity: 0;
  visibility: hidden;
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: 2;
  transition: all 0.3s;
  overflow: hidden !important;
}

.c-overlay-image img {
  height: 100%;
  object-fit: cover;
}

.c-food-card__info {
}
</style>
