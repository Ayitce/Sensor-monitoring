import { ref, child, get } from "firebase/database";
import firebaseApp from "./firebaseApp";

const dbRef = ref(firebaseApp);
var valueArray;
var humidity = [];
var time = [];

get(child(dbRef, `/DB_Storage/TestRoom`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      valueArray = snapshot.val();
      console.log(valueArray);

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

      console.log(humidity);
      console.log(time);
      // console.log(humidity);
      // console.log(time);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
console.log(humidity);
console.log(time);
const TempChartData = {
  type: "line",
  data: {
    labels: time,
    datasets: [
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: humidity,
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3,
      },
    ],
  },
};

export default TempChartData;
