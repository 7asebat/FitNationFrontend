<template>
  <div class="c-query-card">
    <router-link :to="link">
      <b-card no-body class="overflow-hidden text-left my-4" :title="title">
        <b-row no-gutters cols-sm="2" cols="1" class="flex-wrap">
          <b-col sm="3" xs="6" align="center">
            <b-img fluid class="rounded-0" :src="getImgSrc(imgSrc)" />
          </b-col>
          <b-col>
            <b-card-body class="c-query-link" :title="title">
              <b-card-text> {{ text }} </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "QueryCard",

  props: {
    title: String,
    text: String,
    link: String,
    imgSrc: String,
  },

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>

<style scoped lang="scss">
a {
  color: black;
  text-decoration: none !important;
}

a .c-query-link:hover {
  color: $primary !important;
  text-decoration: none !important;
}

// NOTE(Abdelrahman) Responsive image crop
.c-query-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius;
}
</style>
