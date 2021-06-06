<template>
  <div>
    <b-card class="overflowHidden border-0 shadow-sm">
      <div class="d-flex itemsHeader">
        <div>
          <h2>Food</h2>
          <p class="text-secondary">A list of all the food items</p>
        </div>
      </div>
      <b-table
        striped
        responsive
        hover
        :items="foods"
        :fields="['id', 'name', 'nutrition_facts', 'food_type', 'actions']"
        :busy="isLoading"
      >
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
        const response = await this.axios.get(
          `foods?page=${foodsPage}`
        );
        const { food } = response.data.data;

        this.foods = food;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    async deleteFood() {
      try{
        const id = this.foodToDelete.id;
        await this.axios.delete(`foods/${id}`);

        this.foods = this.foods.filter(food => food.id !== id);

        this.$bvModal.hide("deleteFood");
        this.$notification(
          "successNotification",
          `Food: ${this.foodToDelete.name} has been deleted successfully!`
        );

        this.foodToDelete = null;
      }catch(err){
        this.$errorsHandler(err);
      }

    },
  },

  components: {
    DeleteModal: () => import("@/components/common/DeleteModal"),
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
</style>
