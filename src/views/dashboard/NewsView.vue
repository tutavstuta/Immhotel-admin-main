<template>
  <div class="card">
    <h2><span class="pi pi-bell mr-2"></span>ประชาสัมพันธ์</h2>
    <p>แสดงข่าวสารหรือประกาศต่าง ๆ ของโรงแรมที่นี่</p>
    <!-- ตัวอย่างรายการข่าว -->
    <ul>
      <li v-for="(item, idx) in newsList" :key="idx">
        <b>{{ item.title }}</b><br>
        <span class="text-sm">{{ item.date }}</span>
        <div>{{ item.detail }}</div>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [
        { title: "แจ้งปิดปรับปรุงระบบ", date: "28 ก.ย. 2025", detail: "ระบบจะปิดปรับปรุงชั่วคราวเวลา 22:00 - 23:00 น." },
        { title: "โปรโมชั่นใหม่!", date: "25 ก.ย. 2025", detail: "จองห้องพักวันนี้ รับส่วนลด 10% ทุกประเภทห้อง" }
      ]
    };
  }
};
</script>

<style scoped>
.card {
  padding: 2rem;
}
.pi-bell {
  font-size: 1.5rem;
  color: #f59e42;
}
</style>