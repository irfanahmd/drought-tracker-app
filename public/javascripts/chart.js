let oneMBtn = document.getElementById("1M");
let threeMBtn = document.getElementById("3M");
let sixMBtn = document.getElementById("6M");
let oneYBtn = document.getElementById("1Y");

initvalue = 0;

var obj = JSON.parse(test);

let precData = obj.features[0].properties.parameter.PRECTOT;

let newPrecData = Object.entries(precData).map(([date, rainfall]) => {
  return {
    date: moment(date).format("MMM D, YYYY"),
    rainfall: rainfall,
  };
});

function render(range) {
  //for one month filter newPrecData

  const allowed = [];

  if (initvalue === 0) {
    var i;
    for (i = 0; i < newPrecData.length; ++i) {
      initvalue = moment(newPrecData[365].date).subtract(1, "month");
      if (moment(newPrecData[i].date).isAfter(initvalue)) {
        allowed.push(newPrecData[i].date);
      }
    }
  } else {
    var i;
    for (i = 0; i < newPrecData.length; ++i) {
      if (moment(newPrecData[i].date).isAfter(initvalue)) {
        allowed.push(newPrecData[i].date);
      }
    }
  }

  const filtered = [];

  for (i = 0; i < newPrecData.length; ++i) {
    if (allowed.includes(newPrecData[i].date)) {
      filtered.push(newPrecData[i]);
    }
  }

  // for (const x of Object.entries(newPrecData)) {
  // }

  //filtering monthly, six monthly, yearly

  // var filtered = Object.fromEntries(Object.entries(obj).filter(condition));

  // // var filtered = Object.filter(newPrecData, ([date, rainfall]) => {
  // //   date > moment(date);
  // // });

  var xlabel = [];
  var ylabel = [];

  var i;
  for (i = 0; i < filtered.length; ++i) {
    xlabel.push(filtered[i].date);
  }

  for (i = 0; i < filtered.length; ++i) {
    ylabel.push(filtered[i].rainfall);
  }

  // let xlabel = Object.keys(precData).map(function (d) {
  //   // d = d.replace(/(\d{4})(\d{2})(\d{2})/g, "$2-$3-$1");
  //   d = moment(d).format("MMM D, YYYY");
  //   return d;
  // });

  const cumulativeSum = ((sum) => (value) => (sum += value))(0);
  let cumulativePrec = ylabel.map(cumulativeSum);
  cumulativePrec = cumulativePrec.map((a) => a.toFixed(2));

  //passing to frontend
  document.getElementById("precip").innerText = `${ylabel
    .reduce((a, b) => a + b)
    .toFixed(2)} mm`;

  document.getElementById("chartContainer").innerHTML = "&nbsp;";
  document.getElementById("chartContainer").innerHTML =
    '<canvas id="myChart"></canvas>';

  var ctx = document.getElementById("myChart").getContext("2d");

  Chart.defaults.LineWithLine = Chart.defaults.line;
  Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function (ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
        var activePoint = this.chart.tooltip._active[0],
          ctx = this.chart.ctx,
          x = activePoint.tooltipPosition().x,
          topY = this.chart.legend.bottom,
          bottomY = this.chart.chartArea.bottom;

        // draw line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.strokeStyle = "#07C";
        ctx.stroke();
        // ctx.restore();
      }
    },
  });

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "LineWithLine",

    // The data for our dataset
    data: {
      labels: xlabel,
      datasets: [
        {
          label: "Total Precipitation",
          backgroundColor: "rgb(0, 119, 204, 0.1)",
          borderColor: "rgba(0, 119, 204, 0.3)",
          borderWidth: 1,
          data: cumulativePrec,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    },

    // Configuration options go here
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        mode: "index",
        backgroundColor: "rgba(0, 0, 0, 0)",
        displayColors: false,
        callbacks: {
          // use label callback to return the desired label
          afterLabel: function (tooltipItem, data) {
            if (tooltipItem.index !== 0) {
              temp = (
                data.datasets[0].data[tooltipItem.index] -
                data.datasets[0].data[tooltipItem.index - 1]
              ).toFixed(2);
            } else {
              temp = data.datasets[0].data[tooltipItem.index];
            }
          },
          label: function (tooltipItem, data) {
            return "Total Precipitation";
          },
          footer: function (tooltipItem, data) {
            return tooltipItem[0].yLabel + " mm (+" + temp + " mm)";
          },
        },
        intersect: false,
        titleFontFamily: "Futura",
        titleMarginBottom: 12,
        footerFontFamily: "Futura",
        titleFontColor: "rgba(0, 0, 0, 1)",
        titleAlign: "center",
        bodyFontColor: "rgba(0, 0, 0, 1)",
        footerFontColor: "rgba(0, 0, 0, 1)",
        bodyFontStyle: "bold",
        footerFontStyle: "bold",
        titleFontStyle: "normal",
        bodyFontColor: "rgba(0, 119, 204, 1)",
        bodyFontFamily: "Futura",
        bodyAlign: "center",
        footerAlign: "center",
      },
      scales: {
        yAxes: [
          {
            position: "right",
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              maxTicksLimit: 3,
              fontFamily: "Futura",
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + " mm";
              },
            },
          },
        ],
        xAxes: [
          {
            display: false,
          },
        ],
      },
    },
  });
}

