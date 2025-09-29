<template>
    <div>
        <div v-if="showActions" class="mb-3 flex justify-content-end">
            <Button label="เพิ่ม" icon="pi pi-plus" severity="success" @click="openAddDialog" />
        </div>
        <DataTable :value="bookings" tableStyle="min-width: 50rem">
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
            <Column field="total_price" header="ราคา">
                <template #body="{data}">
                    <span>{{ data.total_price ? data.total_price.toLocaleString() : '-' }}</span>
                </template>
            </Column>
            <Column field="customer_name" header="ชื่อลูกค้า"></Column>
            <Column header="การชำระเงิน">
                <template #body="{data}">
                    <div v-if="data.slip">
                        <span style="color: green;">ชำระแล้ว</span>
                        <SlipDialog :booking="data"/>
                    </div>
                    <div v-else>
                        <span style="color: red;">ยังไม่ได้ชำระ</span>
                        
                    </div>
                </template>
            </Column>
            <Column header="จัดการ" v-if="showActions">
                <template #body="{data}">
                    <Button label="แก้ไข" icon="pi pi-pencil" size="small" class="mr-2" @click="openEditDialog(data)" />
                    <Button label="ลบ" icon="pi pi-trash" severity="danger" size="small" @click="deleteBooking(data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-if="showActions" v-model:visible="addEditDialog" modal header="เพิ่ม/แก้ไข Booking">
            <div class="p-fluid">
                <div class="field">
                    <label>วันที่เข้าพัก</label>
                    <InputText v-model="editBooking.date_from" />
                </div>
                <div class="field">
                    <label>ถึงวันที่</label>
                    <InputText v-model="editBooking.date_to" />
                </div>
                <div class="field">
                    <label>ห้อง</label>
                    <InputText v-model="editBooking.room" />
                </div>
                <div class="field">
                    <label>ราคา</label>
                    <InputNumber v-model="editBooking.total_price" />
                </div>
                <div class="field">
                    <label>ชื่อลูกค้า</label>
                    <InputText :value="editBooking.customer_name" disabled />
                </div>
                <div class="flex justify-content-end mt-3">
                    <Button label="บันทึก" severity="success" @click="saveBooking" />
                    <Button label="ยกเลิก" severity="secondary" class="ml-2" @click="addEditDialog = false" />
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>

import { BookingService } from '@/services/bookingservice';
import SlipDialog from './SlipDialog.vue';
export default {
    components:{
     SlipDialog
    },
    props: {
        showActions: {
          type: Boolean,
          default: true
        }
      },
    setup() {
        const bookingservice = new BookingService();
        return { bookingservice }
    },
    data() {
        return {
            bookings: null,
            addEditDialog: false,
            editBooking: null,
        }
    },
     mounted() {
        this.getAll();
    },
    methods: {
        openAddDialog() {
            this.editBooking = {
                date_from: "",
                date_to: "",
                room: "",
                total_price: "",
                customer_name: ""
            };
            this.addEditDialog = true;
        },
        openEditDialog(data) {
            this.editBooking = { ...data };
            this.addEditDialog = true;
        },
        async deleteBooking(data) {
            await this.bookingservice.delete(data._id);
            this.getAll();
        },
        async getAll() {
            this.bookingservice.getAll().then(result => {
                if (result) {
                    console.log(result);
                    this.bookings = result;
                }
            })
        },
        async saveBooking() {
            if (this.editBooking && this.editBooking._id) {
              // แก้ไข
              await this.bookingservice.update(this.editBooking._id, this.editBooking);
            } else {
              // เพิ่มใหม่
              await this.bookingservice.create(this.editBooking);
            }
            this.addEditDialog = false;
            this.getAll();
          },
    }
}
</script>