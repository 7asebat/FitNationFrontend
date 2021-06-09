<template>
  <div class="d-flex flex-column justify-content-end h-100">
    <div
      id="chat-card-root"
      class="d-flex flex-column flex-column-reverse container-fluid c-chat-card"
    >
      <b-row
        v-for="(text, i) in texts"
        :key="i"
        :align-h="alignment[role(text)]"
      >
        <div
          class="c-text alert"
          :class="`${textAlignment[role(text)]} ${variant[role(text)]}`"
        >
          {{ text.body }} <br />
          <span class="c-text-time">
            <!-- HH:MM -->
            {{ timestamp(text) }}
          </span>
        </div>
      </b-row>
    </div>

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
</template>

<script>
export default {
  created() {
    this.getMessages(this.chatId);
  },

  name: "ChatCard",
  props: {
    chatId: [String, Number],
  },

  data: () => ({
    message: "",
    texts: [],
    alignment: ["start", "end"],
    textAlignment: ["text-left", "text-right"],
    variant: ["alert-primary", "alert-dark"],
  }),

  methods: {
    async sendText() {
      if (this.message === "") return;

      try {
        const response = await this.axios.post(
          `messaging/conversations/${this.chatId}`,
          { body: this.message }
        );
        const message = response.data.message;
        this.texts.unshift(message);
        this.message = "";
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    async getMessages(id) {
      const response = await this.axios.get(`messaging/conversations/${id}`);
      this.texts = response.data.messages;
    },

    timestamp(text) {
      const date = new Date(text.created_at);
      return date.toTimeString().slice(0, 5);
    },

    role(text) {
      return this.$store.state.user.role === text.sent_by ? 1 : 0;
    },
  },

  watch: {
    chatId(newValue) {
      this.getMessages(newValue);
    },
  },
};
</script>

<style scoped lang="scss">
.c-chat-card {
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.c-chat-card::-webkit-scrollbar {
}

.c-text {
  min-width: 60% !important;
  max-width: 90%;
}

.c-text-time {
  font-size: 12px;
}
</style>