render();

//event listeners

oneMBtn.addEventListener("click", function () {
  if (oneMBtn.childNodes[0].classList.contains("disabled")) {
    oneMBtn.childNodes[0].classList.toggle("disabled");
    initvalue = moment(newPrecData[365].date).subtract(1, "month");
    document.getElementById("range").innerText = "past month";
    render();
  } else {
  }
  if (oneYBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    oneYBtn.childNodes[0].classList.toggle("disabled");
  }
  if (threeMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    threeMBtn.childNodes[0].classList.toggle("disabled");
  }
  if (sixMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    sixMBtn.childNodes[0].classList.toggle("disabled");
  }
});

threeMBtn.addEventListener("click", function () {
  if (threeMBtn.childNodes[0].classList.contains("disabled")) {
    threeMBtn.childNodes[0].classList.toggle("disabled");
    initvalue = moment(newPrecData[365].date).subtract(3, "month");
    document.getElementById("range").innerText = "past 3 months";
    render();
  } else {
  }
  if (oneYBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    oneYBtn.childNodes[0].classList.toggle("disabled");
  }
  if (oneMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    oneMBtn.childNodes[0].classList.toggle("disabled");
  }
  if (sixMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    sixMBtn.childNodes[0].classList.toggle("disabled");
  }
});

sixMBtn.addEventListener("click", function () {
  if (sixMBtn.childNodes[0].classList.contains("disabled")) {
    sixMBtn.childNodes[0].classList.toggle("disabled");
    initvalue = moment(newPrecData[365].date).subtract(6, "month");
    document.getElementById("range").innerText = "past 6 months";
    render();
  } else {
  }
  if (oneYBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    oneYBtn.childNodes[0].classList.toggle("disabled");
  }
  if (oneMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    oneMBtn.childNodes[0].classList.toggle("disabled");
  }
  if (threeMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    threeMBtn.childNodes[0].classList.toggle("disabled");
  }
});

oneYBtn.addEventListener("click", function () {
  if (oneYBtn.childNodes[0].classList.contains("disabled")) {
    oneYBtn.childNodes[0].classList.toggle("disabled");
    initvalue = moment(newPrecData[365].date).subtract(12, "month");
    document.getElementById("range").innerText = "past year";
    render();
  } else {
  }
  if (sixMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    sixMBtn.childNodes[0].classList.toggle("disabled");
  }
  if (oneMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    oneMBtn.childNodes[0].classList.toggle("disabled");
  }
  if (threeMBtn.childNodes[0].classList.contains("disabled")) {
  } else {
    threeMBtn.childNodes[0].classList.toggle("disabled");
  }
});
