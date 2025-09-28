<script>
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import PageHeading from "@/components/PageHeading.vue";
import DashboardCard from "@/components/DashboardCard.vue";
import DashboardGraph from "@/components/DashboardGraph.vue";
import DashboardTable from "@/components/DashboardTable.vue";

export default {
    components:{
        PageHeading,
        DashboardCard,
        DashboardGraph,
        DashboardTable,
        BreadcrumbDashboard

    }
}
</script>


<template>
  <BreadcrumbDashboard/>
  <PageHeading />
  <DashboardCard />
  <!-- Dashboard content -->
  <!-- <DashboardGraph /> -->
  <h3>การจองใหม่</h3>
  <DashboardTable />
</template>
