<template>
  <div class="card"> 
    <DataTable :value="rooms" tableStyle="min-width: 50rem" :rowHover="true" @row-click="rowClick($event)">
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">รายการห้องพัก</span>
          <Button icon="pi pi-plus" rounded raised @click="popCreateDialog" />
        </div>
      </template>
      <Column field="type" header="ห้อง"></Column>
      <Column header="รูปภาพหน้าปก">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.image"
            :src="`${baseUrl}/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="w-6rem border-round"
          />
          <div v-else>
            <UploadImageSimple :url="baseUrl+'/imm_hotel/room/upload-cover/'+slotProps.data._id" @uploadresult="(result)=>uploadresult=result"/>
          </div>
        </template>
      </Column>
      <Column field="base_price" header="ราคาพื้นฐาน/คืน">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.base_price) }}
        </template>
      </Column>

      <Column field="max_person" header="ผู้เข้าพักสูงสุด"></Column>
      <Column field="children" header="เด็กพักได้(คน)"></Column>
      <Column field="room_amount" header="จำนวนห้องทั้งหมด"></Column>
      <Column header="สถาณะ">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column header="จัดการ">
        <template #body="slotProps">
          <div class="card flex justify-content-start">
            <Button
              icon="pi pi-cog"
              severity="info"
              @click="this.$router.push('/room/'+slotProps.data._id);"
            ></Button>
            <span class="px-2"> </span>
            <Button
              icon="pi pi-pencil"
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
        รวมทั้งหมด {{ rooms ? rooms.length : 0 }} รายการ.
      </template>
    </DataTable>
    <!-- Dialog create -->
    <div class="card flex justify-content-center">
      <Dialog
        v-model:visible="visible"
        modal
        header="สร้างห้องพัก"
        :style="{ width: '35rem' }"
      >
        <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลห้องพัก</span>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="room-type" class="font-semibold w-10rem">ประเภท</label>
          <InputText
            v-model="room.type"
            id="room-type"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="max-person" class="font-semibold w-10rem"
            >ผุ้เข้าพักสูงสุด</label
          >
          <InputText
            v-model="room.max_person"
            id="max-person"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="children" class="font-semibold w-10rem"
            >เด็กพักได้สูงสุด</label
          >
          <InputText
            v-model="room.children"
            id="children"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="base-price" class="font-semibold w-10rem"
            >ราคาพื้นฐาน</label
          >
          <InputText
            v-model="room.base_price"
            id="base-price"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="room-amount" class="font-semibold w-10rem"
            >จำนวนห้องทั้งหมด</label
          >
          <InputText
            v-model="room.room_amount"
            id="room-amount"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button
            type="button"
            label="ยกเลิก"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="button" label="บันทึก" @click="createRoom"></Button>
        </div>
      </Dialog>
    </div>
    <!-- End Dialog create -->
    <!-- edit dialog -->
    <Dialog
      v-model:visible="editDialog"
      modal
      header="แก้ไขข้อมูลห้องพัก"
      :style="{ width: '35rem' }"
    >
      <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลห้องพัก</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="room-type" class="font-semibold w-10rem">ประเภท</label>
        <InputText
          v-model="room.type"
          id="room-type"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="max-person" class="font-semibold w-10rem"
          >ผุ้เข้าพักสูงสุด</label
        >
        <InputText
          v-model="room.max_person"
          id="max-person"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="children" class="font-semibold w-10rem"
          >เด็กพักได้สูงสุด</label
        >
        <InputText
          v-model="room.children"
          id="children"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="base-price" class="font-semibold w-10rem"
          >ราคาพื้นฐาน</label
        >
        <InputText
          v-model="room.base_price"
          id="base-price"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="room-amount" class="font-semibold w-10rem"
          >จำนวนห้องทั้งหมด</label
        >
        <InputText
          v-model="room.room_amount"
          id="room-amount"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="ยกเลิก"
          severity="secondary"
          @click="editDialog = false"
        ></Button>
        <Button type="button" label="บันทึก" @click="updateRoom"></Button>
      </div>
    </Dialog>
    <!-- end edit dialog -->
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { RoomService } from "@/services/roomservice.js";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import UploadImageSimple from "@/components/UploadImageSimple.vue";

export default {
  components: {
    UploadImageSimple
  },
  setup() {
    const roomService = new RoomService();
    return { roomService };
  },
  data() {
    return {
      baseUrl:"",
      rooms: null,
      visible: false,
      editDialog: false,
      checked: false,
      selectedId: "",
      selectedEditId: "",
      room: {
        type: "",
        max_person: 0,
        children: 0,
        base_price: 0,
        room_amount: 0,
      },
      uploadresult:false
    };
  },
  async mounted() {
    await this.getAllRooms();
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL
  },
  watch: {
    async uploadresult(newUploadresult) {
      
      await this.getAllRooms();
      this.uploadresult = false;
    }
  },
  methods: {
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
      await this.getRoomById(id);
      (this.editDialog = true), (this.selectedEditId = id);
    },
    confirm(e, id) {
      this.selectedId = id;
      this.$confirm.require({
        message: "ต้องการลบห้องพักใช่หรือไม่",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "ยกเลิก",
        acceptLabel: "ลบ",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          await this.deleteRoom(this.selectedId);
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
    getSeverity(status) {

      let severity

      switch (status) {
        case "เปิดจอง":
          severity="success"
          break;

          case "ปิดจองชั่วคราว":

          break;

          case "ยกเลิก":
      
        default:
          break;
      };

      return severity

    },
    async getAllRooms() {
      await this.roomService.getAllRooms().then((result) => {
        if (result && result.message === "get room successfully") {
          this.rooms = result.data;
        }
      });
    },
    createRoom() {
      this.roomService
        .createRoom(this.room)
        .then(async (result) => {
          if (result && result.message === "Room created successfully") {
            await this.getAllRooms();
            this.$toast.add({
              severity: "success",
              summary: "เพิ่มห้องพักสำเร็จ",
              detail: result?.message,
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "เพิ่มห้องพักไม่สำเร็จ",
              detail: result.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "เพิ่มห้องพักไม่สำเร็จ",
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
    async getRoomById(id) {
      await this.roomService.getRoomById(id).then((result) => {
        if (result && result.message === "get room  successfully") {
          this.room = {
            type: result.data.type,
            max_person: result.data.max_person,
            children: result.data.children,
            base_price: result.data.base_price,
            room_amount: result.data.room_amount,
          };
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
    async updateRoom() {
      await this.roomService
        .updateRoom(this.selectedEditId, this.room)
        .then(async (result) => {
          if (result && result.message === "update room successfully") {
            this.editDialog = false;

            this.$toast.add({
              severity: "success",
              summary: "แก้ไขห้องพักสำเร็จ",
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
            await this.getAllRooms();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "อัพเดทห้องพักไม่สำเร็จ",
              detail: result.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "อัพเดทห้องพักไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });
    },
    async deleteRoom(id) {
      await this.roomService.deleteRoom(id).then(async (result )=> {
        if(result){
          this.$toast.add({
              severity: "success",
              summary: "ลบห้องพักสำเร็จ",
              detail: "คุณได้ทำการลบห้องพัก",
              life: 3000,
            });

            this.selectedId =  ""
            await this.getAllRooms();
        }
      }).catch(error => {
        this.$toast.add({
            severity: "error",
            summary: "อัพเดทห้องพักไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
      })

      
    },
    rowClick(e){
      console.log('row click',e.data._id);
      this.$router.push('/room/'+e.data._id);
    }
  },
};
</script>
