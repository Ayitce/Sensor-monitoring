<template>
  <div class="lux">
    <h1></h1>
    <MainChart></MainChart>
  </div>
</template>

<script>
import MainChart from "@/components/MainChart.vue";

export default {
  name: "HomeView",
  components: {
    MainChart,
  },

  // RealTime
  // var rtArray;
  // var rtTemp;
  // var rtTime;
  // var rtHumidity;
  // var rtLux;

  // var myPromiseReal = new Promise(function (resolve) {
  //   get(child(dbRef, "/Realtime/TestRoom")).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       rtArray = snapshot.val();

  //       for (var key in rtArray) {
  //         if (key === "temperature") rtTemp = rtArray[key];
  //         else if (key === "time") rtTime = rtArray[key];
  //         else if (key === "humidity") rtHumidity = rtArray[key];
  //         else if (key === "lux") rtLux = rtArray[key];
  //       }
  //     }
  //   });
  // });
};
</script>

<style></style>
