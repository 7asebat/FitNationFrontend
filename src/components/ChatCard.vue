<template>
  <div id="root" class="container-fluid">
    <b-row
      v-for="(text, i) in textsSorted"
      :key="i"
      :align-h="alignment[text.type]"
    >
      <div
        class="c-text alert"
        :class="`${textAlignment[text.type]} ${variant[text.type]}`"
      >
        {{ text.text }} <br />
        <span class="c-text-time">
          {{ text.date.toTimeString().slice(0, 5) }}
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
    alignment: {
      incoming: "start",
      outgoing: "end",
    },
    textAlignment: {
      incoming: "text-left",
      outgoing: "text-right",
    },
    variant: {
      incoming: "alert-primary",
      outgoing: "alert-dark",
    },
  }),

  computed: {
    textsSorted() {
      const sorted = this.texts.slice();
      return sorted.sort((a, b) => a.date - b.date);
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
