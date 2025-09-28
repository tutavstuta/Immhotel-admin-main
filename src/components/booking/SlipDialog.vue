
<template>
    <div class="card flex justify-center">
        <Button label="Show" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Slip" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">#REF: {{ booking.ref_number }}</span>
            <div class="flex items-center gap-4 mb-4">

                <Image :src="baseUrl+'/'+booking.slip " alt="Slip" width="250" preview/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="close" severity="secondary" @click="visible = false"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script >
import Image from 'primevue/image';
export default {
    components:{
        Image
    },
    props:{
        booking:Object
    },
    data(){
        return {
            baseUrl:"",
            visible : false
        }
    },
    mounted(){
        this.baseUrl = import.meta.env.VITE_APP_BASE_URL
    }
}
</script>
