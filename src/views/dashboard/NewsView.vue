<template>
    <div>
        <BreadcrumbDashboard />
        <div class="surface-section py-2">
          <div
             class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                <div>
                    <div class="font-medium text-3xl text-900">News</div>
                    <div class="flex align-items-center text-700 flex-wrap">
                        <div class="mr-5 flex align-items-center mt-3">
                            <i class="pi pi-gift mr-2"></i>
                            <span>รายการ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- body -->
        <NewsData />
        <!-- end body -->
    </div>
</template>

<script>
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import NewsData from "@/components/NewsData.vue";


export default {
    components:{
        BreadcrumbDashboard,
        NewsData
    }
}
</script>