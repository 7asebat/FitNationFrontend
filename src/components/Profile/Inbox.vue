<template>
  <div class="container py-4">
    <b-card no-body class="rounded bg-light">
      <div id="inbox-compact">
        <div v-if="contactIdx === null" class="col bg-light rounded px-0">
          <div
            v-for="(contact, i) in contacts"
            :key="i"
            class="p-4 d-flex flex-row justify-content-between border-bottom"
          >
            <div>{{ contact }}</div>
            <div
              class="btn rounded-circle bg-primary text-light c-square"
              @click="viewContact(i)"
            >
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="col p-4" v-else>
          <div class="row">
            <div
              class="btn rounded-circle text-primary c-square"
              @click="contactIdx = null"
            >
              <i class="fas fa-arrow-left"></i>
            </div>
            <div class="my-auto c-contact-name">
              {{ inbox[contactIdx].name }}
            </div>
          </div>
          <ChatCard :texts="inbox[contactIdx].messages" class="p-2" />

          <b-input-group class="mx-auto">
            <template #append>
              <b-input-group-text
                class="c-send-icon border-left-0 pr-3"
                @click="sendText"
              >
                <i class="fas fa-paper-plane" />
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="message"
              class="border-right-0 text-right"
              @keyup.enter="sendText"
            />
          </b-input-group>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Inbox",

  async created() {
    await this.getInbox();
  },

  components: {
    ChatCard: () => import("@/components/ChatCard"),
  },

  data: () => ({
    breakpoint: "",
    message: "",
    contactIdx: null,
    inbox: [],
  }),

  computed: {
    contacts() {
      return this.inbox.map((withWho) => withWho.name);
    },
  },

  methods: {
    viewContact(i) {
      this.contactIdx = i;
      this.$router.push("#chat-card-root");
    },

    async getMessages(id) {
      const response = await this.axios.get(`messaging/conversations/${id}`);
      return response.data.messages;
    },

    async mapConversations(conversations) {
      const mapped = conversations.map(async (conv) => {
        conv.messages = await this.getMessages(conv.id);
        return conv;
      });

      return await Promise.all(mapped);
    },

    async getInbox() {
      const response = await this.axios.get("messaging/conversations");
      const conversations = response.data.conversations;
      this.inbox = await this.mapConversations(conversations);
    },

    dateToString(date) {
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },

    async sendText() {
      if (this.message === "") return;

      try {
        const response = await this.axios.post(
          `messaging/conversations/${this.inbox[this.contactIdx].id}`,
          { body: this.message }
        );
        const message = response.data.message;
        this.inbox[this.contactIdx].messages.unshift(message);
        this.message = "";
      } catch (err) {
        this.$errorsHandler(err);
      }
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
</style>
