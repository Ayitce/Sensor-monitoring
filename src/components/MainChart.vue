<template>
  <h1>Chart</h1>
  <div style="width: 1200px">
    <canvas id="graphCanvas" ref="domRef"></canvas>
  </div>
</template>

<script></script>

<script>
import { Chart } from "chart.js/auto";
import tempChartService from "@/tempChartService.js";
//console.log(tempChartService.getChartData());
import { ref, child, get } from "firebase/database";
import firebaseApp from "@/firebaseApp";

const dbRef = ref(firebaseApp);

export default {
  name: "MainChart",
  mounted() {
    var valueArray;
    var temperature = [];
    var time = [];
    var humidity = [];
    var lux = [];

    var myPromise = new Promise(function (resolve) {
      get(child(dbRef, `/DB_Storage/TestRoom`)).then((snapshot) => {
        if (snapshot.exists()) {
          //    console.log(snapshot.val());
          valueArray = snapshot.val();
          //   console.log(valueArray);

          for (var key in valueArray) {
            var obj = valueArray[key];
            for (var prop in obj) {
              if (prop === "temperature") {
                temperature.push(obj[prop]);
              }
              if (prop === "time") {
                time.push(obj[prop]);
              }
              if (prop === "humidity") {
                humidity.push(obj[prop]);
              }
              if (prop === "lux") {
                lux.push(obj[prop]);
              }
            }
          }
          var flag = true;
          while (flag) {
            if (temperature.length > 36) {
              temperature.shift();
              time.shift();
              humidity.shift();
              lux.shift();
            } else {
              flag = false;
            }
          }
          console.log(temperature);
          console.log(time);
          resolve({
            temperature: temperature,
            time: time,
            lux: lux,
            humidity: humidity,
          });
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
              label: "Temperature",
              data: value.temperature,
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3,
            },
            {
              label: "Humidity",
              data: value.humidity,
              backgroundColor: "#d48f70",
              borderColor: "#b76a47",
              borderWidth: 3,
            },
            {
              label: "Lux",
              data: value.lux,
              backgroundColor: "#bb85d4",
              borderColor: "#9447b7",
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

    // RealTime
    var rtArray;
    var rtTemp;
    var rtTime;
    var rtHumidity;
    var rtLux;

    var myPromiseReal = new Promise(function (resolve) {
      get(child(dbRef, "/Realtime/TestRoom")).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          rtArray = snapshot.val();

          for (var key in rtArray) {
            if (key === "temperature") rtTemp = rtArray[key];
            else if (key === "time") rtTime = rtArray[key];
            else if (key === "humidity") rtHumidity = rtArray[key];
            else if (key === "lux") rtLux = rtArray[key];
          }
        }
      });
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
