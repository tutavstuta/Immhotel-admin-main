<template>
  <div>
    <BreadcrumbDashboard />
    <div
      class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
    >
      <div>
        <div class="font-medium text-3xl text-900">{{ room.type }}</div>
        <div class="flex align-items-center text-700 flex-wrap">
          <div class="mr-5 flex align-items-center mt-3">
            <i class="pi pi-table mr-2"></i>
            <span>รายละเอียดห้อง</span>
          </div>
        </div>
      </div>
    </div>
    <!-- body -->
    <div class="grid mt-3">
      <div class="col-8">
        <div class="grid">
          <div class="col-4">
            <Image
              :src="baseUrl + '/' + room.image"
              alt="Image"
              width="100%"
              preview
            />
            <p>รูปภาพหน้าปก</p>
          </div>
          <div class="col-8">
            <Panel header="รายละเอียดหลัก">
              <div class="grid">
                <div class="col-6">ลักษณะห้อง</div>
                <div class="col">{{ room.type }}</div>
              </div>
              <div class="grid">
                <div class="col-6">ราคา</div>
                <div class="col">{{ room.base_price }}</div>
              </div>
              <div class="grid">
                <div class="col-6">จำนวนผู้เช้าพักสูงสุด</div>
                <div class="col">{{ room.max_person }}</div>
              </div>
              <div class="grid">
                <div class="col-6">เด็กพักฟรี</div>
                <div class="col">{{ room.children }}</div>
              </div>
              <div class="grid">
                <div class="col-6">จำนวนห้องทั้งหมด</div>
                <div class="col">{{ room.room_amount }}</div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="text-start pl-3 border-round-sm font-bold">
          <Panel header="รูปภาพเพิ่มเติม" class="border-none">
            <UploadImage
              :url="baseUrl + '/imm_hotel/room/image/' + roomId"
              @uploadresult="(result) => (uploadStatus = result)"
            />
            <div class="grid mt-3">
              <div
                class="col-4 relative image-container"
                style="max-width: 33%"
                v-for="(item, index) in room.image_mapping"
              >
                <Image
                  :src="baseUrl + '/' + item.filename"
                  alt="Image"
                  width="100%"
                  preview
                />
                <div class="absolute top-0 right-0 delete-btn">
                  <Button
                    icon="pi pi-times"
                    severity="danger"
                    text
                    rounded
                    aria-label="Cancel"
                    @click="deleteImage(item._id)"
                  />
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>

    <!-- end body -->
    <Toast />
  </div>
</template>
<script>
import { RoomService } from "@/services/roomservice.js";
import { useToast } from "primevue/usetoast";
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import UploadImage from "@/components/UploadImage.vue";
export default {
  components: {
    BreadcrumbDashboard,
    UploadImage,
  },
  setup() {
    const roomService = new RoomService();
    return { roomService };
  },
  data() {
    return {
      baseUrl: "",
      roomId: "",
      room: {},
      uploadStatus: false,
    };
  },
  watch: {
    async uploadStatus(newuploadStatus) {
      await this.getRoom();
      this.uploadStatus = false;
    },
  },
  async mounted() {
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.roomId = this.$route.params.id;
    await this.getRoom();
  },
  methods: {
    async getRoom() {
      this.roomService.getRoomById(this.roomId).then((result) => {
        if (result && result.message === "get room  successfully") {
          console.log(result);
          this.room = result.data;
        }
      });
    },
    async deleteImage(id) {
      await this.roomService.deleteImage(id).then(async (result) => {
        if (result && result.message === "delete image failed") {
          this.$toast.add({
            severity: "success",
            summary: "ลบรูป",
            detail: "ลบรูปห้องพักสำเร็จ",
            life: 3000,
          });
        }
        await this.getRoom();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.image-container {
  .delete-btn {
    display: none;
  }
}
.image-container:hover {
  .delete-btn {
    display: block;
  }
}
</style>
