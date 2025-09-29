<template>
  <div v-if="loading">
    <BreadcrumbDashboard />
    <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
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
            <Image :src="baseUrl + '/' + room.image" alt="Image" width="100%" preview />
            <p>รูปภาพหน้าปก</p>
            <UploadImage
              :url="baseUrl + '/imm_hotel/room/upload-cover/' + roomId"
              @uploadresult="(result) => (uploadStatus = result)"
              label="เปลี่ยนรูปหน้าปก"
            />
          </div>
          <div class="col-8">
            <Panel header="รายละเอียดหลัก" class="mb-3">
              <div class="mb-3 flex justify-content-end">
                <Button label="แก้ไข" severity="warning" @click="editMainDetailDialog = true" />
              </div>
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
            <Panel header="ภาพรวมของห้อง" class="mb-3">
              <div class="mb-3 flex justify-content-end">
                <AssignRoomOverviewDialog :id="roomId" :overviewProps="room.overview_mapping" />
              </div>
              <div class="grid" v-if="room.overview_mapping">

                <div v-for="(item, index) of room.overview_mapping" :key="index"
                  class="col-3 align-items-ccenter text-center">
                  <div>
                    <Image height="50" :src="baseUrl + '/' + item.icon" />
                  </div>
                  <span>{{ item.name }}</span>
                </div>

              </div>


            </Panel>
            <Panel header="สิ่งอำนวยความสะดวก" class="mb-3">
              <div class="mb-3 flex justify-content-end">
                <AssignRoomAmenityDialog :id="roomId" :amenityProps="room.amenity_mapping" />
              </div>
              <div class="grid" v-if="room.amenity_mapping">

                <div v-for="(item, index) of room.amenity_mapping" :key="index"
                  class="col-3 align-items-ccenter text-center">
                  <div>
                    <Image height="50" :src="baseUrl + '/' + item.icon" />
                  </div>
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </Panel>
            <Panel header="รายละเอียดเพิ่มเติม" class="mb-3">
              <div class="mb-3 flex justify-content-end">
                <Button label="แก้ไข" severity="warning" @click="editDescriptionDialog = true" />
              </div>
              <p>{{ room.description }}</p>
            </Panel>

          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="text-start pl-3 border-round-sm font-bold">
          <Panel header="รูปภาพเพิ่มเติม" class="border-none">
            <UploadImage :url="baseUrl + '/imm_hotel/room/image/' + roomId"
              @uploadresult="(result) => (uploadStatus = result)" />
            <div class="grid mt-3">
              <div class="col-4 relative image-container" style="max-width: 33%"
                v-for="(item, index) in room.image_mapping">
                <Image :src="baseUrl + '/' + item.filename" alt="Image" width="100%" preview />
                <div class="absolute top-0 right-0 delete-btn">
                  <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel"
                    @click="deleteImage(item._id)" />
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>

    <!-- end body -->

    <Toast />

    <Dialog v-model:visible="editMainDetailDialog" header="แก้ไขรายละเอียดหลัก" :modal="true" :closable="true">
      <div class="p-fluid">
        <div class="field">
          <label>ลักษณะห้อง</label>
          <InputText v-model="editRoom.type" />
        </div>
        <div class="field">
          <label>ราคา</label>
          <InputNumber v-model="editRoom.base_price" />
        </div>
        <div class="field">
          <label>จำนวนผู้เช้าพักสูงสุด</label>
          <InputNumber v-model="editRoom.max_person" />
        </div>
        <div class="field">
          <label>เด็กพักฟรี</label>
          <InputNumber v-model="editRoom.children" />
        </div>
        <div class="field">
          <label>จำนวนห้องทั้งหมด</label>
          <InputNumber v-model="editRoom.room_amount" />
        </div>
        <div class="flex justify-content-end mt-3">
          <Button label="บันทึก" severity="success" @click="saveMainDetail" />
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="editDescriptionDialog" header="แก้ไขรายละเอียดเพิ่มเติม" :modal="true" :closable="true">
      <div class="p-fluid">
        <div class="field">
          <label>รายละเอียดเพิ่มเติม</label>
          <Textarea v-model="editRoom.description" rows="5" autoResize />
        </div>
        <div class="flex justify-content-end mt-3">
          <Button label="บันทึก" severity="success" @click="saveMainDetail" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { RoomService } from "@/services/roomservice.js";
import { useToast } from "primevue/usetoast";
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import UploadImage from "@/components/UploadImage.vue";
import AssignRoomAmenityDialog from "@/components/amenity/AssignRoomAmenityDialog.vue";
import AssignRoomOverviewDialog from "@/components/overview/AssignRoomOverviewDialog.vue";
export default {
  components: {
    BreadcrumbDashboard,
    UploadImage,
    AssignRoomAmenityDialog,
    AssignRoomOverviewDialog
  },
  setup() {
    const roomService = new RoomService();
    return { roomService };
  },
  data() {
    return {
      loading: false,
      baseUrl: "",
      roomId: "",
      room: {},
      uploadStatus: false,
      editMainDetailDialog: false,
      editDescriptionDialog: false,
      editRoom: {},
    };
  },
  methods: {
    async getRoom() {
      this.loading = false;
      this.roomService.getRoomById(this.roomId).then((result) => {
        if (result && result.message === "get room  successfully") {
          console.log(result);
          this.room = result.data;
          this.editRoom = { ...result.data }; // initialize editRoom with room data
        }
      });
      this.loading = true;
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
    async saveMainDetail() {
      await this.roomService.updateRoomMainDetail(this.roomId, this.editRoom).then(async (result) => {
        if (result && result.message === "update room successfully") {
          this.$toast.add({
            severity: "success",
            summary: "บันทึกสำเร็จ",
            detail: "แก้ไขรายละเอียดหลักสำเร็จ",
            life: 3000,
          });
          this.editMainDetailDialog = false;
          await this.getRoom();
        }
      });
    },
  },
  watch: {
    async uploadStatus(newuploadStatus) {
      await this.getRoom();
      this.uploadStatus = false;
    },
    editMainDetailDialog(val) {
      if (val) {
        this.editRoom = { ...this.room };
      }
    },
  },
  async mounted() {
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.roomId = this.$route.params.id;
    await this.getRoom();
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
