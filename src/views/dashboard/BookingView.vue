<template>
     <div>
    <BreadcrumbDashboard />
  </div>
    <div>
        <BookingTable />
    </div>
</template>
<script>
import BookingTable from '@/components/booking/BookingTable.vue';
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";

export default {
    components: {
        BookingTable,
        BreadcrumbDashboard
    },
    setup() {

    }
}
</script>