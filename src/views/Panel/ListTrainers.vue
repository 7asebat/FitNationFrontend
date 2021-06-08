<template>
  <div>
    <b-card class="overflowHidden border-0 shadow-sm">
      <div class="d-flex itemsHeader">
        <div>
          <h2>Trainers</h2>
          <p class="text-secondary">A list of all the trainers</p>
        </div>
      </div>
      <b-table
        striped
        responsive
        hover
        :items="trainers"
        :fields="['id', 'name', 'email']"
        :busy="isLoading"
      >
        <template v-slot:cell(name)="data">
          <div class="d-flex align-items-center">
            <div class="mr-3 c-list-trainers__image-container">
              <img
                v-if="data.item.avatar"
                :src="data.item.avatar"
                :alt="data.item.name"
              />
              <img
                v-else
                src="@/assets/images/defaultUser.png"
                :alt="data.item.name"
              />
            </div>

            <h4 class="u-title-font m-0">{{ data.item.name }}</h4>
          </div>
        </template>

        <template v-slot:cell(actions)="data">
          <b-button
            variant="danger mr-2"
            v-b-modal="'deleteTrainer'"
            @click="trainerToDelete = data.item"
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
        v-model="meta.page"
        :total-rows="meta.total"
        :per-page="meta.limit"
        @change="
          (page) => {
            getTrainers(page);
          }
        "
        align="right"
        first-number
      ></b-pagination>
    </b-card>

    <DeleteModal
      modalId="deleteTrainer"
      title="Delete Trainer"
      @ok="deleteTrainer"
      @cancel="trainerToDelete = null"
    >
      you are going to delete the following trainer :
      <b>{{ trainerToDelete ? trainerToDelete.name : "" }}</b
      >. <br />Are you sure ?
    </DeleteModal>
  </div>
</template>

<script>
export default {
  created() {
    this.getTrainers(1);
  },
  data() {
    return {
      isLoading: false,
      meta: [],
      trainers: [],
      trainerToDelete: "",
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getTrainers(trainersPage) {
      this.isLoading = true;
      try {
        const response = await this.axios.get(
          `admin/users?role=2&page=${trainersPage}`
        );

        const { count, limit, page, total } = response.data;
        const meta = { count, limit, page, total };
        const { users } = response.data.data;

        this.trainers = users;
        this.meta = meta;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    deleteTrainer() {},
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
.addTrainer {
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
.c-list-trainers__image-container img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
