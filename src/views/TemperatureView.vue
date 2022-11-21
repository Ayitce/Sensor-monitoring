<template>
  <div class="temperature">
    <h1>This is temperature page</h1>

    <TemparetureChart></TemparetureChart>
  </div>
</template>

<script>
import TemparetureChart from "@/components/TemparetureChart.vue";

export default {
  name: "TemparetureChartView",
  components: {
    TemparetureChart,
  },
};
</script>

<style></style>
