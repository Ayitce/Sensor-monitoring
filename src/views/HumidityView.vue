<template>
  <div class="humidity">
    <h1>This is humidity page</h1>
    <HumidityChart></HumidityChart>
  </div>
</template>
<script>
import HumidityChart from "@/components/HumidityChart.vue";

export default {
  name: "HumidityChartView",
  components: {
    HumidityChart,
  },
};
</script>

<style></style>
