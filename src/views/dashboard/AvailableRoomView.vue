<template>
     <div>
    <BreadcrumbDashboard />
  </div>
    <div>
        <AvailableRoomTable/>
    </div>
</template>
<script>
import AvailableRoomTable from "@/components/room/AvailableRoomTable.vue"
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";

export default {
    components: {
        AvailableRoomTable,
        BreadcrumbDashboard
    },
    setup() {

    }
}
</script>