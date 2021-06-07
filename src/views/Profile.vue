<template>
  <div class="container-fluid d-flex flex-column">
    <ProfileHeader class="container" />
    <!-- TODO(Abdelrahman) DEBUG: Remove this-->
    <div
      class="container d-flex flex-column align-items-center py-2"
      id="debug"
    >
      <BreakpointDetector visible @change="breakpoint = $event" />
      <!-- <b-form-select
        class="w-75"
        v-model="type"
        :options="['client', 'trainer', 'nutritionist']"
      /> -->
    </div>

    <div class="d-flex flex-row flex-wrap w-100 p-xl-3 p-lg-1 px-3">
      <div class="col-xl-2 py-1 c-nav-tabs rounded border">
        <b-nav card-header justified pills :vertical="breakpoint === 'xl'">
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
      </div>

      <div
        class="col-xl-10 col-lg-12"
        :class="{
          'px-2': breakpoint === 'xl',
          'px-0': breakpoint !== 'xl',
          'py-0': breakpoint === 'xl',
          'py-2': breakpoint !== 'xl',
        }"
      >
        <b-card no-body class="p-3">
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
    type: "client",
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
      ],
      trainer: [
        {
          name: "Correspondence",
          title: "Correspondence",
          icon: "fa-envelope",
          link: "/profile/correspondence",
        },
      ],
      nutritionist: [],
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

    // TODO(Abdelrahman) Move this into vuex
    BreakpointDetector: () => import("@/components/BreakpointDetector"),
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
</style>
