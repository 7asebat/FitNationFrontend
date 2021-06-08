<template>
  <div class="bg-light panelView">
    <Sidenav />
    <main>
      <Navbar />
      <!-- <b-container> -->

      <div class="panelContainer">
        <b-container>
          <router-view></router-view>
        </b-container>
      </div>
      <!-- </b-container> -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpened: false,
      newOrders: [],
    };
  },

  components: {
    Navbar: () => import("@/components/Panel/Navbar"),
    Sidenav: () => import("@/components/Panel/Sidenav.vue"),
  },
};
</script>

<style lang="scss">
.panelView {
  min-height: 100vh;
}

main {
  margin-left: 70px;
  transition: all 0.3s;
}

.panelContainer {
  padding: 50px 0px;
}
.panelNavbar {
  padding: 0px 50px;

  .d-flex {
    align-items: center;
  }

  i {
    font-size: 25px;
    margin-right: 15px;
  }
}
</style>
