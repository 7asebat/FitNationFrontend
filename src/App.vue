<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
    Navbar: () => import("@/components/Navbar"),
  },
};
</script>

<style lang="scss">
</style>
