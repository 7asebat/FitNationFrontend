<template>
  <div class="container-fluid">
    <b-tabs pills card>
      <b-tab
        v-for="(date, d) in correspondenceInfoSorted"
        :key="d"
        :title="`${dateToString(date.date)}`"
        class="p-0"
      >
        <b-table
          :items="date.messages"
          :fields="fields"
          head-variant="dark"
          striped
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "Correspondence",

  data: () => ({
    fields: [{ key: "from" }, { key: "text", label: "" }],
    correspondenceInfo: [
      {
        date: new Date("2021-06-03"),
        messages: [
          {
            from: "Chris Bumstead",
            text: "Good job! Keep up the good work!",
          },
          {
            from: "Big Ramy",
            text: "In response to the message you sent, you should fit your carbohydrate intake around your meal times",
          },
        ],
      },
    ],
  }),
  methods: {
    dateToString(date) {
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },
  },
  computed: {
    correspondenceInfoSorted() {
      const sorted = this.correspondenceInfo.slice();
      return sorted.sort((a, b) => b.date - a.date);
    },
  },
};
</script>

<style lang="scss">
.c-weight {
  //width: 100px !important;
}
</style>
