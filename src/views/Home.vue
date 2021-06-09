<template>
  <div class="home">
    <Navbar />
    <router-view></router-view>
    <Footer class="mt-4" />
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
