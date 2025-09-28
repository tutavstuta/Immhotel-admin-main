<template>
   
    <div>
        <DataTable  :value="bookings" tableStyle="min-width: 50rem">
            <Column field="ref_number" header="รหัสอ้างอิง"></Column>
            <Column field="date_from" header="วันที่เข้าพัก">
                <template #body="{data}">
                    {{ data.date_from.split(' ')[0] }}
                </template>
            </Column>
            <Column field="date_to" header="ถึงวันที่">
                <template #body="{data}">
                    {{ data.date_to.split(' ')[0] }}
                </template>
            </Column>
            <Column field="room" header="ห้อง"></Column>
            <Column field="customer_name" header="ชื่อลูกค้า"></Column>
            <Column header="การชำระเงิน">
                <template #body="{data}">
                    <div v-if="data.slip">
                        <span style="color: green;" >ชำระแล้ว</span>
                        <SlipDialog :booking="data"/>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script>

import { BookingService } from '@/services/bookingservice';
import SlipDialog from './SlipDialog.vue';
export default {
    components:{
     SlipDialog
    },
    setup() {
        const bookingservice = new BookingService();
        return { bookingservice }
    },
    data() {
        return {
            bookings: null
        }
    },
     mounted() {
        this.getAll();
    },
    methods: {
        async getAll() {
            this.bookingservice.getAll().then(result => {
                if (result) {
                    console.log(result);
                    this.bookings = result;
                }
            })
        }
    }
}
</script>