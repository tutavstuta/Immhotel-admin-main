<script>
import ChartBasic from "./ChartBasic.vue";
import LineChart from "./LineChart.vue";

export default {
    components:{
        ChartBasic,
        LineChart
    }

}

</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="surface-card shadow-2 p-3 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <!-- graph -->
            <ChartBasic/>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
