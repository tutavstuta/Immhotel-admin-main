<template>
  <div class="card">
    <BookingTable :showActions="false"/>
  </div>
</template>

<script>
import BookingTable from './booking/BookingTable.vue';

export default {
  components: {
    BookingTable
  },
  props: {
    showActions: {
      type: Boolean,
      default: false
    }
  }
};
</script>
