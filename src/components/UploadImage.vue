<template>
  <div class="card">
    <Toast />
    <FileUpload
      name="image"
      url="http://localhost:3000/imm_hotel/hotel/upload"
      @before-send="beforeSend($event)"
      @upload="onTemplatedUpload($event)"
      :multiple="true"
      accept="image/*"
      :maxFileSize="1000000"
      @select="onSelectedFiles"
    >
      <template
        #header="{ chooseCallback, uploadCallback, clearCallback, files }"
      >
        <div
          class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
        >
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-images"
              rounded
              outlined
            ></Button>
            <Button
              @click="uploadEvent(uploadCallback)"
              icon="pi pi-cloud-upload"
              rounded
              outlined
              severity="success"
              :disabled="!files || files.length === 0"
            ></Button>
            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
          <ProgressBar
            :value="totalSizePercent"
            :showValue="false"
            :class="[
              'md:w-20rem h-1rem w-full md:ml-auto',
              { 'exceeded-progress-bar': totalSizePercent > 100 },
            ]"
            ><span class="white-space-nowrap"
              >{{ totalSize }}B / 1Mb</span
            ></ProgressBar
          >
        </div>
      </template>
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <div v-if="files.length > 0">
          <h5>Pending</h5>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div
              v-for="(file, index) of files"
              :key="file.name + file.type + file.size"
              class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
            >
              <div>
                <img
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  width="100"
                  height="50"
                />
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
              <Badge value="Pending" severity="warning" />
              <Button
                icon="pi pi-times"
                @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                outlined
                rounded
                severity="danger"
              />
            </div>
          </div>
        </div>

        <div v-if="uploadedFiles.length > 0">
          <h5>Completed</h5>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div
              v-for="(file, index) of uploadedFiles"
              :key="file.name + file.type + file.size"
              class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
            >
              <div>
                <img
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  width="100"
                  height="50"
                />
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
              <Badge value="Completed" class="mt-3" severity="success" />
              <Button
                icon="pi pi-times"
                @click="removeUploadedFileCallback(index)"
                outlined
                rounded
                severity="danger"
              />
            </div>
          </div>
        </div>
      </template>
      
    </FileUpload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: "",
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
      uploadHeaders: {},
      token: "",
    };
  },
  emit:["uploadresult"],
  mounted() {
    this.token = localStorage.getItem("token");
  },
  methods: {
    onRemoveTemplatingFile(file, removeFileCallback, index) {
      
      removeFileCallback(index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
    },
    onClearTemplatingUpload(clear) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
    },
    onSelectedFiles(event) {
 
      this.files = event.files;
      this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size));
      });
    },
    uploadEvent(callback) {
      this.totalSizePercent = this.totalSize / 10;
      callback();
    },
    onTemplatedUpload(e) {
      
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
      this.$emit('uploadresult',true)
    },
    formatSize(bytes) {
      const k = 1024;
      const dm = 3;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    },
    beforeSend(e) {
      e.xhr.setRequestHeader("Authorization", `Bearer ${this.token}`)  
    },
  },
};
</script>
