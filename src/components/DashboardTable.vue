<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">การจองใหม่</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
      <template #footer> In total there are {{ products ? products.length : 0 }} products. </template>
    </DataTable>
  </div>
</template>

<script>
import { ProductService } from "@/services/ProductService";

export default {
  data() {
    return {
      products: null,
      columns: null,
    };
  },
  created() {
    this.columns = [
      { field: "code", header: "วันที่" },
      { field: "name", header: "ห้อง" },
      { field: "category", header: "ชื่อลูกค้า" },
      { field: "quantity", header: "วันที่่จอง" },
    ];
  },
  mounted() {
    ProductService.getProductsMini().then((data) => (this.products = data));
  },
};
</script>
