<template>
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
  name: "HumidityChart",
  mounted() {
    var valueArray;
    var humidity = [];
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
              if (prop === "humidity") {
                humidity.push(obj[prop]);
              }
              if (prop === "time") {
                time.push(obj[prop]);
              }
            }
          }
          var flag = true;
          while (flag) {
            if (humidity.length > 36) {
              humidity.shift();
              time.shift();
            } else {
              flag = false;
            }
          }
          console.log(humidity);
          console.log(time);
          resolve({ humidity: humidity, time: time });
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
              label: "humidity in test room",
              data: value.humidity,
              backgroundColor: "#d48f70",
              borderColor: "#b76a47",
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

<style></style>
