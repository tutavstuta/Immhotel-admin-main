<template>
  <div>
    <BreadcrumbDashboard/>
    <EmployeeHeading :employee="employees.length" />
  </div>
  <div class="card py-3">
    <DataTable
      :value="employees"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">ตารางรายชื่อ</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <Column field="index" header="ลำดับ" style="width: 25%">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="first_name" header="ชื่อ" style="width: 25%"></Column>
      <Column field="last_name" header="นามสกุล" style="width: 25%"></Column>
      <Column field="username" header="ชื่อผู้ใช้" style="width: 25%"></Column>
      <Column field="role" header="ตำแหน่ง" style="width: 25%"></Column>
      <Column header="จัดการ" style="width: 25%">
        <template #body="slotProps">
          <div class="card flex justify-content-center">

            <Button icon="pi pi-user-edit" severity="warning"></Button>
            <span class="px-2"> </span>
            <Button
              @click="confirm($event)"
              icon="pi pi-times"
              severity="danger"
            ></Button>
          </div>
        </template>
      </Column>
      <template #footer>
        จำนวนพนักงานทั้งหมด {{ employees ? employees.length : 0 }} คน.
      </template>
    </DataTable>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import UserService from "@/services/userservice";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import EmployeeHeading from "@/components/employee/EmployeeHeading.vue";
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";

export default {
  setup() {
    const userService = new UserService();
    return { userService };
  },
  components: {
    EmployeeHeading,
    BreadcrumbDashboard
  },
  data() {
    return {
      employees: null,
    };
  },
  mounted() {
    this.getEmployee();
  },
  methods: {
    async getEmployee() {
      await this.userService.getEmployee().then((result) => {
        if (result) {
          console.log(result);
          this.employees = result.data;
        }
      });
    },
    confirm() {
        console.log('confirm')
    this.$confirm.require({
      message: "ต้องการลบพนักงานใช่หรือไม่",
      header: "Danger Zone",
      icon: "pi pi-info-circle",
      rejectLabel: "ยกเลิก",
      acceptLabel: "ลบ",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-danger",
      accept: () => {
        this.$toast.add({
          severity: "info",
          summary: "ยืนยัน",
          detail: "ลบพนักงานสำเร็จ",
          life: 3000,
        });
      },
      reject: () => {
        this.$toast.add({
          severity: "error",
          summary: "ยกเลิกรายการ",
          detail: "คุณได้ทำการยกเลิกรายการ",
          life: 3000,
        });
      },
    });
  },
  },
  
};
</script>
