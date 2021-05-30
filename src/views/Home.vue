<template>
  <div class="home">
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
