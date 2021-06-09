<template>
  <b-modal
    id="c-search-trainers-modal"
    title="Start Conversation"
    scrollable
    hide-footer
  >
    <b-input-group class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        type="search"
        v-model="query"
        @input="getTrainers"
        placeholder="Search Trainers"
      ></b-form-input>
    </b-input-group>

    <div v-for="trainer in trainers" :key="trainer.id">
      <div class="c-search-trainer__trainer-card d-flex align-items-center p-3">
        <div class="c-search-trainer__trainer-image">
          <img
            v-if="trainer.avatar"
            :src="trainer.avatar"
            :alt="trainer.name"
          />
          <img
            v-else
            src="@/assets/images/defaultUser.png"
            :alt="trainer.name"
          />
        </div>

        <h3 class="u-title-font mb-0 ml-2">{{ trainer.name }}</h3>

        <!-- <div class="ml-auto">
          <button class="btn btn-outline-primary">
            <b-icon icon="chat-fill"></b-icon>
          </button>
        </div> -->
      </div>
      <!-- <hr /> -->
    </div>

    <div v-show="!trainers.length" class="text-center round-corner py-4">
      <h3 class="u-title-font">
        No search results for :
        <span class="text-primary">{{ query }}</span>
      </h3>
      <p class="text-secondary">
        No trainers match this name, try searching with another name.
      </p>
    </div>
  </b-modal>
</template>

<script>
export default {
  created() {
    this.getTrainers(this.query);
  },

  data() {
    return {
      query: "",
      trainers: [],
    };
  },

  methods: {
    async getTrainers(query) {
      try {
        const response = await this.axios.get(`trainers?q=${query}`);
        const trainers = response.data.trainers;
        this.trainers = trainers;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-search-trainer__trainer-image img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.c-search-trainer__trainer-card {
  border-radius: $border-radius;
  transition: all 0.3s;
  cursor: pointer;
}

.c-search-trainer__trainer-card:hover {
  background: #eee;
}
</style>