import React from "react";
import { useHistory } from "react-router-dom";

const registerChartpluginService = () => {
  window.Chart.pluginService.register({
      afterUpdate: function (chart) {
          if (chart.config.options.elements.center) {
              var helpers = window.Chart.helpers;
              var centerConfig = chart.config.options.elements.center;
              var globalConfig = window.Chart.defaults.global;
              var ctx = chart.chart.ctx;

              var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
              var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

              if (centerConfig.fontSize)
                  var fontSize = centerConfig.fontSize;
                  // figure out the best font size, if one is not specified
              else {
                  ctx.save();
                  var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                  var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                  var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

                  do {
                      ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                      var textWidth = ctx.measureText(maxText).width;

                      // check if it fits, is within configured limits and that we are not simply toggling back and forth
                      if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                          fontSize += 1;
                      else {
                          // reverse last step
                          fontSize -= 1;
                          break;
                      }
                  } while (true)
                  ctx.restore();
              }

              // save properties
              chart.center = {
                  font: helpers.fontString(fontSize, fontStyle, fontFamily),
                  fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
              };
          }
      },
      afterDraw: function (chart) {
          if (chart.center) {
              var centerConfig = chart.config.options.elements.center;
              var ctx = chart.chart.ctx;

              ctx.save();
              ctx.font = chart.center.font;
              ctx.fillStyle = chart.center.fillStyle;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
              var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
              ctx.fillText(centerConfig.text, centerX, centerY);
              ctx.restore();
          }
      },
  })
};
const DoughnutComponent = ({
  canvasId,
  chartTitleText,
  chartColor,
  levelPercentageValue,
  levelPercentageText='',
  deviceInfoId,
  consumableModelId,
  showText = false,
}) => {
  const history = useHistory();

  const getDoughnutChart = () => {
    let canvasObject = document.getElementById(canvasId);

    if (canvasObject != null) {
      let donutChartCanvas = canvasObject.getContext("2d");

      let levelPercentage = "N/A";
      let percentageValue = 100;
      percentageValue = levelPercentageValue;

      if (levelPercentageValue < 0) {
        percentageValue = 0;
      }

      if (levelPercentageText == null || levelPercentageText == "") {
        levelPercentage = levelPercentageValue + "%";
      } else {
        if (levelPercentageText != null && levelPercentageText != "") {
          levelPercentage = levelPercentageText;

          if (levelPercentageText == "양호") {
            levelPercentage = 100;
            percentageValue = 100;
          } else if (levelPercentageText == "부족") {
            levelPercentage = 25;
            percentageValue = 25;
          } else if (levelPercentageText == "없음") {
            levelPercentage = 0;
            percentageValue = 0;
          }
        }
      }

      let donutData = {
        labels: [],
        datasets: [
          {
            data: [percentageValue, 100 - percentageValue],
            backgroundColor: [chartColor, "#eeeeee"],
          },
        ],
      };
      let donutOptions = {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: { enabled: false },
        title: {
          display: true,
          position: "bottom",
          fontSize: 16,
          text: `${chartTitleText}`,
        },
        // centerText: {
        //   display: true,
        //   text: "280"
        // },
        elements: {
          center: {
            text: showText ? levelPercentageText : levelPercentage,
            color: "#000000", //Default black
            // fontStyle: 'Helvetica', //Default Arial
            // fontSizes:36,
            sidePadding: 15, //Default 20 (as a percentage)
          },
      },
        onClick: function(c, i) {
          history.push(
            `/printers/device-consumable-detail/${deviceInfoId}/consumable-modal/${consumableModelId}`
          );
        },
        // onHover: function (c, i) {
        // }
      };
      //Create pie or douhnut chart
      // You can switch between pie and douhnut using the method below.
      let DoughnutChart = new window.Chart(donutChartCanvas, {
        type: "doughnut",
        data: donutData,
        options: donutOptions,
      });
    }
  };
  React.useEffect(() => {
    registerChartpluginService();
    getDoughnutChart();
  }, [deviceInfoId,]);

  return (
    <canvas id={canvasId} width="100%" height="auto"></canvas>
  );
};

export default DoughnutComponent;
