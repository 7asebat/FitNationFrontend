<template>
  <div class="shadow-sm">
    <div
      class="container d-flex align-items-center justify-content-between py-3"
    >
      <router-link class="logo" :to="{ name: 'Index' }">
        <h2 class="text-dark">Fit<span class="text-primary">Nation</span></h2>
      </router-link>

      <nav class="d-none d-lg-block">
        <router-link :to="{ name: 'Index' }" class="navItem">
          Home
        </router-link>

        <router-link :to="{ name: 'Workouts' }" class="navItem">
          Workout Plans
        </router-link>

        <router-link :to="{ name: 'Meals' }" class="navItem">
          Meals
        </router-link>

        <router-link :to="{ name: 'Exercises' }" class="navItem">
          Exercises
        </router-link>

        <router-link :to="{ name: 'Profile' }" class="navItem">
          Profile
        </router-link>

        <router-link
          :to="{ name: 'ListPanel', params: { type: 'nutritionist' } }"
          class="navItem"
        >
          Search
        </router-link>

        <div class="d-inline-block" v-if="!loggedInUser">
          <router-link
            :to="{ name: 'Login' }"
            class="navItem btn btn-outline-primary text-primary"
          >
            Login
          </router-link>

          <router-link
            :to="{ name: 'Register' }"
            class="navItem btn btn-primary text-light"
          >
            Register
          </router-link>
        </div>

        <b-dropdown v-else class="ml-3 c-navbar__user_dropdown">
          <template #button-content class="hamadas">
            Hi, <span class="text-primary">{{ loggedInUser.name }}</span>
          </template>
          <b-dropdown-item :to="{ name: 'ProfileOverview' }">
            <i class="fas fa-user"></i>
            <span class="ml-2">Profile</span>
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="ml-2">Logout</span>
          </b-dropdown-item>
        </b-dropdown>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Index" });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo * {
  font-family: "Bebas Neue", cursive;
}
.navItem {
  display: inline-block;
  margin-left: 16px;
  color: $dark !important;
  text-decoration: none;
}
</style>
