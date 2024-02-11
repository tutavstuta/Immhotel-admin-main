<template>
  <div class="surface-section py-2">
    <div
      class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
    >
      <div>
        <div class="font-medium text-3xl text-900">Dashboard</div>
        <div class="flex align-items-center text-700 flex-wrap">
          <div class="mr-5 flex align-items-center mt-3">
            <i class="pi pi-users mr-2"></i>
            <span>332 Active Users</span>
          </div>
          <div class="mr-5 flex align-items-center mt-3">
            <i class="pi pi-globe mr-2"></i>
            <span>9402 Sessions</span>
          </div>
          <div class="flex align-items-center mt-3">
            <i class="pi pi-clock mr-2"></i>
            <span>2.32m Avg. Duration</span>
          </div>
        </div>
      </div>
      <div class="mt-3 lg:mt-0">
        <Button
          label="Add"
          class="p-button-outlined mr-2"
          icon="pi pi-user-plus"
        ></Button>
        <Button label="Save" icon="pi pi-check"></Button>
      </div>
    </div>
  </div>
</template>
