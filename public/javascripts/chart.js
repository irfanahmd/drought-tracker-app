var obj = JSON.parse(test);
let precData = obj.features[0].properties.parameter.PRECTOT;

let xlabel = Object.keys(precData).map(function (d) {
  // d = d.replace(/(\d{4})(\d{2})(\d{2})/g, "$2-$3-$1");
  d = moment(d).format("MMM D, YYYY");
  return d;
});

const cumulativeSum = ((sum) => (value) => (sum += value))(0);
let cumulativePrec = Object.values(precData).map(cumulativeSum);
cumulativePrec = cumulativePrec.map((a) => a.toFixed(2));

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
      ctx.restore();
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
      backgroundColor: "rgba(0, 0, 0, 0)",
      displayColors: false,
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          return tooltipItem.xLabel + "\n" + tooltipItem.yLabel;
        },
      },
      intersect: false,
      titleFontFamily: "Futura",
      titleFontColor: "rgba(0, 0, 0, 1)",
      titleAlign: "center",
      bodyFontColor: "rgba(0, 0, 0, 1)",
      bodyFontFamily: "Futura",
    },
    scales: {
      yAxes: [
        {
          position: "right",
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            maxTicksLimit: 4,
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
