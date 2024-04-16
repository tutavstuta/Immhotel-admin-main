<template>
  <Button label="เพิ่ม" severity="primary" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="แก้ไขข้อมูลห้องพัก" :style="{ width: '35rem' }">
    <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลบริการ</span>
    <div class="card flex justify-content-center">
      <div class="grid w-full mb-3">
        <div v-for="category of roomOverviewData" :key="category._id" class="col-4 align-items-center">
          <Checkbox v-model="overview" :inputId="category._id" name="category" :value="category._id" />
          <label :for="category._id" class="ml-2">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="ยกเลิก" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="บันทึก" @click="update"></Button>
    </div>
  </Dialog>
</template>
<script>
import { RoomOverviewService } from "@/services/roomoverview.js";
import { RoomService } from "@/services/roomservice.js";

export default {
  setup() {
    const roomOverviewService = new RoomOverviewService();
    const roomService = new RoomService();
    return { roomOverviewService, roomService };
  },
  props: {
    id:{
      type:String
    },
    overviewProps: {
      type: Object,
    }
  },
  data() {
    return {
      roomOverviewData: null,
      visible: false,
      overview: []
    }
  },
  async mounted() {
    await this.getAll();
    this.overview = this.overviewProps.map(el=>el._id);
   
  },
  methods: {
    async getAll() {
      await this.roomOverviewService.getAll().then((result) => {

        if (result && result.message === "get room overview successfully") {
          this.roomOverviewData = result.data;
       
        }
      });
    },
    async update() {
      let dataUpdate = {
        overview: this.overview
      }
      await this.roomService
        .updateRoom(this.id, dataUpdate)
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
        this.visible = false;
    },
  }
}
</script>