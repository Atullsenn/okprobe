import { useEffect, useState } from "react";
import clsx from "clsx";
import { ERROR_MESSAGES } from "shared/constants";
import { NavLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { setToken, formatDate, daysBetween } from "utils";
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
import { Grid } from "shared/components";
import { useTranslation } from "react-i18next";

const TrayComponent = ({
  isFetching = false,
  trayEntries = [],
  lastUpdatedDate = null,
  partnerSetting = null,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const dateDiff = (lastUpdateDateTime) => {
    var lastUpdateDate = lastUpdateDateTime.substring(0, 10);
    var today = formatDate(new Date());
    return daysBetween(lastUpdateDate, today);
  };

  const columnConfig = [
    {
      id: "trayId",
      field: "trayId",
      label: t("summarytray"),
      // canSort: true,
    },
    {
      id: "capability",
      field: "capability",
      label: t("summaryVolume"),
      // canSort: true,
    },
    {
      id: "paperSize",
      field: "paperSize",
      label: t("summaryPaper size"),
      // canSort: true,
    },
    {
      id: "paperType",
      field: "paperType",
      label: t("summaryPaper type"),
      // canSort: true,
    },
    {
      id: "status",
      field: "status",
      label: t("summarystate"),
      // canSort: true,
    },
  ];

  return (
    <Paper
      elevation={4}
      className="mb-6"
      classes={{
        root: classes.usagePagePaper,
      }}
    >
      <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
        <Typography variant="h5" className="mt-4">
          {t("summarytray")}
        </Typography>
        <Typography variant="body1" className={clsx("mt-4 mr-4", {
          "color-error": dateDiff(lastUpdatedDate) >= partnerSetting.noticeNoEmail,
          [classes.warning]: dateDiff(lastUpdatedDate) == 0,
        })}
        >
          {lastUpdatedDate}
        </Typography>
      </div>
      <Divider />
      <Grid
        hideNoRecordImage
        hasSelection={false}
        isLoading={isFetching}
        rows={trayEntries}
        columns={columnConfig}
        hidePagination
      />
    </Paper>
  );
};
export default TrayComponent;