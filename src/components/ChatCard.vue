<template>
  <div id="root" class="container-fluid">
    <b-row
      v-for="(text, i) in textsSorted"
      :key="i"
      :align-h="alignment[text.type]"
    >
      <b-alert
        show
        :variant="variant[text.type]"
        :class="`c-text ${textAlignment[text.type]}`"
      >
        {{ text.text }} <br />
        <span class="c-text-time">{{
          text.date.toTimeString().slice(0, 5)
        }}</span>
      </b-alert>
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
      incoming: "primary",
      outgoing: "dark",
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
  min-width: 600px !important;
}

.c-text-time {
  font-size: 12px;
}
</style>
