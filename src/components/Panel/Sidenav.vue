<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      sidebar-class="panelSidebar"
      no-header
      :visible="true"
      :no-close-on-route-change="true"
      :width="'70px'"
    >
      <div>
        <nav class="mb-3">
          <b-nav vertical class="sidebarNav my-3">
            <router-link :to="{ name: 'PanelDashboard' }">
              <i class="fas fa-tachometer-alt"></i>
            </router-link>

            <router-link :to="{ name: 'PanelListClients' }">
              <i class="fas fa-users"></i>
            </router-link>

            <router-link :to="{ name: 'PanelListTrainers' }">
              <i class="fas fa-running"></i>
            </router-link>

            <router-link :to="{ name: 'PanelListNutritionists' }">
              <i class="fas fa-apple-alt"></i>
            </router-link>

            <router-link :to="{ name: 'PanelListFood' }">
              <i class="fas fa-apple-alt"></i>
            </router-link>

            <router-link :to="{ name: 'PanelListExercises' }">
              <i class="fas fa-apple-alt"></i>
            </router-link>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.panelSidebar {
  background: green !important;
}

.sidebarNav a {
  display: inline-block;
  text-align: center;

  width: 50px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;

  font-size: 18px;
  color: #fff;
  // background: green;
  border-radius: 50%;
  transition: all 0.3s;
}
.sidebarNav a:hover {
  text-decoration: none;
  color: #fff;
  background: $primary;
}
.sidebarNav a.router-link-exact-active {
  background: $primary;
  text-decoration: none;
  color: #fff;
}
.sidebarNav a span {
  margin-left: 15px;
  transition: opacity 0.3s;
}
// .tooltip.b-tooltip.bs-tooltip-right {
//   left: 55px !important;
// }
</style>
