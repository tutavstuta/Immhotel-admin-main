<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="dashboard">
        <div class='sidebar'>
          <Sidebar/>
        </div>
        <div class="content">
          <PageHeading/>
          <DashboardCard/>
          <!-- Dashboard content -->
          <DashboardGraph />
          <DashboardTable/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue'; 
import PageHeading from '@/components/PageHeading.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import DashboardGraph from '@/components/DashboardGraph.vue';
import DashboardTable from '@/components/DashboardTable.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    PageHeading,
    DashboardCard,
    DashboardGraph,
    DashboardTable
  }
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
