<template>
  <div class="card flex justify-content-center">
    <Toast />
    <FileUpload
      mode="basic"
      name="image"
      :url=url
      accept="image/*"
      :maxFileSize="1000000"
      @upload="onUpload"
      @before-send="beforeSend($event)"
      :auto="true"
      chooseLabel="Browse"
    />
  </div>
</template>

<script>
export default {
  props:{
    url:{
      type:String,
      defaule:""
    }
  },
  data(){
    return {
      token:""
    }
  },
  emit:["uploadresult"],
  mounted() {
    this.token = localStorage.getItem("token");
  },
  methods: {
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
      this.$emit('uploadresult',true);
    },
    beforeSend(e) {
      e.xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
    },
  },
};
</script>
