<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <b-tab
        v-for="(date, d) in nutritionInfoSorted"
        :key="d"
        :title="`${dateToString(date.date)}`"
      >
        <div class="col p-2 px-4">
          <b-row>
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
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "NutritionInfo",

  components: {
    MealCard: () => import("@/components/MealCard.vue"),
  },

  data: () => ({
    nutritionInfo: [
      {
        date: new Date("2021-06-03"),
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
        date: new Date("2021-06-04"),
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
