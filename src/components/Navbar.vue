<template>
  <div class="shadow-sm">
    <div
      class="container d-flex align-items-center justify-content-between py-3"
    >
      <div class="logo">
        <h2>Fit<span class="text-primary">Nation</span></h2>
      </div>

      <nav>
        <a href="#" class="navItem">Home</a>
        <a href="#" class="navItem">Workout Plans</a>
        <a href="#" class="navItem">Meals</a>
        <a href="#" class="navItem">Exercises</a>
        <a href="#" class="navItem btn btn-primary">Login</a>
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
  text-decoration: none;
}
</style>
