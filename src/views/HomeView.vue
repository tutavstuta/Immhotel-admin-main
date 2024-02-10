<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="dashboard">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="content">
          <!-- Dashboard content -->
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.dashboard {
  display: flex;
}

.content {
  flex: 1;
  padding-left: 20px;
}

@media (max-width: 767px) {
  .sidebar {
    display: none;
  }
}
</style>
