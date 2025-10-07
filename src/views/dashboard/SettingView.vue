<template>
    <div>
        <BreadcrumbDashboard />

        <div class="surface-section py-2">
            <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                <div>
                    <div class="font-medium text-3xl text-900">ตั้งค่าบริการพื้นฐาน</div>
                    <div class="card mt-3">
                        <TabMenu :model="items">
                            <template #item="{ item, props }">
                                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                        <span v-bind="props.icon" />
                                        <span v-bind="props.label">{{ item.label }}</span>
                                    </a>
                                </router-link>
                                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                                    <span v-bind="props.icon" />
                                    <span v-bind="props.label">{{ item.label }}</span>
                                </a>
                            </template>

                        </TabMenu>
                    </div>
                    <div>
                        <RouterView/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadcrumbDashboard from "@/components/BreadcrumbDashboard.vue";
export default {
    setup() {

    },
    components: {
        BreadcrumbDashboard
    },
    data() {
        return {
            items: [
            
                {
                    label: 'Room overview',
                    icon: 'pi pi-book',
                    route: '/setting/room-overview'
                },
                {
                    label: 'Amenity',
                    icon: 'pi pi-star',
                    route: '/setting/room-amenity'
                },

            ]
        }
    }
}
</script>