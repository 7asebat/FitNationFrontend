<template>
  <div class="c-404 container text-center">
    <router-link
      class="logo d-inline-block u-title-font"
      :to="{ name: 'Index' }"
    >
      <h1 class="text-dark">Fit<span class="text-primary">Nation</span></h1>
    </router-link>

    <h1 class="mb-4"><i class="fas fa-bomb text-dark"></i></h1>
    <h1 class="u-title-font text-primary">Oops!</h1>
    <h2 class="u-title-font text-dark">Looks like you're lost</h2>
    <p class="text-secondary">
      We're sorry we couldn't find the page you're looking for.
    </p>

    <router-link :to="{ name: 'Index' }" class="btn btn-primary">
      Back to home page
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  margin-bottom: 100px;
}
.c-404 {
  padding: 150px 0;
}
</style>