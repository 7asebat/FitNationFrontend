<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <b-tab
        v-for="(date, d) in nutritionInfoSorted"
        :key="d"
        :title="`${dateToString(date.date)}`"
      >
        <b-row class="p-2 px-4">
          <b-alert
            v-if="date.weight"
            show
            variant="success"
            class="c-weight text-center mr-4"
          >
            Weight | {{ date.weight }}kg
          </b-alert>

          <b-alert
            v-if="date.bodyfat"
            show
            variant="info"
            class="c-weight text-center"
          >
            Bodyfat | {{ date.bodyfat }}%
          </b-alert>
        </b-row>

        <b-table :items="date.nutrition" borderless></b-table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "NutritionInfo",

  data: () => ({
    nutritionInfo: [
      {
        date: new Date("2021-06-03"),
        weight: 74.2,
        bodyfat: 17,

        nutrition: [
          {
            name: "Brown Toast",
            amount: 2,
          },
          {
            name: "Cheddar Cheese",
            amount: 4,
          },
        ],
      },
      {
        date: new Date("2021-06-04"),
        weight: 75.2,

        nutrition: [
          {
            name: "Caesar Salad",
            amount: 5,
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
