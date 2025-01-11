<template>
    <div style="width: 100%;">
        <h3>ห้องว่าง</h3>
        <div id="container">
            <div class="flex mb-3 w-100 justify-content-end">
                <Calendar v-model="today" showIcon view="month"  />
            </div>
            <div id="schedule">
                <table style="width: 100%;">
                    <tr>
                        <th style="text-align: start;">ห้องพัก\วันที่</th>
                        <th v-for="(day, index) in header" :key="index" class="bg-primary">{{ day.format('DD') }}</th>
                    </tr>
                    <tr v-for="(room, index) in rooms" :key="index">
                        <td style="background-color: var(--highlight-bg); color: var(--highlight-text-color);">{{
                            room.type }}</td>
                        <td v-for="(day, index) in header">{{ checkAvailableRoom(day, room) }}</td>

                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { RoomService } from '@/services/roomservice';
import { BookingService } from '@/services/bookingservice';
import Calendar from 'primevue/calendar';

export default {
    setup() {
        const roomService = new RoomService();
        const bookingService = new BookingService();

        return { roomService, bookingService };
    },
    data() {
        return {
            today: new Date(),
            start: null,
            end: null,
            header: [],
            rooms: null,
            bookings: []
        }
    },
    watch: {
        today(newToday) {
            if (newToday) {
                console.log(newToday)
                this.setDayInMount();
                this.getBooking(this.start, this.end);
            }
        }
    },
    async mounted() {

        this.setDayInMount();
        await this.getAllRooms();
        await this.getBooking(this.start, this.end);
    },
    methods: {
        setDayInMount() {
            this.start = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
            this.end = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
            const days = [];
            let start = dayjs(this.start);
            let end = dayjs(this.end);
            console.log(start,end)
            do {
                days.push(start);
                start = dayjs(start).add(1, 'day');
            }
            while (start <= end)
            this.header = days;
        },
        async getAllRooms() {
            await this.roomService.getAllRooms().then((result) => {
                if (result && result.message === "get room successfully") {
                    this.rooms = result.data;
                }
            });
        },
        async getBooking(start, end) {
            this.bookingService.getByDateRange(start, end).then(result => {
                if (result) {
                    console.log(result);
                    this.bookings = result.data;
                }
            })
        },
        checkAvailableRoom(day, room) {
            let available = 0;
            const onBookingDay = this.bookings.filter(el =>el.room==room.type && new Date(el.date_from) >= new Date(day) && new Date(el.date_to) >= new Date(day))
            // const onBookingDay = this.bookings.filter(el =>el.room==room.type)
            available = room.room_amount - onBookingDay.length;
            return available
        }
    }
}
</script>
<style scoped>
#container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    font-size: 0.9rem;
}

#schedule {
    overflow: auto;
}

#day-header {
    display: flex;
}
</style>