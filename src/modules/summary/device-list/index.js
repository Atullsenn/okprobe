import { useEffect, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import { Grid } from "shared/components";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import BuildIcon from "@material-ui/icons/Build";
// import OptionList from "./option-list";
import useStyles from "./style";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "../../../shared/Shared.css";

const defaultState = {
  isFetching: false,
  entries: [],
};

const DeviceList = ({ match }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);

  const columnConfig = [
    {
      id: "displayName",
      field: "displayName",
      label: t("summaryModel"),
      render: (row) => (
        <Typography
          variant="body1"
          className={clsx("Text-Color c-pointer align-right")}
          onClick={() => {
            history.push(
              `/printers/${row.endCustomerId}/device/${row?.deviceInfoId}/last-updated-at/${row?.lastUpdateDt}`
            );
          }}
        >
          {row.displayName}
        </Typography>
      ),
    },
    {
      id: "lastUpdateDt",
      field: "lastUpdateDt",
      label: t("summaryLast update date"),
      render: (row) => (
        <Typography variant="body1" className={clsx("text-bold color-error")}>
          {row.lastUpdateDt}
        </Typography>
      ),
    },
    {
      id: "totalUsagePage",
      field: "totalUsagePage",
      label: t("summaryusage"),
    },
  ];

  const GetEndCustomerDetailDeviceList = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      endCustomerId: match.params.id,
      page: 1,
      onePageDataCount: 10,
      dt1: "",
    };
    const { data, error } = await Service.GetEndCustomerDetailDeviceList(
      payload
    );
    if (error) {
      //toast.error(error); TODO
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  useEffect(() => {
    GetEndCustomerDetailDeviceList();
  }, [match.params.id]);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("summaryDevice list")}</Typography>
      </div>
      <Paper
        elevation={4}
        className="mb-6"
        classes={{
          root: classes.reportGrid,
        }}
      >
        <Grid
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          hidePagination
          hasSelection={false}
        />
      </Paper>
    </>
  );
};
export default DeviceList;
