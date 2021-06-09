<template>
  <div class="container py-4">
    <b-card no-body class="rounded overflow-hidden">
      <div class="row c-inbox__container">
        <div class="c-inbox__users col-4">
          <div class="bg-light h-100">
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                px-4
                pt-3
                pb-0
              "
            >
              <h1 class="u-title-font m-0">Inbox</h1>

              <div v-b-modal="'c-search-trainers-modal'">
                <i class="fas fa-edit h5"></i>
              </div>
            </div>
            <hr />
            <div class="c-inbox__users-container">
              <div
                v-for="contact in conversations"
                :key="contact.id"
                class="p-3 d-flex flex-row border-bottom c-inbox__user"
                @click.prevent="contactIdx = contact.id"
                :class="{ 'bg-primary': contactIdx === contact.id }"
              >
                <div class="c-inbox__contact-image">
                  <img
                    v-if="contact.avatar"
                    :src="contact.avatar"
                    :alt="contact.name"
                  />
                  <img
                    v-else
                    src="@/assets/images/defaultUser.png"
                    :alt="contact.name"
                  />
                </div>

                <div
                  class="ml-3"
                  :class="{ 'text-light': contactIdx === contact.id }"
                >
                  <h3 class="u-title-font mb-0">{{ contact.name }}</h3>
                  <p class="m-0">{{ contact.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-inbox__chats col-8 bg-white h-100">
          <div class="p-4 h-100">
            <ChatCard :chatId="contactIdx" />
          </div>
        </div>
      </div>
    </b-card>

    <SearchTrainersModal @newChat="newChat" />
  </div>
</template>

<script>
export default {
  name: "Inbox",

  created() {
    this.getConversations();
  },

  components: {
    ChatCard: () => import("@/components/ChatCard"),
    SearchTrainersModal: () => import("@/components/common/SearchTrainers"),
  },

  data: () => ({
    breakpoint: "",
    message: "",
    contactIdx: null,
    inbox: [],
    conversations: [],
  }),

  computed: {
    contacts() {
      return [];
    },
  },

  methods: {
    newChat(trainer) {
      if (!this.conversations.find((conv) => conv.id == trainer.id))
        this.conversations.unshift(trainer);

      this.contactIdx = trainer.id;
    },

    async getConversations() {
      try {
        const response = await this.axios.get("messaging/conversations");
        const conversations = response.data.conversations;

        if (conversations.length) this.contactIdx = conversations[0].id;
        this.conversations = conversations;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    dateToString(date) {
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },
  },
};
</script>

<style scoped lang="scss">
.c-contact-name {
  font-size: larger;
}

.c-square {
  height: 100%;
  width: auto;
}

#inbox-compact {
  overflow: hidden !important;
}

.c-send-icon {
  background-color: transparent;
}

.c-send-icon:hover {
  color: $primary;
}

.c-inbox__start-message {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}

.c-inbox__contact-image img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.c-inbox__user {
  cursor: pointer;
}
</style>
