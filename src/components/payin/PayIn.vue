<template>
    <div class="card">
        <div class="flex gap-1 my-3">
            <InputText v-model="refnumber" type="text" placeholder="refnumber" fluid />
            <Button label="ค้นหา" @click="searchBooking" :disabled="!refnumber" />
            <Button label="คือค่า" @click="booking=null" />
        </div>
        <Card v-if="booking">
            <template #title>รายละเอียดการจอง</template>
            <template #content>
                <div class="grid">
                    <div class="col-3">
                        <span>หมายเลขอ้างอิง</span>
                    </div>
                    <div class="col-9">
                        {{ booking.ref_number }}
                    </div>
                    <div class="col-3">
                        <span>ห้อง</span>
                    </div>
                    <div class="col-9">
                        {{ booking.room }}
                    </div>
                    <div class="col-3">
                        <span>วันที่เข้าพัก</span>
                    </div>
                    <div class="col-9">
                        {{ new Date(booking.date_from).toLocaleDateString() }}
                    </div>
                    <div class="col-3">
                        <span>ถึงวันที่</span>
                    </div>
                    <div class="col-9">
                        {{ new Date(booking.date_to).toLocaleDateString() }}
                    </div>
                    <div class="col-3">
                        <span>จำนวนวันทั้งหมด</span>
                    </div>
                    <div class="col-9">
                        {{ booking.total_nigths }}
                    </div>
                    <div class="col-3">
                        <span>ราคาต่อวัน</span>
                    </div>
                    <div class="col-9">
                        {{ booking.price_per_night }} บาท
                    </div>
                    <div class="col-3">
                        <span>ราคารวม</span>
                    </div>
                    <div class="col-9">
                        {{ booking.total_price }} บาท
                    </div>
                </div>
            </template>

        </Card>
        <div v-if="!booking?.slip" class="mt-3">
            <form @onSubmit="payInSlip">
                <div class="flex flex-column gap-1">
                    <span>
                        อัพโหลดสลิป
                        <input type="file" accept="jpg"></input>
                    </span>
                    <Button type="submit" severity="secondary" label="Submit" />
                </div>
            </form>
        </div>
        <div v-else>
            <div class="flex flex-column">

                <span>หมายเหตุ ลูกค้าชำระเงินแล้ว</span>
                <Image :src="baseUrl + '/' + booking.slip" alt="slip" width="250"  />
            </div>
        </div>
    </div>
</template>

<script>
import Image from 'primevue/image';
import { BookingService } from '@/services/bookingservice';
export default {
    components: {
        Image
    },
    setup() {
        const bookingService = new BookingService();
        return { bookingService }
    },
    data() {
        return {
            baseUrl: "",
            refnumber: "",
            booking: null,
        }
    },
    mounted() {
        this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    },
    methods: {
        payInSlip() {

        },
        searchBooking() {
            this.bookingService.getByRefNumber(this.refnumber).then(data => {
                this.booking = data;
            }
            )
        }
    }
}
</script>
