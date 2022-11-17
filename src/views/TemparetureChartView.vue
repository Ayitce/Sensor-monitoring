<template>
  <TemparetureChart></TemparetureChart>
</template>

<script>
import TemparetureChart from "@/components/TemparetureChart.vue";
import { ref, child, get } from "firebase/database";
import firebaseApp from "../firebaseApp";

const dbRef = ref(firebaseApp);
var valueArray;
get(child(dbRef, `/DB_Storage/TestRoom`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      valueArray = snapshot.val();
      console.log(valueArray);

      for (var key in valueArray) {
        // skip loop if the property is from prototype

        var obj = valueArray[key];
        for (var prop in obj) {
          // skip loop if the property is from prototype

          // your code
          if (prop === "humidity") {
            console.log(prop + " = " + obj[prop]);
          }
        }
      }
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

export default {
  name: "TemparetureChartView",
  components: {
    TemparetureChart,
  },
};
</script>

<style></style>
