<template>
  <div class="container-fluid d-flex flex-column">
    <ProfileHeader class="container" />

    <div class="container">
      <div class="text-center">
        <router-link
          :to="{ name: 'ProfileOverview' }"
          class="mr-3 u-title-font profile-tab-head mb-2"
          >Overview</router-link
        >
        <router-link
          :to="{ name: 'NutritionInfo' }"
          class="mr-3 u-title-font profile-tab-head mb-2"
          >Nutrition</router-link
        >
        <router-link
          :to="{ name: 'WorkoutPerformance' }"
          class="mr-3 u-title-font profile-tab-head mb-2"
          >Workout Performance</router-link
        >

        <router-link
          :to="{ name: 'MyWorkoutPlans' }"
          class="mr-3 u-title-font profile-tab-head mb-2"
          >My Workout Plans</router-link
        >
      </div>

      <router-view class="mt-5" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "Profile",
    breakpoint: "",

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
        {
          name: "Correspondence",
          title: "Correspondence",
          icon: "fa-envelope",
          link: "/profile/correspondence",
        },
        {
          name: "MyWorkoutPlans",
          title: "My Workout Plans",
          icon: "fa-envelope",
          link: "/profile/my-workout-plans",
        },
      ],
      trainer: [
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
    type() {
      return this.loggedInUser.role;
    },

    loggedInUser() {
      return this.$store.state.user;
    },
  },

  components: {
    ProfileHeader: () => import("@/components/Profile/ProfileHeader"),

    // TODO(Abdelrahman) Move this into vuex
    // BreakpointDetector: () => import("@/components/BreakpointDetector"),
  },

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>

<style lang="scss">
.c-nav-tabs {
  background-color: #f7f7f7 !important;
}
.profile-tab-head {
  font-size: 25px;
  color: $dark;
}
.profile-tab-head:hover {
  text-decoration: none;
}
.profile-tab-head.router-link-exact-active {
  color: $primary;
  border-bottom: 2px solid $primary;
}
</style>
