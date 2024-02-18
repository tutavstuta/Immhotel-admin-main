<template>
  <div class="card flex justify-content-center">
    <Image alt="Image" preview>
      <template #indicatoricon>
        <span >
          <i class="pi pi-search "></i>
        </span>
      </template>
      <template #image>
        <img :src="baseUrl + url" alt="image" width="100%" />
      </template>
      <template #preview="slotProps">
        
        <img
          :src="baseUrl + url"
          alt="preview"
          :style="slotProps.style"
          @click="slotProps.onClick"
        />
      </template>
    </Image>
  </div>
</template>
<script>
export default {
  props: {
    url: String,
    default: "",
  },
  data() {
    return {
      baseUrl: "http://localhost:3000/",
    };
  },
};
</script>
