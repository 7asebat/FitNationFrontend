<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs pills card>
        <b-tab
          v-for="(day, d) in correspondenceInfoSorted"
          :key="d"
          :title="`${dateToString(day.date)}`"
          class="p-0"
        >
          <b-card no-body class="rounded-0">
            <b-tabs pills card vertical>
              <b-tab
                v-for="(withWho, i) in day.texts"
                :key="i"
                :title="withWho.with"
                class="rounded-0"
              >
                <ChatCard
                  :with="withWho.with"
                  :texts="withWho.texts"
                  class="p-2"
                />
              </b-tab>
            </b-tabs>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Correspondence",

  components: {
    ChatCard: () => import("@/components/ChatCard.vue"),
  },

  data: () => ({
    fields: [{ key: "from" }, { key: "text", label: "" }],
    correspondenceInfo: [
      {
        date: new Date("2021-06-04"),
        texts: [
          {
            with: "Abdelrahman Farid",
            texts: [
              {
                date: new Date("2021-06-04T12:34:00"),
                type: "incoming",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis ducimus enim labore non, placeat rerum. Commodi dignissimos ducimus id iusto numquam officia sunt totam unde. Animi natus quae quis?",
              },
              {
                date: new Date("2021-06-04T12:35:00"),

                type: "outgoing",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis ducimus enim labore non, placeat rerum. Commodi dignissimos ducimus id iusto numquam officia sunt totam unde. Animi natus quae quis?",
              },
            ],
          },
          {
            with: "Khaled Abdelrahman",
            texts: [
              {
                date: new Date("2021-06-04T12:34:00"),
                type: "incoming",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis ducimus enim labore non, placeat rerum. Commodi dignissimos ducimus id iusto numquam officia sunt totam unde. Animi natus quae quis?",
              },
            ],
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
