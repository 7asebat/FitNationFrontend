<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <template #tabs-start>
        <b-button v-if="canInsertDay" @click="insertDay" class="bg-dark mr-2">
          <i class="fas fa-plus mr-1"></i>
          Today
        </b-button>
      </template>

      <b-tab
        v-for="(day, d) in nutritionInfoSorted"
        :key="d"
        :title="datesStringsSorted[d]"
        class="py-3 px-5"
      >
        <b-row class="col py-2">
          <div v-if="day.weight" class="alert alert-success mx-2">
            <i class="fas fa-weight mr-1"></i>
            {{ day.weight }}kg
          </div>
        </b-row>

        <b-row v-for="(item, i) in day.specs" :key="i">
          <div class="col-10 p-3">
            <FoodCard :food="item.item" class="border" />
          </div>
          <div class="col-2 d-flex align-items-center">
            <h1>x {{ item.quantity }}</h1>
          </div>
        </b-row>

        <b-row align-h="end">
          <b-button
            v-if="!day.specs"
            variant="primary"
            pill
            class="py-3 px-5 mr-0 mb-0"
            @click="$bvModal.show(`nutrition-modal${d}`)"
          >
            <i class="fas fa-plus mr-2" />
            <span>Add</span>
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
import { EventBus } from "@/plugins/eventBus.js";

export default {
  name: "NutritionInfo",

  async created() {
    EventBus.$on("errorNotification", (message, title) => {
      if (!title) title = "Error happened!";
      this.makeToast(title, message, "danger");
    });

    EventBus.$on("successNotification", (message, title) => {
      if (!title) title = "Successful operation";
      this.makeToast(title, message, "success");
    });
    await this.setNutritionInfo();
  },

  components: {
    FoodCard: () => import("@/components/FoodCard.vue"),
    NutritionBuilderModal: () =>
      import("@/components/Profile/NutritionBuilderModal.vue"),
  },

  data: () => ({
    nutritionInfo: [],
  }),
  methods: {
    async getRecipe(id) {
      const response = await this.axios.get(`recipes/${id}`);
      const { name, description, photo } = response.data.data.recipe;
      return { name, description, photo };
    },

    async getFood(id) {
      const response = await this.axios.get(`foods/${id}`);
      const food = response.data.data.food;
      return food;
    },

    async getNutritionSpec(id) {
      const response = await this.axios.get(`nutrition_specifications/${id}`);
      const spec = response.data.data.nutrition_specification;
      return spec;
    },

    async setNutritionInfo() {
      try {
        const response = await this.axios.get(
          "client_weight_nutritions/client"
        );
        const nutrition_info = response.data.data.client_weight_nutritions;

        // For each day
        let populated = nutrition_info.map(async (info) => {
          // Collect all nutrition specifications
          let specs = info.nutrition_specifications.map(async (spec) => {
            const specification = await this.getNutritionSpec(spec.id);
            return specification;
          });
          specs = await Promise.all(specs);

          // Expand foods/recipes in each specification
          specs = specs.map(async (spec) => {
            if (spec.food_id) {
              const food = await this.getFood(spec.food_id);
              return { quantity: spec.quantity, item: food };
            } else if (spec.recipe_id) {
              const recipe = await this.getRecipe(spec.recipe_id);
              return { quantity: spec.quantity, item: recipe };
            }
          });
          specs = await Promise.all(specs);

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
    },

    async initSpec(spec, date) {
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

    async confirmEdits(date, payload) {
      const weight = payload.weight;
      const foods = payload.foods;

      if (foods && weight) {
        const id = await this.initSpec(payload, date);

        let promises = [];
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
.c-weight {
  //width: 100px !important;
}
</style>
