<template>
  <div>
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-color">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: {
        icon:'pi pi-home',
        route: "/",
      },
      items: [],
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      const routes = this.$route.matched.map((el) => el.name);

      for (let i = 0; i < routes.length; i++) {
        this.items.push({ label: routes[i],route:'/'+routes[i] });
      }
      
    },
  },
};
</script>
<style scoped>
.p-breadcrumb {
  padding-left: 0;
}
</style>
