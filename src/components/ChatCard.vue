<template>
  <div
    id="chat-card-root"
    class="d-flex flex-column flex-column-reverse container-fluid c-chat-card"
  >
    <b-row v-for="(text, i) in texts" :key="i" :align-h="alignment[role(text)]">
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
</template>

<script>
export default {
  name: "ChatCard",
  props: {
    texts: Array,
  },

  data: () => ({
    alignment: ["start", "end"],
    textAlignment: ["text-left", "text-right"],
    variant: ["alert-primary", "alert-dark"],
  }),

  methods: {
    timestamp(text) {
      const date = new Date(text.created_at);
      return date.toTimeString().slice(0, 5);
    },

    role(text) {
      return this.$store.state.user.role === text.sent_by ? 1 : 0;
    },
  },
};
</script>

<style scoped lang="scss">
.c-chat-card {
  max-height: 700px;
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
