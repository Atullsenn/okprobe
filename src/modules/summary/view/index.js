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
import OptionList from "./option-list";
import useStyles from "./style";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "../../../shared/Shared.css";



const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 100,
  isFetchingBookmark: false,
  isFetchingContract: false,
  isFetching: false,
  isFormOpen: false,
  rowBeingEdited: null,
  caution: 0,
  normal: 0,
  total: 0,
  warning: 0,
  bookMarks: [],
};
const left="left";
const right="right";
const center="center";

const ViewSummary = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();

  const fetchBookmarks = async () => {
    setState((prevState) => ({ ...prevState, isFetchingBookmark: true }));

    const { data, error } = await Service.GetBookmarkList({
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      dataCount: 10,
    });

    if (error) {
      //toast.error(error);: Todo
      setState((prevState) => ({ ...prevState, isFetchingBookmark: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetchingBookmark: false,
        bookMarks: data || defaultState.bookMarks,
      }));
    }
  };

  const fetchEntries = async () => {
    setState((prevState) => ({ ...prevState, isFetchingContract: true }));

    const { data, error } = await Service.contractStatus({
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      dataCount: 10,
    });

    if (error) {
      //alert(error);
      setState((prevState) => ({ ...prevState, isFetchingContract: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetchingContract: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  const fetchSummaryStatus = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.getSummaryStatus();

    if (error) {
      //alert(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        caution: data.caution || defaultState.caution,
        normal: data.normal || defaultState.normal,
        total: data.total || defaultState.total,
        warning: data.warning || defaultState.warning,
      }));
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchSummaryStatus();
    fetchBookmarks();
  }, []);


 /* function getAlign(x)
  {
    const typ=typeof x;
    if(typ=="string")
    {
      return "center";
    }
    else
    {
      return "left";
    }
    
   
  }*/

  const columnConfig = [
    {
      id: "displayName",
      fieldName: "displayName",
      label: t("dashboardDevice name"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{textAlign: "left"}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.displayName}
          </Typography>
        );
      },
    },
    {
      id: "deviceSerial",
      field: "deviceSerial",
      label: t("dashboardSerial Number"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.deviceSerial}
          </Typography>
        );
      },
    },
    {
      id: "location",
      field: "location",
      label: t("dashboardLocation"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.location}
          </Typography>
        );
      },
    },
    {
      id: "endCustomerName",
      field: "endCustomerName",
      label: t("dashboardCustomer Name"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.endCustomerName}
          </Typography>
        );
      },
    },
    {
      id: "startDt",
      field: "startDt",
      label: t("dashboardStart date"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{textAlign: "center"}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.startDt}
          </Typography>
        );
      },
    },
    {
      id: "endDt",
      field: "endDt",
      label: t("dashboardEnd date"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{textAlign: "center"}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.endDt}
          </Typography>
        );
      },
    },
    {
      id: "remainDate",
      field: "remainDate",
      label: t("dashboardRemaingDate"),
      // canSort: true,
      render: (row) => {
        return (
          <Typography
            variant="body1"
            className="c-pointer align-right"
            onClick={() => {
              history.push(`/new-printers/assign-printers/${row.deviceInfoId}`);
            }}
          >
            {row.remainDate
              ? new Intl.NumberFormat("en-US").format(row.remainDate)
              : ""}
          </Typography>
        );
      },
    },
  ];

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t('dashboardLabel')}</Typography>
      </div>
      <Paper elevation={4}>
        <div className={clsx("d-flex f-align-center p-4", classes.divider)}>
          <Typography variant="h6">{t("dashboardStatus")}</Typography>
        </div>
        <div className="main-card">
          <div
            className={clsx("col-md-4-card bg-all", classes.statusBox)}
            onClick={() => {
              history.push(`/printers/status/A`);
            }}
          >
            <div className="d-flex flex-column f-justify-between card-padding color-white">
              <Typography variant="h4" className="text-bold">
                {state.total}
              </Typography>
              <Typography variant="body1" className="text-bold">
                {t("dashboardAll")}
              </Typography>
            </div>
            <div className="card-padding">
              <AcUnitIcon className="card-img" />
            </div>
          </div>
          <div
            className={clsx("col-md-4-card bg-normal", classes.statusBox)}
            onClick={() => {
              history.push(`/printers/status/N`);
            }}
          >
            <div className="d-flex flex-column f-justify-between card-padding color-white">
              <Typography variant="h4" className="text-bold">
                {state.normal}
              </Typography>
              <Typography variant="body1" className="text-bold">
                {t("dashboardNormal")}
              </Typography>
            </div>
            <div className="card-padding">
              <FavoriteIcon className="card-img" />
            </div>
          </div>
          <div
            className={clsx("col-md-4-card bg-caution", classes.statusBox)}
            onClick={() => {
              history.push(`/printers/status/C`);
            }}
          >
            <div className="d-flex flex-column f-justify-between card-padding">
              <Typography variant="h4" className="text-bold">
                {state.caution}
              </Typography>
              <Typography variant="body1" className="text-bold">
                {t("dashboardCaution")}
              </Typography>
            </div>
            <div className="card-padding">
              <ReportProblemIcon className="card-img cardIcon" />
            </div>
          </div>
          <div
            className={clsx("col-md-4-card bg-check", classes.statusBox)}
            onClick={() => {
              history.push(`/printers/status/W`);
            }}
          >
            <div className="d-flex flex-column f-justify-between card-padding color-white">
              <Typography variant="h4" className="text-bold">
                {state.warning}
              </Typography>
              <Typography variant="body1" className="text-bold">
                {t("dashboardCheck")}
              </Typography>
            </div>
            <div className="card-padding">
              <BuildIcon className="card-img" />
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={4} className="mt-8">
        <div className={clsx("d-flex  f-align-center p-4", classes.divider)}>
          <Typography variant="h6">{t("dashboardBookmarks")}</Typography>
        </div>
        {!!state.bookMarks.length ? (
          <Paper
          className={clsx("pl-5 pr-5 pt-5 pb-5", classes.newbookmark)}
            classes={{
              root: classes.bookmarkWrapper,
            }}
            style={{ borderRadius: 4, flexWrap: 'wrap', overflowY: 'auto'}}
          >
            {state.bookMarks.map((bookmark) => {
              return (
                <Paper
                  classes={{
                    root: classes.bookmarkPaper,
                  }}
                  elevation={4}
                  className={clsx("d-flex f-align-center p-1 m-2")}
                >
                  <div
                    className={clsx(
                      "d-flex f-justify-center p-1",
                      classes.bookmarkDiv
                    )}
                  >
                    <span className={clsx(classes.startIcon)}>
                      <i class="far fa-star"></i>
                    </span>
                  </div>
                  <div className='pr-2'>
                    <Typography
                      variant="body2"
                      className="Text-Color c-pointer ml-2"
                      onClick={() => {
                        history.push(
                          `/summary/device-list/${bookmark.endCustomerId}`
                        );
                      }}
                      noWrap
                    >
                      {bookmark.partnerName}
                    </Typography>
                    <Typography variant="body2" className="text-bold ml-2">
                      {bookmark.totalDeviceCount}
                    </Typography>
                  </div>
                </Paper>
              );
            })}
          </Paper>
        ) : (
          <Paper elevation={4} className="d-flex f-align-center p-4">
            <div
              className="bg-caution pl-3 pr-2 pt-1 pb-1"
              style={{ borderRadius: 4 }}
            >
              <ReportProblemIcon style={{ fontSize: "40px" }} />
            </div>
            <Typography variant="body1" className="ml-2">
              {" "}
              {t("dashboardThere is no favorite material")}
            </Typography>
          </Paper>
        )}
      </Paper>
      <Paper elevation={4} className="mt-8">
        <div className={clsx("d-flex f-align-center p-4", classes.divider)}>
          <Typography variant="h6">{t("dashboardContract status")}</Typography>
        </div>
        <Grid
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetchingContract}
          hidePagination
          hasSelection={false}
          hideNoRecordImage
          passedClasses={{
            container:classes.contractGrid
          }}
        />
      </Paper>
      <Paper elevation={4} className="mt-8">
        <OptionList />
      </Paper>
    </>
  );
};

export default ViewSummary;
