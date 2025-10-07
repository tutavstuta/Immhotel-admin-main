<template>
  <div class="card">
    <DataTable :value="newsdata" tableStyle="min-width: 50rem" :rowHover="true" @row-click="rowClick($event)">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">รายการข่าวสาร</span>
          <Button icon="pi pi-plus" rounded raised @click="popCreateDialog" />
        </div>
      </template>
      <Column header="ลำดับ">
        <template #body="slotProps">
          <div>
            {{ slotProps.index + 1 }}
          </div>
        </template>
      </Column>
      <Column field="title" header="ชื่อข่าวสาร"></Column>
      <Column field="description" header="รายละเอียด"></Column>
      <Column header="รูปภาพ">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.image"
            :src="`${baseUrl}/${slotProps.data.image}`"
            :alt="slotProps.data.title"
            style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;"
          />
          <span v-else class="text-gray-500">ไม่มีรูปภาพ</span>
        </template>
      </Column>
      <Column header="จัดการ">
        <template #body="slotProps">
          <div class="card flex justify-content-start">
            <Button icon="pi pi-pencil" severity="warning" @click="popEditDialog(slotProps.data._id)"></Button>
            <span class="px-2"></span>
            <Button @click="confirm($event, slotProps.data._id)" icon="pi pi-times" severity="danger"></Button>
          </div>
        </template>
      </Column>
      <template #footer>
        รวมทั้งหมด {{ newsdata ? newsdata.length : 0 }} รายการ.
      </template>
    </DataTable>
    <div class="card flex justify-content-center">
    <!-- Dialog create -->
    <Dialog v-model:visible="visible" modal header="สร้างข่าวสาร" :style="{ width: '35rem' }">
      <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลข่าวสาร</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="news-type" class="font-semibold w-10rem">ชื่อข่าวสาร</label>
        <InputText v-model="news.title" id="news-type" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="max-person" class="font-semibold w-10rem">รายละเอียด</label>
        <InputText v-model="news.description" id="max-person" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="news-amount" class="font-semibold w-10rem">รูปภาพ</label>
        <label>
          <img v-if="imagePreview" :src="imagePreview" style="width: 100px;" />
          <span v-else>เลือกรูป</span>
          <input type="file" @change="setImage($event)" style="display: none;" />
        </label>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="ยกเลิก" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="บันทึก" @click="createnews"></Button>
      </div>
    </Dialog>
    </div>
    <!-- End Dialog create -->

    <!-- edit dialog -->
    <Dialog v-model:visible="editDialog" modal header="แก้ไขข้อมูลข่าวสาร" :style="{ width: '35rem' }">
      <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลข่าวสาร</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="title" class="font-semibold w-10rem">ชื่อข่าวสาร</label>
        <InputText v-model="news.title" id="title" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="description" class="font-semibold w-10rem">รายละเอียด</label>
        <Textarea v-model="news.description" rows="5" id="description" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="discount" class="font-semibold w-10rem">รูปภาพ</label>
        <label>
          <img v-if="imagePreview" :src="imagePreview" style="width: 100px;" />
          <span v-else>เลือกรูป</span>
          <input type="file" @change="setImage($event)" style="display: none;" />
        </label>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="ยกเลิก" severity="secondary" @click="editDialog = false"></Button>
        <Button type="button" label="บันทึก" @click="updateNews"></Button>
      </div>
    </Dialog>
    <!-- end edit dialog -->
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { NewsService } from "@/services/news";
import UploadImageSimple from "@/components/UploadImageSimple.vue";

export default {
  components: {
    UploadImageSimple
  },
  setup() {
    const newsService = new NewsService();
    return { newsService };
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_APP_BASE_URL,
      newsdata: [],
      visible: false,
      editDialog: false,
      selectedId: "",
      selectedEditId: "",
      imagePreview: null,
      image: null,
      news: { title: "", description: "" },
      uploadresult: false,
      newsService: new NewsService()
    };
  },
  async mounted() {
    await this.getAllnews();
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL
  },
  watch: {
    async uploadresult(newUploadresult) {
      
        await this.getAllnews();
        this.uploadresult = false; // Reset the flag
      
    }
  },
  methods: {
    async getAllnews() {
      try {
        const result = await this.newsService.getAllnews();
        if (result?.message === "get News successfully") {
          this.newsdata = result.data || [];
        }
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "ไม่สามารถโหลดข้อมูลข่าวสาร",
          detail: error.message,
          life: 3000,
        });
      }
    },
    createnews() {
      this.newsService
        .createnews(this.news, this.image)
        .then(async (result) => {
          // แก้ตรงนี้ให้เช็คแบบไม่สนตัวพิมพ์เล็ก/ใหญ่
          if (result && result.message?.toLowerCase() === "create news successfully") {
            await this.getAllnews();
            this.$toast.add({
              severity: "success",
              summary: "เพิ่มข่าวสารสำเร็จ",
              detail: result?.message,
              life: 3000,
            });
            this.visible = false;
          } else {
            this.$toast.add({
              severity: "error",
              summary: "เพิ่มข่าวสารไม่สำเร็จ",
              detail: result?.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "เพิ่มข่าวสารไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });
    },
    async getnewsById(id) {
      await this.newsService.getnewsById(id).then((result) => {
        if (result && result.message === "get news successfully") {
          const { data } = result;
          this.news = {
            title: data.title,
            description: data.description,
          };
        }
      });
    },
    async updateNews() {
      await this.newsService
        .updatenews(this.selectedEditId, this.news, this.image)
        .then(async (result) => {
          // เช็คแบบไม่สนตัวพิมพ์เล็ก/ใหญ่
          if (result && result.message?.toLowerCase() === "update news successfully") {
            this.editDialog = false;
            this.$toast.add({
              severity: "success",
              summary: "แก้ไขข่าวสารสำเร็จ",
              detail: result.message,
              life: 3000,
            });
            this.news = {
              title: "",
              description: "",
            };
            await this.getAllnews();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "อัพเดทข่าวสารไม่สำเร็จ",
              detail: result.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "อัพเดทข่าวสารไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });
    },
    async deleteNews(id) {
      await this.newsService.deletenews(id).then(async (result) => {
        if (result) {
          this.$toast.add({
            severity: "success",
            summary: "ลบข่าวสารสำเร็จ",
            detail: "คุณได้ทำการลบข่าวสาร",
            life: 3000,
          });

          this.selectedId = ""
          await this.getAllnews();
        }
      }).catch(error => {
        this.$toast.add({
          severity: "error",
          summary: "อัพเดทข่าวสารไม่สำเร็จ",
          detail: error.message,
          life: 3000,
        });
      });
    },
    popCreateDialog() {
      this.news = { title: "", description: "" };
      this.image = null;
      this.imagePreview = null;
      this.visible = true;
    },

    popEditDialog(id) {
      this.selectedEditId = id;
      this.getnewsById(id).then(() => {
        this.editDialog = true; // เปิด dialog หลังจากดึงข้อมูลเสร็จ
      });
    },

    setImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },

    confirm(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'คุณต้องการลบข่าวสารนี้หรือไม่?',
        header: 'ยืนยันการลบ',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'ลบ',
        rejectLabel: 'ยกเลิก',
        accept: () => {
          this.deleteNews(id);
        }
      });
    },
  }
}
</script>