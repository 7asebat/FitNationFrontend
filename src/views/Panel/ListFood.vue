<template>
  <div>
    <b-card class="overflowHidden border-0 shadow-sm">
      <div class="d-flex itemsHeader">
        <div>
          <h2>Food</h2>
          <p class="text-secondary">A list of all the food items</p>
        </div>
        <div>
          <button class="btn btn-success" v-b-modal="'addFoodModal'">
            <i class="fas fa-plus"></i>
            <span class="ml-2">Add Food</span>
          </button>
        </div>
      </div>
      <b-table
        striped
        responsive
        hover
        :items="foods"
        :fields="[
          'id',
          'name',
          'nutrition_facts',
          { key: 'food_type', formatter: 'formatFoodType' },
          'actions',
        ]"
        :busy="isLoading"
      >
        <template v-slot:cell(name)="data">
          <div class="d-flex align-items-center">
            <div class="mr-2 c-list-food__image-container">
              <img
                v-if="data.item.image"
                :src="data.item.image"
                :alt="data.item.name"
              />
              <img
                v-else
                src="@/assets/images/defaultFood.png"
                :alt="data.item.name"
              />
            </div>
            <h4 class="u-title-font m-0">{{ data.item.name }}</h4>
          </div>
        </template>

        <template v-slot:cell(nutrition_facts)="data">
          <div id="nf-div" class="d-flex flex-row">
            <div id="nf-div-info">
              <div id="nf-items" class="d-flex flex-row text-center pb-2">
                <div v-for="(key, i) in keys" :key="i" class="col px-2">
                  <div class="c-nf-value">
                    <span class="u-title-font">{{
                      data.item.nutrition_facts[key]
                    }}</span>

                    <span class="c-nf-unit">{{ units[key] }}</span>
                  </div>
                  <div class="c-nf-type">{{ key }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:cell(actions)="data">
          <b-button
            variant="danger mr-2"
            v-b-modal="'deleteFood'"
            @click="foodToDelete = data.item"
          >
            <i class="fas fa-trash"></i>
          </b-button>
        </template>

        <template v-slot:table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle mr-3"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>

      <b-pagination
        v-if="meta"
        v-model="meta.page"
        :total-rows="meta.total"
        :per-page="meta.limit"
        @change="
          (page) => {
            getFoods(page);
          }
        "
        align="right"
        first-number
      ></b-pagination>
    </b-card>

    <DeleteModal
      modalId="deleteFood"
      title="Delete Food"
      @ok="deleteFood"
      @cancel="foodToDelete = null"
    >
      you are going to delete the following food :
      <b>{{ foodToDelete ? foodToDelete.name : "" }}</b
      >. <br />Are you sure ?
    </DeleteModal>

    <AddFoodModal @addedFood="(food) => foods.push(food)" />
  </div>
</template>

<script>
export default {
  created() {
    this.getFoods(1);
  },
  data() {
    return {
      isLoading: false,
      foods: [],
      foodToDelete: "",
      meta: undefined,
      keys: ["calories", "protein", "carbs", "sugar"],
      units: {
        calories: "KCAL",
        protein: "g",
        carbs: "g",
        sugar: "g",
      },
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getFoods(foodsPage) {
      this.isLoading = true;
      try {
        const response = await this.axios.get(`foods?page=${foodsPage}`);
        const { food } = response.data.data;

        this.foods = food;

        const { count, limit, page, total } = response.data;
        const meta = { count, limit, page, total };

        this.meta = meta;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    async deleteFood() {
      try {
        const id = this.foodToDelete.id;
        await this.axios.delete(`foods/${id}`);

        this.foods = this.foods.filter((food) => food.id !== id);

        this.$bvModal.hide("deleteFood");
        this.$notification(
          "successNotification",
          `Food: ${this.foodToDelete.name} has been deleted successfully!`
        );

        this.foodToDelete = null;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    formatFoodType(foodTypeId) {
      const foodTypes = this.$store.state.enums.foodTypes;
      return foodTypes[foodTypeId] || "-";
    },
  },

  components: {
    DeleteModal: () => import("@/components/common/DeleteModal"),
    AddFoodModal: () => import("@/components/Panel/AddFoodModal"),
  },
};
</script>

<style lang="scss" scoped>
.itemsHeader {
  justify-content: space-between;
  align-items: center;
}
.addFood {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  font-size: 25px;
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.overflowHidden {
  overflow: hidden;
}
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

.c-list-food__image-container img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
