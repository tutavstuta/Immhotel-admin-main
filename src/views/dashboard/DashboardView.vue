<script>
import PageHeading from "@/components/PageHeading.vue";
import DashboardCard from "@/components/DashboardCard.vue";
import DashboardGraph from "@/components/DashboardGraph.vue";
import DashboardTable from "@/components/DashboardTable.vue";

export default {
    components:{
        PageHeading,
        DashboardCard,
        DashboardGraph,
        DashboardTable

    }
}
</script>


<template>
  <PageHeading />
  <DashboardCard />
  <!-- Dashboard content -->
  <DashboardGraph />
  <DashboardTable />
</template>
