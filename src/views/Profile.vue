<template>
  <div class="container-fluid d-flex flex-column">
    <div class="container">
      <ProfileHeader />
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
        <router-view class="px-0" />
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
      nutritionist: [
        {
          name: "ProfileOverview",
          title: "Overview",
          icon: "fa-home",
          link: "/profile/overview",
        },
      ],
    },
    imgSrc: "buildBulk.png",
  }),

  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },

  components: {
    ProfileHeader: () => import("@/components/Profile/ProfileHeader"),
  },

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>
