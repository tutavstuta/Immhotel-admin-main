<template>
    <div>
        <BreadcrumbDashboard/>
        <div class="surface-section py-2">
      <div
        class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
      >
        <div>
          <div class="font-medium text-3xl text-900">ห้องพัก</div>
          <div class="flex align-items-center text-700 flex-wrap">
            <div class="mr-5 flex align-items-center mt-3">
              <i class="pi pi-table mr-2"></i>
              <span>รายละเอียดห้อง</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RoomDataTable/>
        
    </div>
</template>

<script>
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import RoomDataTable from "@/components/RoomDataTable.vue";
export default {
    components:{

        BreadcrumbDashboard,
        RoomDataTable
    },
    data(){
        return {
            data:[]
        }
    }
    
}
</script>