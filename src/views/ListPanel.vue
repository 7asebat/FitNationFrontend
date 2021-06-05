<template>
  <div class="container-md">
    <b-col class="text-center align-items-center justify-content-center pt-5">
      <!-- TODO(Abdelrahman) DEBUG: Remove this-->
      <b-form-select
        v-model="type"
        class="w-25 my-3"
        :options="['trainer', 'nutritionist']"
      />
      <!-- <h1>Search {{ listTypes[$route.params.type] }}</h1>-->
      <h1>Search {{ listTypes[type] }}</h1>
      <b-input-group class="w-75 mx-auto my-5">
        <template #prepend>
          <b-input-group-text>
            <i class="fas fa-search mr-2" />
            <span>Search</span>
          </b-input-group-text>
        </template>
        <b-form-input v-model="query"></b-form-input>
      </b-input-group>
      <QueryCard
        v-for="(result, i) in searchResults"
        :key="i"
        :title="result.title"
        :text="result.text"
        :link="result.link"
        :imgSrc="result.imgSrc"
      />
    </b-col>
  </div>
</template>
<script>
export default {
  name: "ListPanel",
  components: {
    QueryCard: () => import("@/components/QueryCard.vue"),
  },

  data: () => ({
    // $route.params.type contains the subdomain of the search query
    query: "",
    type: "",
    listTypes: {
      trainer: "trainers",
      nutritionist: "nutritionists",
    },
  }),

  computed: {
    searchResults() {
      if (this.query)
        return [
          {
            title: "Chris Bumstead",
            text: "Classic Physique Mr. Olympia",
            link: "/",
            imgSrc: "buildBulk.png",
          },
          {
            title: "Big Ramy",
            text: "Open Men's Physique Mr. Olympia",
            link: "/",
            imgSrc: "beHealthy.png",
          },
        ];
      else return [];
    },
  },
};
</script>

<style scoped></style>
