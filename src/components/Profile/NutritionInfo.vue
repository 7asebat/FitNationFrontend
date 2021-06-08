<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <template #tabs-start>
        <b-button
          v-if="canInsertDay"
          @click="insertDay"
          class="bg-dark mr-2 text-light"
        >
          <i class="fas fa-plus mr-1"></i>
          Today
        </b-button>
        <div v-else class="my-auto text-dark rounded bg-light mr-2 p-2 px-4">
          {{
            isValidAggregation(
              nutritionInfoSorted[0].weight,
              aggregatedNutritionFacts[0]
            )
              ? "You added today's log. Good job!"
              : "Adding today's log..."
          }}
        </div>
      </template>

      <b-tab
        v-for="(day, d) in nutritionInfoSorted"
        :key="d"
        :title="datesStringsSorted[d]"
        class="py-3 px-lg-5 px-1"
      >
        <b-row class="py-2 px-3">
          <div
            v-if="isValidAggregation(day.weight, aggregatedNutritionFacts[d])"
            class="
              d-flex
              flex-row flex-wrap
              w-100
              text-center
              alert
              border-dark
              text-dark
              bg-light
              justify-content-between
            "
          >
            <div class="col-sm-2 col-12 px-2 m-0 my-auto">
              <div class="c-nf-value">
                {{ day.weight }}<span class="c-nf-unit">kg</span>
              </div>
              <div class="c-nf-type">
                <i class="fas fa-weight mr-1"></i>
              </div>
            </div>
            <div
              v-for="(key, i) in keys"
              :key="i"
              class="col-sm-2 col-3 px-2 m-0"
            >
              <div class="c-nf-value">
                {{ aggregatedNutritionFacts[d][key]
                }}<span class="c-nf-unit">{{ units[key] }}</span>
              </div>
              <div class="c-nf-type">{{ key }}</div>
            </div>
          </div>
        </b-row>

        <b-row v-for="(item, i) in day.specs" :key="i" class="px-2">
          <div class="col-10 py-3 px-0">
            <FoodCard :food="item.food" class="border" />
          </div>
          <div class="col-1 d-flex align-items-center p-0 pl-3">
            <h1>x {{ item.quantity }}</h1>
          </div>
        </b-row>

        <b-row align-h="end">
          <b-button
            variant="primary"
            pill
            class="py-3 px-5 mr-0 mb-0"
            @click="$bvModal.show(`nutrition-modal`)"
          >
            <div
              v-if="isValidAggregation(day.weight, aggregatedNutritionFacts[d])"
              class="p-0"
            >
              <i class="fas fa-pen mr-2" />
              <span>Edit</span>
            </div>
            <div v-else>
              <i class="fas fa-plus mr-2" />
              <span>Add</span>
            </div>
          </b-button>
        </b-row>

        <NutritionBuilderModal
          class="c-nutrition-modal-fw"
          modalId="nutrition-modal"
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

  async created() {
    await this.setNutritionInfo();
  },

  components: {
    FoodCard: () => import("@/components/FoodCard.vue"),
    NutritionBuilderModal: () =>
      import("@/components/Profile/NutritionBuilderModal.vue"),
  },

  data: () => ({
    nutritionInfo: [],
    keys: ["calories", "protein", "carbs", "sugar"],
    units: {
      calories: "KCAL",
      protein: "g",
      carbs: "g",
      sugar: "g",
    },
  }),
  methods: {
    async getRecipe(id) {
      const response = await this.axios.get(`recipes/${id}`);
      const { name, description, photo } = response.data.data.recipe;
      return { name, description, photo };
    },

    async setNutritionInfo() {
      try {
        const response = await this.axios.get(
          "client_weight_nutritions/client"
        );
        const nutrition_info = response.data.data.client_weight_nutritions;

        // For each day
        let populated = nutrition_info.map((info) => {
          // Collect all nutrition specifications
          const foods = info.nutrition_specifications.filter(
            (spec) => spec.food
          );
          const recipes = info.nutrition_specifications.filter(
            (spec) => spec.recipe
          );

          // Expand recipes into foods
          const recipe_foods = [];
          recipes.forEach((recipe) => {
            recipe.foods.forEach((food) => {
              recipe_foods.push({
                quantity: recipe.quantity * food.quantity,
                food,
              });
            });
          });

          const specs = foods.concat(recipe_foods);

          // Expand foods/recipes in each specification
          return {
            date: new Date(info.date),
            weight: info.weight,
            specs,
          };
        });

        populated = await Promise.all(populated);
        this.nutritionInfo = populated;

        if (!populated) {
          throw new Error("Failed to fetch nutrition information");
        }
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    makeToast(title, message, variant = null) {
      this.$bvToast.toast(message, {
        title,
        variant: variant,
        solid: true,
      });
    },

    dateToString(date) {
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },

    insertDay() {
      let date = new Date(Date.now());
      this.nutritionInfo.unshift({ date });
      // this.$bvModal.show(`nutrition-modal`);
    },

    async existingCWN(date) {
      let response = await this.axios.get("client_weight_nutritions/client");
      const cwns = response.data.data.client_weight_nutritions;
      return cwns.find((cwn) => {
        const cwnd = new Date(cwn.date);
        return cwnd - date === 0;
      });
    },

    async initCWN(spec, date) {
      const existing = await this.existingCWN(date);
      if (existing) {
        return existing.id;
      }
      // Initialize specification
      let response = await this.axios.post("client_weight_nutritions", {
        date,
        weight: spec.weight,
      });

      return response.data.data.client_weight_nutritions.id;
    },

    async addFoodToSpec(food, id) {
      // Fill specification
      return this.axios.patch(`client_weight_nutritions/${id}/add_spec`, {
        nutrition_specification: {
          food_id: food.id,
          quantity: food.quantity,
        },
      });
    },

    async updateWeight(weight, id) {
      // Fill specification
      return this.axios.patch(`client_weight_nutritions/${id}`, {
        client_weight_nutrition: {
          weight,
        },
      });
    },

    isValidAggregation(weight, aggregation) {
      let validAggregation = true;
      for (const key in aggregation) {
        validAggregation &= aggregation[key];
      }

      return weight | validAggregation;
    },

    async confirmEdits(date, payload) {
      const weight = payload.weight;
      const foods = payload.foods;

      if (foods || weight) {
        const id = await this.initCWN(payload, date);

        let promises = [];
        if (weight) {
          promises.push(this.updateWeight(weight, id));
        }

        foods.forEach((food) => {
          promises.push(this.addFoodToSpec(food, id));
        });
        await Promise.all(promises);
        await this.setNutritionInfo();
      }
    },
  },
  computed: {
    canInsertDay() {
      if (this.nutritionInfoSorted.length < 1) return true;

      let date = new Date(Date.now());
      date.setHours(0, 0, 0, 0);
      const lastDay = this.nutritionInfoSorted[0].date;
      return date.getDate() !== lastDay.getDate();
    },

    aggregatedNutritionFacts() {
      // For each day
      return this.nutritionInfoSorted.map((day) => {
        const aggregated = {
          calories: 0,
          protein: 0,
          carbs: 0,
          sugar: 0,
        };
        // For each specification
        if (!day.specs) return aggregated;
        day.specs.forEach((item) => {
          const nf = item.food.nutrition_facts;
          const q = item.quantity;
          // For each macro
          for (const key in nf) {
            aggregated[key] += nf[key] * q;
          }
        });

        return aggregated;
      });
    },

    nutritionInfoSorted() {
      const sorted = this.nutritionInfo.slice();
      return sorted.sort((a, b) => b.date - a.date);
    },

    datesStringsSorted() {
      return this.nutritionInfoSorted.map((day) => this.dateToString(day.date));
    },
  },
};
</script>

<style lang="scss">
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
@media (min-width: 576px) {
  #nutrition-modal0 .modal-dialog {
    max-width: 90%;
  }
}

@media (min-width: 1200px) {
  #nutrition-modal0 .modal-dialog {
    max-width: 60%;
  }
}
//width: 100px !important;
</style>
