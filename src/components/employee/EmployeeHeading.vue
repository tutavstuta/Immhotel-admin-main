<script>
export default {
    props:{
        employee:{
            type:Number
        }
    }
}
</script>
<template>
    <div class="surface-section py-2">
    
      <div
        class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
      >
        <div>
          <div class="font-medium text-3xl text-900">จัดการพนักงาน</div>
          <div class="flex align-items-center text-700 flex-wrap">
            <div class="mr-5 flex align-items-center mt-3">
              <i class="pi pi-users mr-2"></i>
              <span>{{employee}} Active Users</span>
            </div>
          </div>
        </div>
        <div class="mt-3 lg:mt-0">
          <Button
            label="เพิ่ม"
            class="mr-2"
            icon="pi pi-user-plus"
          ></Button>
        
        </div>
      </div>
    </div>
  </template>
  