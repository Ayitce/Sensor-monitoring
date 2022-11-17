import { ref, child, get } from "firebase/database";
import firebaseApp from "./firebaseApp";

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

export const TempChartData = {
  type: "line",
  data: {
    labels: [
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune",
    ],
    datasets: [
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3,
      },
    ],
  },
};

export default TempChartData;
