<script>
import UserService from "@/services/userservice";
export default {
  setup() {
    const userService = new UserService();
    return { userService };
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      await this.userService
        .login(this.username, this.password)
        .then((result) => {
          if (result.message === "login successful") {
            this.$router.push("/home");
          } else {
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h3>Admin authentication</h3>
      <div class="p-inputgroup">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="ชื่อผู้ใช้" />
      </div>
      <div class="p-inputgroup">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="password" placeholder="รหัสผ่าน" />
      </div>
      <Button label="เข้าสู่ระบบ" @click="login" />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.p-inputgroup {
  margin-bottom: 20px;
}

.p-inputgroup-addon {
  background-color: #f4f4f4;
  border-right: none;
}

.p-inputtext {
  width: 100%;
}

.p-button {
  width: 100%;
}
</style>
