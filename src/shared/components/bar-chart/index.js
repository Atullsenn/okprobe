import React from "react";
// import { Chart } from "react";
import { useHistory } from "react-router-dom";
const BarChart = ({
  barChartLabel = [],
  barChartTotal = [],
  barChartMono = [],
  barChartColor = [],
  deviceInfoId,
}) => {
  const history = useHistory();

  function getCommaNumber(value) {
    let numberValue = new Number(value);
    return numberValue
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  }

  const getDoughnutChart = () => {
    let barChartCanvas = document.getElementById("barChart");
    if (barChartCanvas != null) {
      let barChartData = {
        labels: barChartLabel,
        datasets: [
          {
            label: "합계",
            data: barChartTotal,
            backgroundColor: "#4280fe",
          },
          {
            label: "흑백",
            data: barChartMono,
            backgroundColor: "#000000",
          },
          {
            label: "컬러",
            data: barChartColor,
            backgroundColor: "#fcd65d",
          },
        ],
      };
      let barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        datasetFill: false,
      };
      let barChart = new window.Chart(barChartCanvas, {
        type: "bar",
        data: barChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          datasetFill: false,
          legend: {
            position: "bottom",
            display: true,
          },
          hover: {
            animationDuration: 0,
          },
          animation: {
            duration: 1,
              onComplete: function () {
                // let chartInstance = chart,
                //   ctx = chartInstance.ctx;

                // ctx.font = Chart.helpers.fontString(
                //   Chart.defaults.global.defaultFontSize,
                //   Chart.defaults.global.defaultFontStyle,
                //   Chart.defaults.global.defaultFontFamily
                // );
                // ctx.textAlign = "center";
                // ctx.textBaseline = "bottom";

                // state.data.datasets.forEach(function (dataset, i) {
                //   let meta = chartInstance.controller.getDatasetMeta(i);
                //   meta.data.forEach(function (bar, index) {
                //     let data = getCommaNumber(dataset.data[index]);
                //     ctx.fillText(data, bar._model.x, bar._model.y - 5);
                //   });
                // });
              },
          },
          title: {
            display: false,
            text: "",
          },
        },
      });
    }
  };
  React.useEffect(() => {
    getDoughnutChart();
  }, [deviceInfoId]);

  return (
    <canvas
      id="barChart"
      width="100%"
      height="350px"
      minHeight='350px'
      maxHeight='350px'
    ></canvas>
  );
};

export default BarChart;
