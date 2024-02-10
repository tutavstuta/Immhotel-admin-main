
<template>
    <div>
        <PageHeading/>
    </div>
    <div class="card py-3">
        <DataTable :value="employees" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="first_name" header="ชื่อ" style="width: 25%"></Column>
            <Column field="last_name" header="นามสกุล" style="width: 25%"></Column>
            <Column field="username" header="ชื่อผู้ใช้" style="width: 25%"></Column>
            <Column field="role" header="ตำแหน่ง" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script>
import UserService from '@/services/userservice';
import PageHeading from "@/components/PageHeading.vue";

export default {
    setup(){
        const userService = new UserService();
        return { userService }
    },
    components:{
        PageHeading
    },
    data() {
        return {
            employees: null
        };
    },
    mounted() {
        this.getEmployee();
    },
    methods:{
        async getEmployee(){
            await this.userService.getEmployee().then(result=>{
                if(result){
                    console.log(result);
                    this.employees = result.data;
                }
            })
        }
    }
};
</script>
