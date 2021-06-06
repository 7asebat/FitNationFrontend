<template>
  <b-modal
    id="addFoodModal"
    scrollable
    size="md"
    :title="`Add food to recipe`"
    :ok-title="`Add Selected Food`"
    @ok="addFood"
  >
    <b-form-input
      v-model="name"
      placeholder="Food Name"
      class="mb-3"
    ></b-form-input>
    <b-form-input
      v-model="nutritionFacts"
      placeholder="Nutrition Facts"
      class="mb-3"
    ></b-form-input>

    <b-form-select v-model="foodType" :options="foodTypes"></b-form-select>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nutritionFacts: "",
      foodType: 0,
    };
  },

  computed: {
    foodTypes() {
      const foodTypes = this.$store.state.enums.foodTypes;

      return Object.keys(foodTypes).map((key) => ({
        value: key,
        text: foodTypes[key],
      }));
    },
  },

  methods: {
    async addFood() {
      try {
        const payload = new FormData();
        payload.append("name", this.name);
        payload.append("nutrition_facts", this.nutritionFacts);
        payload.append("food_type", this.foodType);

        const response = await this.axios.post("foods", payload);
        const food = response.data.data.food;

        this.$emit("addedFood", food);
        this.$notification(
          "successNotification",
          `Food: ${this.name} added successfully`
        );
        this.resetForm();
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    resetForm() {
      this.name = "";
      this.nutritionFacts = "";
      this.foodType = 0;
    },
  },
};
</script>