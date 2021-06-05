<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <template #tabs-start>
        <b-button @click="insertDay" class="bg-dark rounded-circle mr-2">
          +
        </b-button>
      </template>

      <b-tab
        v-for="(date, d) in nutritionInfoSorted"
        :key="d"
        :title="`${dateToString(date.date)}`"
        class="py-3 px-5"
      >
        <b-row class="col py-2">
          <div v-if="date.weight" class="alert alert-success mx-2">
            Weight | {{ date.weight }}kg
          </div>
          <div v-if="date.bodyfat" class="alert alert-success mx-2">
            Bodyfat | {{ date.bodyfat }}%
          </div>
        </b-row>

        <b-row v-for="(meal, i) in date.meals" :key="i">
          <MealCard class="col-10" :meal="meal" />
          <div class="col-2 d-flex align-items-center">
            <h1>x {{ meal.amount }}</h1>
          </div>
        </b-row>

        <b-row align-h="end">
          <b-button
            variant="primary"
            pill
            class="py-3 px-5 mr-5 mb-4"
            @click="$bvModal.show(`nutrition-modal${d}`)"
          >
            <i class="fas fa-pen mr-2" />
            <span>Edit</span>
          </b-button>
        </b-row>

        <NutritionBuilderModal
          :modalId="`nutrition-modal${d}`"
          @confirmEdits="
            confirmEdits(nutritionInfoSorted[d].date, ...arguments)
          "
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "NutritionInfo",

  components: {
    MealCard: () => import("@/components/MealCard.vue"),
    NutritionBuilderModal: () =>
      import("@/components/Profile/NutritionBuilderModal.vue"),
  },

  data: () => ({
    isAdding: false,
    nutritionInfo: [
      {
        date: new Date("2021-06-02"),
        weight: 74.2,
        bodyfat: 17,

        meals: [
          {
            name: "Full English Breakfast",
            amount: 9,
            count: 3,
          },
        ],
      },
      {
        date: new Date("2021-06-03"),
        weight: 75.2,

        meals: [
          {
            name: "Oatmeal Porridge",
            amount: 2,
            count: 3,
          },
          {
            name: "Steak Sandwich",
            amount: 4,
            count: 3,
          },
        ],
      },
    ],
  }),
  methods: {
    dateToString(date) {
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },

    insertDay() {
      let date = new Date(Date.now());
      date.setHours(0, 0, 0, 0);
      this.nutritionInfo.unshift({ date, meals: [] });
    },

    confirmEdits(date, edits) {
      let d = this.nutritionInfo.findIndex((el) => el.date === date);
      const { weight, meals } = edits;

      if (weight) {
        this.nutritionInfo[d].weight = weight;
      }
      if (meals) {
        if (this.nutritionInfo[d].meals) {
          this.nutritionInfo[d].meals.push(...meals);
        } else {
          this.nutritionInfo[d].meals = meals;
        }
      }
    },
  },
  computed: {
    nutritionInfoSorted() {
      const sorted = this.nutritionInfo.slice();
      return sorted.sort((a, b) => b.date - a.date);
    },
  },
};
</script>

<style lang="scss">
.c-weight {
  //width: 100px !important;
}
</style>
