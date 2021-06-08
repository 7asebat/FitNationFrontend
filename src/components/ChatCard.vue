<template>
  <div id="root" class="container-fluid">
    <b-row
      v-for="(text, i) in textsSorted"
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

  computed: {
    textsSorted() {
      let sorted = this.texts.slice();
      sorted = sorted.sort((a, b) => {
        const da = new Date(a.created_at);
        const db = new Date(b.created_at);
        return da - db;
      });

      return sorted;
    },
  },
};
</script>

<style scoped lang="scss">
.c-text {
  min-width: 60% !important;
}

.c-text-time {
  font-size: 12px;
}
</style>
