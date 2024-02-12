<template>
  <div>
    <BreadcrumbDashboard />
    <div class="surface-section py-2">
      <div
        class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
      >
        <div>
          <div class="font-medium text-3xl text-900">โรงแรม</div>
          <div class="flex align-items-center text-700 flex-wrap">
            <div class="mr-5 flex align-items-center mt-3">
              <i class="pi pi-map-marker mr-2"></i>
              <span>รายละเอียดโรงแรม</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- container -->
    <div class="grid mt-3">
      <div class="col-6 pr-5">
        <!-- Content for the first column -->
        <div class="flex flex-column gap-2 mb-3">
          <label for="name">ชือโรงแรม</label>
          <InputText id="name" v-model="hotel.name" />
        </div>
        <div v-for="(item,index) in hotel.phone_number" :key="index">
          <div class="flex flex-column gap-2 mb-3">
          <label for="address">เบอร์โทร{{index+1}}</label>
          <InputText id="address" v-model="hotel.phone_number[index]" />
        </div>
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="address">ที่อยู่</label>
          <InputText id="address" v-model="hotel.address" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="tumbon">ตำบล</label>
          <Dropdown
            v-model="hotel.tumbon"
            :options="tumbons"
            optionLabel="name"
            :placeholder="hotel.tumbon"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="amphure">อำเภอ</label>
          <Dropdown
            v-model="hotel.amphure"
            :options="amphures"
            optionLabel="name"
            :placeholder="hotel.amphure"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="province">จังหวัด</label>
          <Dropdown
            v-model="hotel.province"
            :options="provinces"
            optionLabel="name"
            :placeholder="hotel.province"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="country">ประเทศ</label>
          <InputText id="country" v-model="hotel.country" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="description">รายละเอียด</label>
          <Textarea v-model="hotel.description" rows="5" cols="30" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="country">ลานจอดรถ</label>
          <InputText id="country" v-model="hotel.parking"/>
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="description">ไฮไลท์</label>
          <Textarea v-model="hotel.highlight" rows="5" cols="30" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="description">สิ่งอำนวยความสะดวก</label>
          <Textarea v-model="hotel.highlight" rows="5" cols="30" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="description">บริการพิเศษ</label>
          <Textarea v-model="hotel.special_service" rows="5" cols="30" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="description">สถานที่ไกล้เคียง</label>
          <Textarea v-model="hotel.nearly_place" rows="5" cols="30" />
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="description">ช้อจำกัดความเป้นส่วนตัว</label>
          <Textarea v-model="hotel.property_policies" rows="5" cols="30" />
        </div>
        <Button label="บันทึก" class="mb-5" @click="updateHotel"/>
        <!-- End Content for the first column -->
      </div>
      <div class="col-6 px-3">
        <!-- Content for the second column -->
        <div>
            <span>รูปภาพ</span>
            <UploadImage class="mt-2"/>
        </div>
      </div>
    </div>
    <!-- end container -->
    <Toast />
  </div>
</template>

<script>
import HotelService from "@/services/hotelservice";
import { useToast } from "primevue/usetoast";
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
import UploadImage from "@/components/UploadImage.vue";

export default {
  setup() {
    const hotelService = new HotelService();

    return { hotelService };
  },
  components: {
    BreadcrumbDashboard,
    UploadImage
  },
  data() {
    return {
      id: "",
      hotel: {},
      tumbons: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      amphures: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      provinces: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
    };
  },
  created() {
    this.id = import.meta.env.VITE_APP_HOTEL_ID;
  },
  mounted() {
    this.getHotel();
  },
  methods: {
    async getHotel() {
      await this.hotelService.getHotelById(this.id).then((result) => {
      
        if (result?.message === "get hotel successfully") {
          this.hotel = result.data;
        } else {
          this.$toast.add({
            severity: "error",
            summary: "ไม่สามารถค้นหาโรงแรม",
            detail: result.message,
            life: 3000,
          });
        }
      });
    },
    async updateHotel(){
      await this.hotelService.updateHotel(this.hotel,this.id).then(result=>{
        if(result.message==='update hotel successfully'){
          this.$toast.add({
            severity: "success",
            summary: "อัพเดท",
            detail: "อัพเดทข้อมูลโรงแรมสำเร็จ",
            life: 3000,
          });
        }else{
          this.$toast.add({
            severity: "error",
            summary: "อัพเดทข้อมูลไม่สำเร็จ",
            detail: result.message,
            life: 3000,
          });
        }

      })
    }
  },
};
</script>
