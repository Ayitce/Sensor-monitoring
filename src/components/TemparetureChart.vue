<template>
  <h1>Tempareture Chart</h1>
  <div style="width: 800px">
    <canvas id="graphCanvas" ref="domRef"></canvas>
  </div>
</template>

<script></script>

<script>
import { Chart } from "chart.js/auto";
import TempChartData from "../tempChart";

export default {
  name: "TemparetureChart",
  data() {
    return {
      TempChartData: TempChartData,
    };
  },
  mounted() {
    const ctx = document.getElementById("graphCanvas");
    new Chart(ctx, this.TempChartData);
  },
};
</script>

<style></style>
