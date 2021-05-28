<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Navbar: () => import("@/components/Navbar.vue"),
  },
};
</script>
