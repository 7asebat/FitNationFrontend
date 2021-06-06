<template>
  <div class="container-fluid d-flex flex-column">
    <ProfileHeader class="container" />
    <!-- TODO(Abdelrahman) DEBUG: Remove this-->
    <b-form-select
      v-model="type"
      class="container mt-5"
      :options="['client', 'trainer', 'nutritionist']"
    />

    <div class="d-flex flex-row flex-wrap w-100 p-5 mx-5">
      <!-- TODO(Abdelrahman) Make this responsive-->
      <b-nav card pills vertical>
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
    type: "client",
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
  },

  methods: {
    getImgSrc(imageName) {
      var images = require.context("../assets/images", true);
      return images("./" + imageName);
    },
  },
};
</script>
