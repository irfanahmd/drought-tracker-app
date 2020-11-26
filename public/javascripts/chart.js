var obj = JSON.parse(test);
let precData = obj.features[0].properties.parameter.PRECTOT;

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: Object.keys(precData),
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: Object.values(precData),
      },
    ],
  },

  // Configuration options go here
  options: {},
});
