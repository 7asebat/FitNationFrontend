<template>
  <div class="shadow-sm">
    <div
      class="container d-flex align-items-center justify-content-between py-3"
    >
      <div class="logo">
        <h2>Fit<span class="text-primary">Nation</span></h2>
      </div>

      <nav>
        <router-link :to="{ name: 'Home' }" class="navItem"> Home </router-link>

        <router-link :to="{ name: 'Workouts' }" class="navItem">
          Workout Plans
        </router-link>

        <router-link :to="{ name: 'Meals' }" class="navItem">
          Meals
        </router-link>

        <router-link :to="{ name: 'Exercises' }" class="navItem">
          Exercises
        </router-link>

        <router-link :to="{ name: 'Exercises' }" class="navItem">
          Exercises
        </router-link>

        <a href="#" class="navItem btn btn-primary text-light">Login</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
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
}
</style>
