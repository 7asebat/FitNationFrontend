<template>
  <div>
    <b-card class="overflowHidden border-0 shadow-sm">
      <div class="d-flex itemsHeader">
        <div>
          <h2>Clients</h2>
          <p class="text-secondary">A list of all the clients</p>
        </div>
      </div>
      <b-table
        striped
        responsive
        hover
        :items="clients"
        :fields="['id', 'name', 'email', 'actions']"
        :busy="isLoading"
      >
        <template v-slot:cell(actions)="data">
          <b-button
            variant="danger mr-2"
            v-b-modal="'deleteClient'"
            @click="clientToDelete = data.item"
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
            getClients(page);
          }
        "
        align="right"
        first-number
      ></b-pagination>
    </b-card>

    <DeleteModal
      modalId="deleteClient"
      title="Delete Client"
      @ok="deleteClient"
      @cancel="clientToDelete = null"
    >
      you are going to delete the following client :
      <b>{{ clientToDelete ? clientToDelete.name : "" }}</b
      >. <br />Are you sure ?
    </DeleteModal>
  </div>
</template>

<script>
export default {
  created() {
    this.getClients(1);
  },
  data() {
    return {
      isLoading: false,
      meta: [],
      clients: [],
      clientToDelete: "",
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getClients(clientsPage) {
      this.isLoading = true;
      try {
        const response = await this.axios.get(
          `admin/users?role=0&page=${clientsPage}`
        );

        const { count, limit, page, total } = response.data;
        const meta = { count, limit, page, total };
        const { users } = response.data.data;

        this.clients = users;
        this.meta = meta;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    async deleteClient() {
      try{
        const id = this.clientToDelete.id;
        await this.axios.delete(`clients/${id}`);

        this.clients = this.clients.filter(client => client.id !== id);

        this.$bvModal.hide("deleteClient");
        this.$notification(
          "successNotification",
          `Client: ${this.clientToDelete.name} has been deleted successfully!`
        );


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
.addClient {
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
