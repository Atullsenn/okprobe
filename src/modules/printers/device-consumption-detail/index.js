import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { getChartColorCode, getConsumableLevelText } from "utils";
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { DoughnutComponent } from "shared/components";
import { useTranslation } from "react-i18next";
import useStyles from "./style";
import $ from "jquery";

const defaultState = {
  entries: [],
  isFetching: false,
};
let tonerChartIndex = 0;
let tonerCartIdHeader = "toner_";
let devChartIndex = 0;
let devCartIdHeader = "other_";
let drumChartIndex = 0;
let drumCartIdHeader = "drum_";
const UsagePage = ({ match }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    ...defaultState,
  });

  const { t } = useTranslation();
  const GetDeviceConsumable = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.GetDeviceConsumable({
      deviceInfoId: match.params.deviceId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  setTimeout(() => {
    const newLocal = ".animated-progress span";
    $(newLocal).each(function () {
      const displayMethod = this.attributes[0].value;
      $(this).animate(
        {
          width: $(this).attr("data-progress") + "%",
        },
        1000
      );
      $(this).text($(this).attr("data-progress") + "%");
      if (displayMethod === "1") {
        $(this).text($(this).attr("currentLevelText"));
      }
    });
  }, 500);

  const setConsumbleCircle = (color) => {
    if (color === 'BLACK') {
      return "blue"
    } else if (color === 'YELLOW') {
      return "green"
    } else if (color === 'CYAN') {
      return "purple"
    } else if (color === 'MAGENTA') {
      return "red"
    }
  };

  useEffect(() => {
    GetDeviceConsumable();
  }, []);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("summaryExpendables")}</Typography>
      </div>
      {!!state.entries.filter(
        (item) => item.type === "TONER" || item.type == "INK"
      ).length && (
          <Paper
            elevation={4}
            className="mb-8"
            classes={{
              root: classes.detailsWrapper,
            }}
            style={{ overflowY: "auto", flexWrap: "wrap" }}
          >
            <div
              className="d-flex f-align-center f-justify-between mb-4 ml-4"
              style={{ overflowY: "auto", flexWrap: "wrap" }}
            >
              <Typography variant="h5" className="mt-4">
                {t("summaryToner")}
              </Typography>
            </div>
            <Divider />
            {localStorage.getItem("setcheckvalue") == "checked" ||
              localStorage.getItem("setcheckvalue") == "Null" ? (
              <div className="d-flex c-pointer">
                {state.entries
                  .filter((item) => item.type === "TONER" || item.type == "INK")
                  .map((consumable) => {
                    let currentConsumable = consumable;
                    let chartColorCode = getChartColorCode(
                      currentConsumable.color
                    );
                    let doughnutChartId = tonerCartIdHeader + tonerChartIndex;
                    tonerChartIndex++;
                    return (
                      <div className="ml-8 mr-8 wgraph">
                        <DoughnutComponent
                          canvasId={doughnutChartId}
                          chartTitleText={currentConsumable.displayColor}
                          chartColor={chartColorCode}
                          levelPercentageValue={currentConsumable.currentLevel}
                          levelPercentageText={currentConsumable.currentLevelText}
                          deviceInfoId={match.params.deviceId}
                          consumableModelId={currentConsumable.consumableModelId}
                          showText={currentConsumable.displayMethod === "1"}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="progressbar">
                {state.entries
                  .filter((item) => item.type === "TONER" || item.type == "INK")
                  .map((entries) => {
                    return (
                      <div class={"animated-progress progress-" + setConsumbleCircle(entries.color)}>
                        <span
                          displayMethod={entries.displayMethod}
                          data-progress={entries.currentLevel}
                          currentLevelText={entries.currentLevelText}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </Paper>
        )}
      {!!state.entries.filter((item) => item.type === "DRUM").length && (
        <Paper
          elevation={4}
          className="mb-8"
          classes={{
            root: classes.detailsWrapper,
          }}
          style={{ overflowY: "auto", flexWrap: "wrap" }}
        >
          <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
            <Typography variant="h5" className="mt-4">
              {t("summarydrum")}
            </Typography>
          </div>
          <Divider />
          {localStorage.getItem("setcheckvalue") == "checked" ||
            localStorage.getItem("setcheckvalue") == "Null" ? (
            <div
              className="d-flex c-pointer"
              style={{ overflowY: "auto", flexWrap: "wrap" }}
            >
              {state.entries
                .filter((item) => item.type === "DRUM")
                .map((consumable) => {
                  let currentConsumable = consumable;
                  let chartColorCode = getChartColorCode(
                    currentConsumable.color
                  );
                  let doughnutChartId = drumCartIdHeader + drumChartIndex;
                  drumChartIndex++;
                  return (
                    <div className="ml-8 mr-8">
                      <DoughnutComponent
                        canvasId={doughnutChartId}
                        chartTitleText={currentConsumable.displayColor}
                        chartColor={chartColorCode}
                        levelPercentageValue={currentConsumable.currentLevel}
                        levelPercentageText={currentConsumable.currentLevelText}
                        deviceInfoId={match.params.deviceId}
                        consumableModelId={currentConsumable.consumableModelId}
                        showText={currentConsumable.displayMethod === "1"}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="progressbar">
              {state.entries
                .filter((item) => item.type === "DRUM")
                .map((entries) => {
                  return (
                    <div class={"animated-progress progress-" + setConsumbleCircle(entries.color)}>
                      <span
                        displayMethod={entries.displayMethod}
                        data-progress={entries.currentLevel}
                        currentLevelText={entries.currentLevelText}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </Paper>
      )}
      {!!state.entries.filter(
        (item) => item.type === "DEVELOPMENTUNIT" || item.type == "OTHER"
      ).length && (
          <Paper
            elevation={4}
            classes={{
              root: classes.detailsWrapper,
            }}
            style={{ overflowY: "auto", flexWrap: "wrap" }}
          >
            <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
              <Typography variant="h5" className="mt-4">
                {t("summaryEtc")}
              </Typography>
            </div>
            <Divider />
            {localStorage.getItem("setcheckvalue") == "checked" ||
              localStorage.getItem("setcheckvalue") == "Null" ? (
              <div
                className="d-flex c-pointer"
                style={{ overflowY: "auto", flexWrap: "wrap" }}
              >
                {state.entries
                  .filter(
                    (item) =>
                      item.type === "DEVELOPMENTUNIT" || item.type == "OTHER"
                  )
                  .map((consumable) => {
                    let currentConsumable = consumable;
                    let chartColorCode = getChartColorCode(
                      currentConsumable.color
                    );
                    let doughnutChartId = devCartIdHeader + devChartIndex;
                    devChartIndex++;
                    return (
                      <div className="ml-8 mr-8">
                        <DoughnutComponent
                          canvasId={doughnutChartId}
                          chartTitleText={currentConsumable.displayColor}
                          chartColor={chartColorCode}
                          levelPercentageValue={currentConsumable.currentLevel}
                          levelPercentageText={currentConsumable.currentLevelText}
                          deviceInfoId={match.params.deviceId}
                          consumableModelId={currentConsumable.consumableModelId}
                          showText={currentConsumable.displayMethod === "1"}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="progressbar">
                {state.entries
                  .filter(
                    (item) =>
                      item.type === "DEVELOPMENTUNIT" || item.type == "OTHER"
                  )
                  .map((entries, index) => {
                    const color = ["black", "yellow", "cyan", "magenta"];
                    return (
                      <div
                        class={"animated-progress progress-" + color[index % 4]}
                      >
                        <span
                          displayMethod={entries.displayMethod}
                          data-progress={entries.currentLevel}
                          currentLevelText={entries.currentLevelText}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </Paper>
        )}
    </>
  );
};
export default UsagePage;
