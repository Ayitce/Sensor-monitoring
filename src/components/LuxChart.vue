<template>
  <h1>Lux Chart</h1>
  <div style="width: 1200px">
    <canvas id="graphCanvas" ref="domRef"></canvas>
  </div>
</template>

<script></script>

<script>
import { Chart } from "chart.js/auto";
//console.log(tempChartService.getChartData());
import { ref, child, get } from "firebase/database";
import firebaseApp from "@/firebaseApp";

const dbRef = ref(firebaseApp);

export default {
  name: "LuxChart",
  mounted() {
    var valueArray;
    var lux = [];
    var time = [];

    var myPromise = new Promise(function (resolve) {
      get(child(dbRef, `/DB_Storage/TestRoom`)).then((snapshot) => {
        if (snapshot.exists()) {
          //    console.log(snapshot.val());
          valueArray = snapshot.val();
          //   console.log(valueArray);

          for (var key in valueArray) {
            var obj = valueArray[key];
            for (var prop in obj) {
              if (prop === "lux") {
                lux.push(obj[prop]);
              }
              if (prop === "time") {
                time.push(obj[prop]);
              }
            }
          }
          var flag = true;
          while (flag) {
            if (lux.length > 36) {
              lux.shift();
              time.shift();
            } else {
              flag = false;
            }
          }
          console.log(lux);
          console.log(time);
          resolve({ lux: lux, time: time });
        }
      });
    });

    myPromise.then((value) => {
      console.log("eiei");
      const tempChartData = {
        type: "line",
        data: {
          labels: value.time,
          datasets: [
            {
              label: "lux in test room",
              data: value.lux,
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3,
            },
          ],
        },
      };
      console.log(value);
      console.log(tempChartData);
      const ctx = document.getElementById("graphCanvas");
      new Chart(ctx, tempChartData);
    });
  },
};
</script>

<style>
#graphCanvas {
  position: absolute;
  margin: auto;
}
</style>
