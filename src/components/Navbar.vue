<template>
  <div class="shadow-sm bg-light">
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

        <router-link :to="{ name: 'Recipes' }" class="navItem u-title-font">
          Recipes
        </router-link>

        <router-link :to="{ name: 'Exercises' }" class="navItem u-title-font">
          Exercises
        </router-link>

        <router-link :to="{ name: 'About' }" class="navItem u-title-font">
          About
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

        <div v-else class="d-inline-block">
          <b-dropdown class="ml-3 c-navbar__user_dropdown">
            <template #button-content>
              <h4 class="u-title-font d-inline mr-3">
                Hi, <span class="text-primary">{{ loggedInUser.name }}</span>
              </h4>
            </template>
            <b-dropdown-item :to="{ name: 'Profile' }">
              <i class="fas fa-user"></i>
              <span class="ml-2">Profile</span>
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span class="ml-2">Logout</span>
            </b-dropdown-item>
          </b-dropdown>

          <router-link :to="{ name: 'Inbox' }">
            <div
              class="
                d-inline-block
                rounded-circle
                border border-dark
                c-square-div
              "
            >
              <i class="fas fa-envelope mx-auto"></i>
            </div>
          </router-link>
        </div>
      </nav>

      <div class="d-block d-lg-none">
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto u-title-font">
            <b-nav-item :to="{ name: 'Index' }" class="navItem"
              >Home</b-nav-item
            >
            <b-nav-item :to="{ name: 'Workouts' }" class="navItem"
              >Plans</b-nav-item
            >
            <b-nav-item :to="{ name: 'Recipes' }" class="navItem"
              >Recipes</b-nav-item
            >
            <b-nav-item :to="{ name: 'Exercises' }" class="navItem"
              >Exercises</b-nav-item
            >
            <b-nav-item :to="{ name: 'Profile' }" class="navItem"
              >Profile</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'ListPanel', params: { type: 'nutritionist' } }"
              class="navItem"
            >
              Search
            </b-nav-item>
            <b-nav-item :to="{ name: 'Login' }" class="navItem"
              >Login</b-nav-item
            >
            <b-nav-item :to="{ name: 'Register' }" class="navItem">
              Register
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
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
.c-square-div {
  height: 35px;
  width: 35px;
  text-align: center;
  line-height: 35px;
  color: $dark;
}

.c-square-div:hover {
  color: $primary;
}

.logo * {
  font-family: "Bebas Neue", cursive;
}
.navItem {
  display: inline-block;
  margin-left: 16px;
  text-decoration: none;
  color: $dark;
  font-size: 20px;
}
.navItem * {
  color: $dark;
  font-size: 20px;
}
.navItem.router-link-exact-active,
.navItem .router-link-exact-active {
  color: $primary;
  border-bottom: 2px solid $primary;
}
.navBtn {
  margin-left: 16px;
  font-size: 20px;
}
</style>
