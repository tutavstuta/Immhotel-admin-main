<template>
  <div class="card">
    <DataTable :value="roomAmenityData" tableStyle="min-width: 50rem" :rowHover="true">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">รายการเครื่องอำนวยความสะดวก</span>
          <Button icon="pi pi-plus" rounded raised @click="popCreateDialog" />
        </div>
      </template>
      <Column header="Icon">
        <template #body="slotProps">
          <img :src="`${baseUrl}/${slotProps.data.icon}`" :alt="slotProps.data.icon" class="w-6rem border-round" />

        </template>
      </Column>
      <Column field="name" header="ชื่อ">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.name) }}
        </template>
      </Column>
      <Column header="จัดการ">
        <template #body="slotProps">
          <div class="card flex justify-content-start">
            <span class="px-2"> </span>
            <Button icon="pi pi-pencil" severity="warning" @click="popEditDialog(slotProps.data._id)"></Button>
            <span class="px-2"> </span>
            <Button @click="confirm($event, slotProps.data._id)" icon="pi pi-times" severity="danger"></Button>
          </div>
        </template>
      </Column>
      <template #footer>
        รวมทั้งหมด {{ roomAmenityData ? roomAmenityData.length : 0 }} รายการ.
      </template>
    </DataTable>
    <!-- Dialog create -->
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible" modal header="สร้างบริการ" :style="{ width: '35rem' }">

        <div class="flex align-items-center gap-3 mb-5">
          <label for='name' class="font-semibold w-10rem">เลือกรูปไอคอน</label>
          <label :style="preview?'background:url('+filePreview+');background-size: contain;background-repeat: no-repeat;background-position:center':null"   :class="preview?'preview':'flex-align-center border-round-md '">
            <span v-if='!preview'>เลือกรูปไอคอน</span>
            <input  type="file" class="d-none" @change='getImage($event)'/>
          </label>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
        <label for='name' class="font-semibold w-10rem">ชื่อบริการ</label>
        <InputText v-model="iconName" id="name" />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button type="button" label="ยกเลิก" severity="secondary" @click="visible = false"></Button>
          <Button type="button" label="บันทึก" @click="create"></Button>
        </div>
      </Dialog>
    </div>
    <!-- End Dialog create -->
    <!-- edit dialog -->
    <Dialog v-model:visible="editDialog" modal header="แก้ไขข้อมูลห้องพัก" :style="{ width: '35rem' }">
      <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลบริการ</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="room-type" class="font-semibold w-10rem">ชื่อบริการ</label>
        <InputText v-model="iconName" id="room-type" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="ยกเลิก" severity="secondary" @click="editDialog = false"></Button>
        <Button type="button" label="บันทึก" @click="update"></Button>
      </div>
    </Dialog>
    <!-- end edit dialog -->
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { RoomAmenityService } from "@/services/roomamenity.js";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import UploadImageSimple from "@/components/UploadImageSimple.vue";

export default {
  components: {
    UploadImageSimple
  },
  setup() {
    const roomAmenityService = new RoomAmenityService();
    return { roomAmenityService };
  },
  data() {
    return {
      baseUrl: "",
      roomAmenityData: null,
      visible: false,
      editDialog: false,
      checked: false,
      selectedId: "",
      selectedEditId: "",
      iconName:null,
      uploadresult: false,
      filePreview:null,
      icon:null,
      preview:false
    };
  },
  async mounted() {
    await this.getAll();
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL
  },
  watch: {
    async uploadresult(newUploadresult) {

      await this.getAll();
      this.uploadresult = false;
    }
  },
  methods: {
    getImage(e){
     this.icon= e.target.files[0];
     console.log(this.icon);
     if(this.icon){
       let fileReader = new FileReader();
       fileReader.readAsDataURL(this.icon);
       fileReader.addEventListener('load',(event)=>{
         this.filePreview = event.target?.result;
         this.preview = true;
         
        });
      }
    },
    formatCurrency(value) {
      return value.toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      });
    },
    popCreateDialog() {
      this.visible = true;
    },
    async popEditDialog(id) {
      await this.getById(id);
      (this.editDialog = true), (this.selectedEditId = id);
    },
    confirm(e, id) {
      this.selectedId = id;
      this.$confirm.require({
        message: "ต้องการลบบริการใช่หรือไม่",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "ยกเลิก",
        acceptLabel: "ลบ",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          await this.delete(this.selectedId);
          this.selectedId = "";
        },
        reject: () => {
          this.selectedId = ""
          // this.$toast.add({
          //   severity: "error",
          //   summary: "ยกเลิกรายการ",
          //   detail: "คุณได้ทำการยกเลิกการทำรายการ",
          //   life: 3000,
          // });
        },
      });
    },
    async getAll() {
      await this.roomAmenityService.getAll().then((result) => {
        console.log(result);
        if (result && result.message === "get room amenity successfully") {
          this.roomAmenityData = result.data;
        }
      });
    },
    create() {
      const formData = new FormData();
      formData.append('image',this.icon);
      formData.append('name',this.iconName);
      this.roomAmenityService
        .create(formData)
        .then(async (result) => {
          if (result) {
            await this.getAll();
            this.$toast.add({
              severity: "success",
              summary: "เพิ่มบริการสำเร็จ",
              detail: result?.message,
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "เพิ่มบริการไม่สำเร็จ",
              detail: result.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "เพิ่มบริการไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });

      this.visible = false;
      this.room = {
        type: "",
        max_person: 0,
        children: 0,
        base_price: 0,
        room_amount: 0,
      };
    },
    async getById(id) {
      await this.roomAmenityService.getById(id).then((result) => {
        if (result && result.message === "get room overview successfully") {
         
            this.iconName= result.data.name;
          
        } else {
          this.editDialog = false;
          this.$toast.add({
            severity: "error",
            summary: "เรียกข้อมูลห้องพักไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        }
      });
    },
    async update() {
      let dataUpdate = {
        name:this.iconName
      }
      await this.roomAmenityService
        .update(this.selectedEditId, dataUpdate)
        .then(async (result) => {
          if (result) {
            this.editDialog = false;

            this.$toast.add({
              severity: "success",
              summary: "แก้ไขบริการสำเร็จ",
              detail: result.message,
              life: 3000,
            });

            this.room = {
              type: "",
              max_person: 0,
              children: 0,
              base_price: 0,
              room_amount: 0,
            };
            await this.getAll();
          } 
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "อัพเดทบริการไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });
    },
    async delete(id) {
      await this.roomAmenityService.delete(id).then(async (result) => {
        if (result) {
          this.$toast.add({
            severity: "success",
            summary: "ลบบริการสำเร็จ",
            detail: "คุณได้ทำการลบบริการ",
            life: 3000,
          });

          this.selectedId = ""
          await this.getAll();
        }
      }).catch(error => {
        this.$toast.add({
          severity: "error",
          summary: "ลบบริการไม่สำเร็จ",
          detail: error.message,
          life: 3000,
        });
      })
    },
  },
};
</script>
<style>
.preview{
  display:flex;
  width:100px;
  height: 100px;
  justify-self: center;
  align-self: center;
}
</style>