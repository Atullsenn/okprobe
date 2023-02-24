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
import $ from 'jquery';
import { Grid } from "shared/components";
import "../../../shared/Shared.css";
import { useTranslation } from "react-i18next";

const UsagePageComponent = ({
  isFetching = false,
  usagePageEntries = [],
  handleDetailClick = () => {},
  lastUpdatedDate = null,
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
  //   colorTypeName: "전체"
  // count: 33751
  // delta: 0
  // duplexTypeName: "전체"
  // mediaDescription: "전체"
  // printTypeName: "전체"
  const columnConfig = [
    {
      id: "mediaDescription",
      field: "mediaDescription",
      label: t('summaryPaper size'),
      // canSort: true,
    },
    {
      id: "colorTypeName",
      field: "colorTypeName",
      label: t('summarycolor'),
      // canSort: true,
    },
    {
      id: "printTypeName",
      field: "printTypeName",
      label: t('summarytype'),
      // canSort: true,
    },
    {
      id: "duplexTypeName",
      field: "duplexTypeName",
      label: t('summaryboth sides'),
      // canSort: true,
    },
    {
      id: "count",
      fieldName: "count",
      label: t('summaryLong live'),
      // canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("align-right")}>
          {row.count ? new Intl.NumberFormat('en-US').format(row.count) : ''}
        </Typography>
      ),
    },
    {
      id: "delta",
      fieldName: "delta",
      label:t('summaryChange'),
      // canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("align-right")}>
          {row.delta ? new Intl.NumberFormat('en-US').format(row.delta) : ''}
        </Typography>
      ),
      
    },
  ];


  setTimeout(() => 
  {
  $(".MuiTableContainer-root").css("min-height",'130px')
  $(".MuiTableContainer-root").css("overflow",'inherit')

  }, 200);


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
          {t("summaryUsage page")}
        </Typography>
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
      <div style={{ height: 400, width: '100%' }} className={classes.usagePageGrid}>
        <Grid
         className={classes.tablefixed}
          hasSelection={false}
          isLoading={isFetching}
          rows={usagePageEntries}
          columns={columnConfig}
          hidePagination
          hideNoRecordImage
        />
      </div>
      {!!usagePageEntries.length && (
        <>
          <Divider />
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
        </>
      )}
    </Paper>
  );
};
export default UsagePageComponent;
