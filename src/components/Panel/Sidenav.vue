<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      sidebar-class="panelSidebar"
      no-header
      :visible="true"
      :no-close-on-route-change="true"
      :width="sidebarOpened ? '250px' : '70px'"
    >
      <div>
        <nav class="mb-3">
          <b-nav vertical class="sidebarNav my-3">
            <router-link :to="{ name: 'PanelDashboard' }" class>
              <i class="fas fa-tachometer-alt"></i>
            </router-link>

            <router-link :to="{ name: 'PanelAdmins' }">
              <i class="fas fa-users-cog"></i>
            </router-link>

            <router-link :to="{ name: 'PanelEditors' }">
              <i class="fas fa-user-edit"></i>
            </router-link>

            <router-link :to="{ name: 'PanelUsers' }">
              <i class="fas fa-users"></i>
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
</style>
