<template>
  <div class="c-food-card d-flex shadow-sm round p-0 border">
    <BreakpointDetector @change="breakpoint = $event" />

    <div
      class="c-food-card__image-container"
      :class="{ 'c-overlay-image': showOverlay }"
    >
      <img
        class="w-100 c-food-card__image"
        v-if="food.image"
        :src="food.image"
        alt=""
      />
      <img
        class="w-100 c-food-card__image"
        v-else
        src="@/assets/images/defaultFood.png"
        alt=""
      />
    </div>

    <div class="c-food-card__info p-4 d-flex w-100 flex-wrap">
      <div>
        <h2 class="u-title-font m-0">{{ food.name }}</h2>
        <span class="bg-success round-corner px-3 text-light mb-3">{{
          foodTypes[food.food_type]
        }}</span>

        <div id="nf-div" class="d-flex flex-row">
          <div id="nf-div-info">
            <div id="nf-items" class="d-flex flex-row text-center pb-2">
              <div v-for="(key, i) in keys" :key="i" class="col px-2">
                <div class="c-nf-value">
                  <span class="u-title-font">{{
                    food.nutrition_facts[key]
                  }}</span>

                  <span class="c-nf-unit">{{ units[key] }}</span>
                </div>
                <div class="c-nf-type">{{ key }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ml-auto" v-if="food.quantity || quantity">
        <div class="u-title-font text-right">
          <!-- <span class="h3 text-success">x</span> -->
          <span class="h3 text-success">x</span>
          <span class="h1">{{ food.quantity || quantity }}</span>
          <h5 class="m-0 u-title-font">quantity</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.setShowOverlay();

    window.addEventListener("resize", this.setShowOverlay);
  },

  components: {
    BreakpointDetector: () => import("@/components/BreakpointDetector"),
  },

  data: () => ({
    breakpoint: "",
    showOverlay: false,
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
    quantity: [String, Number],
  },

  methods: {
    setShowOverlay() {
      this.showOverlay = window.innerWidth <= 573;
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

.c-food-card__image-container {
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

.c-food-card__image {
  height: 100%;
  max-height: 200px;
  object-fit: cover;
}
</style>
