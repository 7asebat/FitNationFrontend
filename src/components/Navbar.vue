<template>
  <div class="shadow-sm">
    <div
      class="container d-flex align-items-center justify-content-between py-3"
    >
      <router-link class="logo" :to="{ name: 'Index' }">
        <h2 class="text-dark">Fit<span class="text-primary">Nation</span></h2>
      </router-link>

      <nav class="d-none d-lg-block">
        <router-link :to="{ name: 'Index' }" class="navItem u-title-font">
          Home
        </router-link>

        <router-link :to="{ name: 'Workouts' }" class="navItem u-title-font">
          Workout Plans
        </router-link>

        <router-link :to="{ name: 'Meals' }" class="navItem u-title-font">
          Meals
        </router-link>

        <router-link :to="{ name: 'Exercises' }" class="navItem u-title-font">
          Exercises
        </router-link>

        <router-link :to="{ name: 'Profile' }" class="navItem u-title-font">
          Profile
        </router-link>

        <router-link
          :to="{ name: 'ListPanel', params: { type: 'nutritionist' } }"
          class="navItem u-title-font"
        >
          Search
        </router-link>

        <div class="d-inline-block" v-if="!loggedInUser">
          <router-link
            :to="{ name: 'Login' }"
            class="navBtn px-3 btn btn-outline-primary u-title-font"
          >
            Login
          </router-link>

          <router-link
            :to="{ name: 'Register' }"
            class="navBtn px-3 btn btn-primary u-title-font"
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
  color: $dark;
  text-decoration: none;
  font-size: 20px;
}
.navItem.router-link-exact-active {
  color: $primary;
  border-bottom: 2px solid $primary;
}
.navBtn {
  margin-left: 16px;
  font-size: 20px;
}
</style>
