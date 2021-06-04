<template>
  <div class="row c-image-text py-5">
    <div
      class="col-md-12 col-lg-6"
      :class="{ 'order-2': imagePosition === 'left' }"
    >
      <div class="d-flex h-100 flex-column justify-content-center mb-3">
        <h1 class="c-image-text-title">{{ title }}</h1>
        <p class="text-secondary">{{ description }}</p>
        <div class="c-image-text-actions">
          <router-link
            class="btn"
            :class="'btn-' + theme"
            :to="{ name: primaryButtonRoute }"
          >
            {{ primaryButtonText }}
          </router-link>
          <a href="#" class="btn">{{ secondaryButtonText }}</a>
        </div>
      </div>
    </div>

    <div
      class="col-md-12 col-lg-6"
      :class="{ 'order-1': imagePosition === 'left' }"
    >
      <img :src="getImgSrc(imgSrc)" alt="" class="w-100" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    primaryButtonText: String,
    primaryButtonRoute: String,
    secondaryButtonText: String,
    imgSrc: String,
    imagePosition: {
      default: "right",
      type: String,
    },
    theme: {
      default: "primary",
    },
  },

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>

<style lang="scss" scoped>
.c-image-text {
  max-height: 800px;
}

.c-image-text-title {
  font-family: "Bebas Neue", cursive;
}
</style>
