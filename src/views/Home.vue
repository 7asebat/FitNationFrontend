<template>
  <div class="home d-flex flex-column">
    <Navbar />
    <router-view></router-view>
    <Footer class="mt-auto" />
  </div>
</template>


<script>
export default {
  components: {
    Navbar: () => import("@/components/Navbar"),
    Footer: () => import("@/components/Footer"),
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}
</style>
