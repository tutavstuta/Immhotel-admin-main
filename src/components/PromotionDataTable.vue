<template>
  <div class="card">
    <DataTable :value="promotions" tableStyle="min-width: 50rem" :rowHover="true" @row-click="rowClick($event)">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">รายการโปรโมชั่น</span>
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
      <Column header="รูปภาพ">
        <template #body="slotProps">
          <img v-if="slotProps.data.image" :src="`${baseUrl}/${slotProps.data.image}`" :alt="slotProps.data.image"
            class="w-6rem border-round" />
        </template>
      </Column>
      <Column field="title" header="ชื่อโปรโมชั่น"></Column>

      <Column field="description" header="รายละเอียด"></Column>
      <Column field="discount" header="ส่วนลด"></Column>
      <Column field="condition" header="เงือนไข"></Column>
      <Column header="จัดการ">
        <template #body="slotProps">
          <div class="card flex justify-content-start">
            <Button icon="pi pi-pencil" severity="warning" @click="popEditDialog(slotProps.data._id)"></Button>
            <span class="px-2"> </span>
            <Button @click="confirm($event, slotProps.data._id)" icon="pi pi-times" severity="danger"></Button>
          </div>
        </template>
      </Column>
      <template #footer>
        รวมทั้งหมด {{ promotions ? promotions.length : 0 }} รายการ.
      </template>
    </DataTable>
    <!-- Dialog create -->
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible" modal header="สร้างโปรโมชั่น" :style="{ width: '35rem' }">
        <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลโปรโมชั่น</span>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="promotion-type" class="font-semibold w-10rem">ชื่อโปรโมชั่น</label>
          <InputText v-model="promotion.title" id="promotion-type" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="max-person" class="font-semibold w-10rem">รายละเอียด</label>
          <InputText v-model="promotion.description" id="max-person" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="children" class="font-semibold w-10rem">ส่วนลด</label>
          <InputText v-model="promotion.discount" id="children" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="base-price" class="font-semibold w-10rem">เงือนไข</label>
          <InputText v-model="promotion.condition" id="base-price" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="promotion-amount" class="font-semibold w-10rem">รูปภาพ</label>
          <label>
            <img v-if="imagePreview" :src="imagePreview" style="width: 100px;" />
            <span v-else>เลือกรูป</span>
            <input type="file" @change="setImage($event)" style="display: none;" />
          </label>
        </div>
        <div class="flex justify-content-end gap-2">
          <Button type="button" label="ยกเลิก" severity="secondary" @click="visible = false"></Button>
          <Button type="button" label="บันทึก" @click="createPromotion"></Button>
        </div>
      </Dialog>
    </div>
    <!-- End Dialog create -->
    <!-- edit dialog -->
    <Dialog v-model:visible="editDialog" modal header="แก้ไขข้อมูลโปรโมชั่น" :style="{ width: '35rem' }">
      <span class="p-text-secondary block mb-5">กรุณาใส่ข้อมูลโปรโมชั่น</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="title" class="font-semibold w-10rem">ชื่อโปรโมชั่น</label>
        <InputText v-model="promotion.title" id="title" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="description" class="font-semibold w-10rem">รายละเอียด</label>
        <Textarea v-model="promotion.description" rows="5" id="description" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="discount" class="font-semibold w-10rem">ส่วนลด</label>
        <InputText v-model="promotion.discount" id="discount" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="condition" class="font-semibold w-10rem">เงือนไข</label>
        <Textarea v-model="promotion.condition" rows="5" id="condition" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="image" class="font-semibold w-10rem">รูปภาพ</label>
        <label>
          <img v-if="imagePreview" :src="imagePreview" style="width: 100px;" />
          <span v-else>เลือกรูป</span>
          <input id="image" type="file" @change="setImage($event)" style="display: none;" />
        </label>
      </div>

      <div class="flex justify-content-end gap-2">
        <Button type="button" label="ยกเลิก" severity="secondary" @click="editDialog = false"></Button>
        <Button type="button" label="บันทึก" @click="updatePromotion"></Button>
      </div>
    </Dialog>
    <!-- end edit dialog -->
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { PromotionService } from "@/services/promotionservice";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import UploadImageSimple from "@/components/UploadImageSimple.vue";

