<template>
  <div>
    <BreadcrumbDashboard />
    <EmployeeHeading :employee="employees ? employees.length : 0" />
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
          <div>
            <Button
              label="เพิ่ม"
              class="ml-2"
              icon="pi pi-user-plus"
              @click="createDialog = true"
            ></Button>
          </div>
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
            <Button
              icon="pi pi-user-edit"
              severity="warning"
              @click="popEditDialog(slotProps.data._id)"
            ></Button>
            <span class="px-2"> </span>
            <Button
              @click="confirm($event, slotProps.data._id)"
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
    <!-- create dialog -->
    <Dialog
      v-model:visible="createDialog"
      modal
      header="สร้างผู้ใช้ไหม่"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">กรุณาใส่รายละเอียดผู้ใช้</span>
      <form>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="first-name" class="font-semibold w-6rem">ชื่อ</label>
          <InputText
            v-model="firstName"
            id="first-name"
            class="flex-auto"
            autocomplete="off"
            :invalid="firstName === '' ? true : false"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="last-name" class="font-semibold w-6rem">นามสกุล</label>
          <InputText
            v-model="lastName"
            id="last-name"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="username" class="font-semibold w-6rem">ชื่อผู้ใช้</label>
          <InputText
            v-model="username"
            id="username"
            class="flex-auto"
            autocomplete="off"
            :invalid="username === '' ? true : false"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="password" class="font-semibold w-6rem">รหัสผ่าน</label>

          <Password
            id="password"
            v-model="password"
            class="flex-auto"
            autocomplete="off"
            :feedback="false"
            :invalid="password === '' ? true : false"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="confirm-password" class="font-semibold w-6rem"
            >ยืนยันรหัส</label
          >

          <Password
            id="confirm-password"
            v-model="confirmPassword"
            class="flex-auto"
            autocomplete="off"
            :feedback="false"
            :invalid="confirmPassword === '' ? true : false"
          />
        </div>
        <div v-if="warningMessage">
          <Message severity="error" @close="warningMessage = ''">{{
            warningMessage
          }}</Message>
        </div>
        <div class="flex justify-content-end gap-2">
          <Button
            type="button"
            label="ยกเลิก"
            severity="secondary"
            @click="createDialog = false"
          ></Button>
          <Button type="button" label="บันทึก" @click="createEmployee"></Button>
        </div>
      </form>
    </Dialog>
    <!-- end create dialog -->
    <!-- edit dialog -->
    <Dialog
      v-model:visible="editDialog"
      modal
      header="แก้ไขข้อมูลพนักงาน"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5"
        >กรุณาใส่ข้อมูลที่ต้องการแก้ไข</span
      >
      <div class="flex align-items-center gap-3 mb-3">
        <label for="edit-firstanme" class="font-semibold w-6rem">ชื่อ</label>
        <InputText
          v-model="editFirstName"
          id="edit-firstanme"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="edit-lastname" class="font-semibold w-6rem">นามสกุล</label>
        <InputText
          v-model="editLastName"
          id="edit-lastname"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="editDialog = false"
        ></Button>
        <Button type="button" label="บันทึก" @click="editEmployee"></Button>
      </div>
    </Dialog>
    <!-- end edit dialog -->
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
    BreadcrumbDashboard,
  },
  data() {
    return {
      employees: null,
      firstName: null,
      lastName: null,
      username: null,
      password: null,
      confirmPassword: null,
      createDialog: false,
      editDialog: false,
      warningMessage: "",
      selectedId: "",
      editFirstName: "",
      editLastName: "",
      editId:""
    };
  },
  mounted() {
    this.getEmployee();
  },
  methods: {
    async getEmployee() {
      await this.userService.getEmployee().then((result) => {
        if (result?.message==="get all employee successfully") {
          this.employees = result.data;
        }else{
            this.$toast.add({
            severity: "error",
            summary: "ค้นหาข้อมูลพนักงานไม่สำเร็จ",
            detail: result?.message,
            life: 3000,
          });
        }
      });
    },
    confirm(e, id) {
      this.selectedId = id;
      this.$confirm.require({
        message: "ต้องการลบพนักงานใช่หรือไม่",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "ยกเลิก",
        acceptLabel: "ลบ",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          await this.deleteEmployee(this.selectedId);
          this.selectedId = "";
        },
        reject: () => {
        //   this.$toast.add({
        //     severity: "error",
        //     summary: "ยกเลิกรายการ",
        //     detail: "คุณได้ทำการยกเลิกรายการ",
        //     life: 3000,
        //   });
        },
      });
    },
    async createEmployee() {
      if (!this.firstName || !this.username || !this.password) {
        this.warningMessage = "กรุณาใส่ข้อมูลให้ครบถ้วน";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.warningMessage = "รหัสยืนยันไม่ถูกต้อง";
        return;
      }

      const employeeData = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
      };
      console.log(employeeData);
      await this.userService.createEmployee(employeeData).then((result) => {
        console.log(result);
        if (result?.message === "employee created") {
          this.getEmployee();
          this.createDialog = false;
        } else {
          this.warningMessage = result?.message;
        }
      });
    },
    async deleteEmployee(employeeId) {
      await this.userService.deleteEmployee(employeeId).then((result) => {
        if (result?.message === "delete successfully") {
          this.selectedId = "";
          this.$toast.add({
            severity: "info",
            summary: "ยืนยัน",
            detail: "ลบพนักงานสำเร็จ",
            life: 3000,
          });
          this.getEmployee();
        } else {
          this.selectedId = "";
          this.$toast.add({
            severity: "error",
            summary: "ลบพนักงานไม่สำเร็จ",
            detail: result?.message,
            life: 3000,
          });
        }
      });
    },
    async popEditDialog(id) {
      this.editDialog = true;
      this.editId = id;
      await this.userService.getEmployeeById(id).then((result) => {
        if (result?.message === "get employee successfully") {
          this.editFirstName = result?.data.first_name;
          this.editLastName = result?.data.last_name;
        } else {
          this.editDialog = false;
          this.$toast.add({
            severity: "error",
            summary: "ค้นหาข้อมูลพนักงานไม่สำเร็จ",
            detail: result?.message,
            life: 3000,
          });
        }
      });
    },
    async editEmployee(){
        const editData = {
           firstName:this.editFirstName,
           lastName:this.editLastName,
        }
        await this.userService.updateEmployee(editData,this.editId).then(result => {
          
            if(result?.message==='update empoyee successfully'){
                this.getEmployee();
                this.editDialog=false;
            }
        })
    }
  },
};
</script>


