import { useEffect, useState } from "react";
import clsx from "clsx";
import { ERROR_MESSAGES } from "shared/constants";
import { NavLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { setToken, getChartColorCode, formatDate, daysBetween } from "utils";
import Service from "../service";
import isEmail from "validator/es/lib/isEmail";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OrgImg from "assets/images/org-logo.png";
import KakaoImg from "assets/images/kakao-cta.png";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import useStyles from "./style";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import $ from "jquery";
import { Grid, DoughnutComponent } from "shared/components";
import { useTranslation } from "react-i18next";
import "../../../shared/Shared.css";

let chartIndex = 0;
let chartIdHeader = "toner_";

const DeviceConsumableLevel = ({
  isFetching = false,
  deviceConsumableLevel = [],
  handleDetailClick = () => { },
  lastUpdatedDate = null,
  deviceInfoId = null,
  noticeNoEmail = 0,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const dateDiff = (lastUpdateDateTime) => {
    var lastUpdateDate = lastUpdateDateTime.substring(0, 10);
    var today = formatDate(new Date());
    return daysBetween(lastUpdateDate, today);
  };

  const [hideshow11111, setHideshow] = useState("checked");
  const [checkBoxValues, setCheckBoxValues] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("setcheckvalue") == null) {
      localStorage.setItem("setcheckvalue", "checked");
      setCheckBoxValues(false);
    } else {
      setHideshow(localStorage.getItem("setcheckvalue"));
      localStorage.getItem("setcheckvalue") === "checked"
        ? setCheckBoxValues(false)
        : setCheckBoxValues(true);
    }
  }, []);

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
  }, 50);

  const setHideShowCircleBar = (e) => {
    if (e.target.value === "checked") {
      localStorage.setItem("setcheckvalue", "unchecked");
      setHideshow("unchecked");
      setCheckBoxValues(true);
    } else {
      localStorage.setItem("setcheckvalue", "checked");
      setHideshow("checked");
      setCheckBoxValues(false);
    }
  };

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

  return (
    <Paper elevation={4} className="mb-6">
      <div
        className={classes.usagePagePaper}
        style={{ overflowY: "auto", flexWrap: "wrap" }}
      >
        <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
          <Typography variant="h5" className="mt-4">
            {t("printersConsumables")}
          </Typography>
          <label className={classes.switch}>
            <input
              type="checkbox"
              id="togBtn"
              checked={checkBoxValues}
              value={hideshow11111}
              onClick={(e) => setHideShowCircleBar(e)}
            />
            <div class="slider round"></div>
          </label>
          <Typography
            variant="body1"
            className={clsx("mt-4 mr-4", {
              "color-error": dateDiff(lastUpdatedDate) >= noticeNoEmail,
              [classes.warning]: dateDiff(lastUpdatedDate) == 0,
            })}
          >
            {lastUpdatedDate}
          </Typography>
        </div>
        <Divider />
        {hideshow11111 == "checked" ? (
          <div
            className="d-flex c-pointer f-justify-around"
            style={{ overflowY: "auto", flexWrap: "wrap" }}
          >
            {deviceConsumableLevel.map((consumable) => {
              let currentConsumable = consumable;
              let chartColorCode = getChartColorCode(currentConsumable.color);
              let doughnutChartId = chartIdHeader + chartIndex;
              chartIndex++;
              if (currentConsumable.type === "TONER" || currentConsumable.type === "INK") {
                return (
                  <div className="ml-8 mr-8 circle">
                    <DoughnutComponent
                      canvasId={doughnutChartId}
                      chartTitleText={currentConsumable.displayColor}
                      chartColor={chartColorCode}
                      levelPercentageValue={currentConsumable.currentLevel}
                      levelPercentageText={currentConsumable.currentLevelText}
                      deviceInfoId={deviceInfoId}
                      consumableModelId={currentConsumable.consumableModelId}
                      showText={currentConsumable.displayMethod === "1"}
                    />
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="progressbar">{
            deviceConsumableLevel.map((consumable) => {
              let currentConsumable = consumable;
              if (currentConsumable.type === "TONER" || currentConsumable.type === "INK") {
                return (
                  <div class={`animated-progress progress-${setConsumbleCircle(currentConsumable.color)}`}>
                    <span
                      displayMethod={currentConsumable.displayMethod}
                      data-progress={currentConsumable.currentLevel}
                      currentLevelText={currentConsumable.currentLevelText}
                    />
                  </div>
                )
              }
            })
          }
          </div>
        )}
      </div>
      <Divider />
      {!!deviceConsumableLevel.length && (
        <Button
          className="w-100 pt-1 pb-1"
          color="primary"
          onClick={handleDetailClick}
          classes={{
            root: classes.detailButtonRoot,
            label: classes.detailButtonLabel,
          }}
        >
          <Typography variant="button" className="pt-2 pb-2 Text-Color">
            {t("summaryDetail")}
          </Typography>
        </Button>
      )}
    </Paper>
  );
};
export default DeviceConsumableLevel;