export default {
  components: {
    UploadImageSimple
  },
  setup() {
    const promotionService = new PromotionService();
    return { promotionService };
  },
  data() {
    return {
      baseUrl: "",
      promotions: null,
      visible: false,
      editDialog: false,
      checked: false,
      selectedId: "",
      selectedEditId: "",
      imagePreview: null,
      promotion: {
        title: "",
        description: "",
        discount: 0,
        condition: "",
      },
      uploadresult: false
    };
  },
  async mounted() {
    await this.getAllPromotion();
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL
  },
  watch: {
    async uploadresult(newUploadresult) {

      await this.getAllPromotion();
      this.uploadresult = false;
    }
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      if (file) {
        this.image = file;
        const reader = new FileReader();
        reader.onload = (evt) => {
          this.imagePreview = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    popCreateDialog() {
      this.visible = true;
    },
    async popEditDialog(id) {
      await this.getPromotionById(id);
      this.editDialog = true;
      this.selectedEditId = id;
    },
    confirm(e, id) {
      this.selectedId = id;
      this.$confirm.require({
        message: "ต้องการลบโปรโมชั่นใช่หรือไม่",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "ยกเลิก",
        acceptLabel: "ลบ",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          await this.deletePromotion(this.selectedId);
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
          severity = "success"
          break;

        case "ปิดจองชั่วคราว":

          break;

        case "ยกเลิก":

        default:
          break;
      };

      return severity

    },
    async getAllPromotion() {
      await this.promotionService.getAllPromotions().then((result) => {
        if (result && result.message === "get promotion successfully") {
          this.promotions = result.data;
        }
      });
    },
    createPromotion() {
      this.promotionService
        .createPromotion(this.promotion, this.image)
        .then(async (result) => {
          if (result && result.message === "create promotion successfully") {
            await this.getAllPromotion();
            this.$toast.add({
              severity: "success",
              summary: "เพิ่มโปรโมชั่นสำเร็จ",
              detail: result?.message,
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "เพิ่มโปรโมชั่นไม่สำเร็จ",
              detail: result.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "เพิ่มโปรโมชั่นไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });

      this.visible = false;
      this.promotion = {
        title: "",
        description: "",
        discount: 0,
        condition: "",
      };
    },
    async getPromotionById(id) {
      await this.promotionService.getPromotionById(id).then((result) => {
        if (result && result.message === "get promotion successfully") {
          const { data } = result;
          this.promotion = {
            title: data.title,
            description: data.description,
            discount: data.discount,
            condition: data.condition,
          };
        } else {
          this.editDialog = false;
          this.$toast.add({
            severity: "error",
            summary: "เรียกข้อมูลโปรโมชั่นไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        }
      });
    },
    async updatePromotion() {
      await this.promotionService
        .updatePromotion(this.selectedEditId, this.promotion, this.image)
        .then(async (result) => {
          if (result && result.message === "update promotion successfully") {
            this.editDialog = false;

            this.$toast.add({
              severity: "success",
              summary: "แก้ไขโปรโมชั่นสำเร็จ",
              detail: result.message,
              life: 3000,
            });

            this.promotion = {
              title: "",
              description: "",
              discount: 0,
              condition: "",
            };
            await this.getAllPromotion();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "อัพเดทโปรโมชั่นไม่สำเร็จ",
              detail: result.message,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "อัพเดทโปรโมชั่นไม่สำเร็จ",
            detail: error.message,
            life: 3000,
          });
        });
    },
    async deletePromotion(id) {
      await this.promotionService.deletePromotion(id).then(async (result) => {
        if (result) {
          this.$toast.add({
            severity: "success",
            summary: "ลบโปรโมชั่นสำเร็จ",
            detail: "คุณได้ทำการลบโปรโมชั่น",
            life: 3000,
          });

          this.selectedId = ""
          await this.getAllPromotion();
        }
      }).catch(error => {
        this.$toast.add({
          severity: "error",
          summary: "อัพเดทโปรโมชั่นไม่สำเร็จ",
          detail: error.message,
          life: 3000,
        });
      })


    },
    rowClick(e) {
      console.log('row click', e.data._id);
      this.$router.push('/promotion/' + e.data._id);
    }
  },
};
</script>