<template>
  <div>
    <BreadcrumbDashboard />
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
            <UploadImage />
          </Panel>
        </div>
      </div>
    </div>

    <!-- end body -->
  </div>
</template>
<script>
import { RoomService } from "@/services/roomservice.js";
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
    };
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
  },
};
</script>
