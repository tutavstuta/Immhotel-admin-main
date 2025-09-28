<template>
    <div>
        <BreadcrumbDashboard />
        <div class="font-medium text-3xl text-900">การชำระเงิน</div>
    </div>
    <div>
        <PayIn />
    </div>
</template>
<script>
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import PayIn from '@/components/payin/PayIn.vue';
export default {
    components: {
        BreadcrumbDashboard,
        PayIn
    },
    setup() {

    }
}
</script>