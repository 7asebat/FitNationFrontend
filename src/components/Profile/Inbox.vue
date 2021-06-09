<template>
  <div class="container py-4">
    <b-card no-body class="rounded overflow-hidden">
      <div class="row c-inbox__container">
        <div
          class="c-inbox__users col-12 col-lg-4 d-lg-block"
          :class="{
            'd-none': selectedConversation,
            'd-block': !selectedConversation,
          }"
        >
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
              <div v-if="!conversations.length" class="py-5 px-3 text-center">
                <h1 class="u-title-font">No conversations</h1>
                <p>
                  You can start a conversation with a trainer from the compose
                  button above
                </p>
              </div>

              <div
                v-for="contact in conversations"
                :key="contact.id"
                class="p-3 d-flex flex-row border-bottom c-inbox__user"
                @click.prevent="selectedConversation = contact"
                :class="{
                  'bg-primary':
                    selectedConversation &&
                    selectedConversation.id === contact.id,
                }"
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
                  :class="{
                    'text-light':
                      selectedConversation &&
                      selectedConversation.id === contact.id,
                  }"
                >
                  <h3 class="u-title-font mb-0">{{ contact.name }}</h3>
                  <p class="m-0">{{ contact.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-inbox__chats col-lg-8 col-12 bg-white h-100">
          <div v-if="selectedConversation">
            <div
              class="d-flex align-items-center p-3 bg-light d-block d-lg-none"
            >
              <div @click.prevent="selectedConversation = null">
                <i
                  class="fas fa-chevron-left h4 text-primary c-inbox__back-btn"
                ></i>
              </div>
              <h3 class="u-title-font ml-4">
                {{ selectedConversation.name }}
              </h3>
            </div>

            <div class="p-4 h-100">
              <ChatCard :chatId="selectedConversation.id" />
            </div>
          </div>

          <div v-else class="text-center py-5 d-none d-lg-block">
            <h1 class="u-title-font">No conversation selected</h1>
            <p class="text-secondary">
              Choose a conversation from the left menu to see the messages.
            </p>
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
    selectedConversation: undefined,
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

      this.selectedConversation = trainer;
    },

    async getConversations() {
      try {
        const response = await this.axios.get("messaging/conversations");
        const conversations = response.data.conversations;

        if (conversations.length) this.selectedConversation = conversations[0];
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

.c-inbox__back-btn {
  cursor: pointer;
}
</style>
