<template>
  <div class="container-fluid d-flex flex-column">
    <div class="d-flex justify-content-center">
      <img
        :src="getImgSrc(imgSrc)"
        alt=""
        class="img rounded-circle c-profile-image my-4"
      />
    </div>

    <div class="d-flex flex-row flex-wrap w-100 px-5 mx-5">
      <!-- TODO(Abdelrahman) Make this responsive-->
      <b-nav pills vertical class>
        <b-nav-item
          v-for="(tab, i) in tabs[type]"
          :key="i"
          :to="tab.link"
          :active="$route.name === tab.name"
          class="my-1"
        >
          <i :class="`fas ${tab.icon}`"></i>
          {{ tab.title }}
        </b-nav-item>
      </b-nav>

      <div class="col-10">
        <b-card no-body>
          <router-view class="px-0" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "Profile",
    type: "trainer",
    tabs: {
      client: [
        {
          name: "ProfileOverview",
          title: "Overview",
          icon: "fa-home",
          link: "/profile/overview",
        },
        {
          name: "NutritionInfo",
          title: "Nutrition & Weight",
          icon: "fa-weight",
          link: "/profile/nutrition-info",
        },
        {
          name: "WorkoutPerformance",
          title: "Workout Performance",
          icon: "fa-dumbbell",
          link: "/profile/workout-performance",
        },
      ],
      trainer: [
        {
          name: "ProfileOverview",
          title: "Overview",
          icon: "fa-home",
          link: "/profile/overview",
        },
        {
          name: "Correspondence",
          title: "Correspondence",
          icon: "fa-envelope",
          link: "/profile/correspondence",
        },
      ],
    },
    imgSrc: "buildBulk.png",
  }),

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>

<style scoped lang="scss">
.c-profile-image {
  width: 200px !important;
}
</style>
