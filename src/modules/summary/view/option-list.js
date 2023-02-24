import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
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
import useStyles from "./style";
import { Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import "../../../shared/Shared.css";
import {  Dialog,DialogActions,DialogContent,DialogTitle,FormControlLabel,Checkbox,} from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import { CenterFocusStrong } from "@material-ui/icons";

const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 100,
  isFetching: false,
  isFormOpen: false,
  rowBeingEdited: null,
  order: 'D',
  orderBy: 'log_dt',
  isFiltering: false,
  serviceKey: [11, 13],
};

const left="left";
const right="right";
const center="center";

/*function getAlign(x)
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




let serviceKeyClone = [];

const ViewSummary = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();
  const filterArr = [
    { label: t('dashboardToner/Ink'), value: 11 },
    { label: t('dashboardDrum'), value: 13 },
    { label: t('dashboardOthers'), value: 12 },
    { label: t('dashboardDevice'), value: 20 },
    { label: t('dashboardTray'), value: 21 },
    { label: t('dashboardNo Paper'), value: 22 },
    { label: t('dashboardAdf'), value: 23 },
    { label: t('dashboardNot Defined'), value: 29 },
  ];

  const handleChange = (event) => {
    if (event.target.checked) {
      const eventObj = filterArr.find(
        (item) => item.label === event.target.name
      );
      setState((prevState) => ({
        ...prevState,
        serviceKey: [...prevState.serviceKey, eventObj?.value],
      }));
    } else if (!event.target.checked) {
      const eventObj = filterArr.find(
        (item) => item.label === event.target.name
      );
      setState((prevState) => ({
        ...prevState,
        serviceKey: prevState.serviceKey.filter(
          (item) => item !== eventObj.value
        ),
      }));
    }
  };

  const fetchEntries = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.optionList({
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      dataCount: 30,
      serviceKey: state.serviceKey.join(","),
      sortField: state.orderBy,
      sortOrder: state.order,
    });

    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
        totalEntries: data[0] && data[0]?.rowcount || defaultState.totalEntries,
      }));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [state.order, state.orderBy, state.pageSize, state.pageNumber]);

  const columnConfig = [
    {
      id: "log_dt",
      field: "log_dt",
      label: t('timelineDate'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: center}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/printers/event-list/${row.deviceInfoId}`);
            }}
          >
            {row.logDt}
          </Typography>
        );
      },
    },
    {
      id: "deviceSerial",
      field: "deviceSerial",
      label: t('dashboardType'),
      headerClasss: classes.headerClasss,
      render: (row) => {
        if (row.serviceKey == "00" || row.serviceKey == "10") {
          return (
            <ErrorOutlineIcon
              className="c-pointer"
              onClick={() => {
                history.push(`/printers/event-list/${row.deviceInfoId}`);
              }}
            />
          );
        } else if (row.serviceKey == "11") {
          return (
            <WarningIcon
              className="c-pointer"
              onClick={() => {
                history.push(`/printers/event-list/${row.deviceInfoId}`);
              }}
            />
          );
        } else {
          return (
            <InfoIcon
              className="c-pointer"
              onClick={() => {
                history.push(`/printers/event-list/${row.deviceInfoId}`);
              }}
            />
          );
        }
      },
    },
    {
      id: "service_key_description",
      field: "service_key_description",
      label: t('dashboardKind'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/printers/event-list/${row.deviceInfoId}`);
            }}
          >
            {row.serviceKeyDescription}
          </Typography>
        );
      },
    },
    {
      id: "company_name",
      field: "company_name",
      label: t('dashboardEPSOFT'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/printers/event-list/${row.deviceInfoId}`);
            }}
          >
            {row.endCustomerName}
          </Typography>
        );
      },
    },
    {
      id: "display_name",
      field: "display_name",
      label: t('dashboardPrinter name'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/printers/event-list/${row.deviceInfoId}`);
            }}
          >
            {row.displayName}
          </Typography>
        );
      },
    },
    {
      id: "description",
      field: "description",
      label: t('dashboardNote'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
          style={{ textAlign: left}}
            variant="body1"
            className="c-pointer"
            onClick={() => {
              history.push(`/printers/event-list/${row.deviceInfoId}`);
            }}
          >
            {row.description}
          </Typography>
        );
      },
    },
  ];

  const handleSortChange = useCallback((fieldObj, order) => {
    setState((prevState) => ({
      ...prevState,
      order: order,
      orderBy: fieldObj.field || fieldObj.fieldName,
    }));
  }, []);

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      isFiltering: false,
      serviceKey: serviceKeyClone,
    }));
    serviceKeyClone = [];
  };

  const  handlePageSizeChange = evt => {
    setState(prevState => ({
      ...prevState,
      pageSize: evt,
      pageNumber: defaultState.pageNumber
    }));
  };
  
  const  handlePageNumberChange = evt => {
    setState(prevState => ({
      ...prevState,
      pageNumber: evt,
    }));
  };

  return (
    <>
      <div className={clsx("d-flex f-align-center p-4", classes.divider)}>
        <Typography variant="h6" >
          {t('dashboardOption list')}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              isFiltering: true,
            }));
            serviceKeyClone = state.serviceKey;
          }}
          className="ml-10 Btn-Color"
        >
          {t('dashboardSelect type')}
        </Button>
      </div>
      <Grid
        rows={state.entries}
        columns={columnConfig}
        isLoading={state.isFetching}
        hasSelection={false}
        onSortChange={handleSortChange}
        order={state.order}
        orderBy={state.orderBy}
        pageSize={state.pageSize}
        pageNumber={state.pageNumber}
        totalRows={state.totalEntries}
        onPageSizeChange={handlePageSizeChange}
        onPageNumberChange={handlePageNumberChange}
      />
      <Dialog
        onClose={() => {
          handleClose();
        }}
        open={state.isFiltering}
        classes={{
          paper: classes.typeFilterModal,
        }}
      >
        <DialogTitle>
          <div className="d-flex f-align-center f-justify-between">
            <Typography variant="h5">유형 선택</Typography>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="mt-4">
          {filterArr.map((item) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      state.serviceKey.includes(item.value) ||
                      state.serviceKey.length === 8
                    }
                    onChange={handleChange}
                    name={item.label}
                  />
                }
                label={item.label}
              />
            );
          })}
        </DialogContent>
        <Divider />
        <DialogActions>
          <div className="d-flex">
            <Button
              variant="outlined"
              className={`mr-4 mt-2 mb-2 ${classes.ButtonSimilarWidth}`}
              onClick={() => {
                handleClose();
              }}
            >
              {t('dashboardClose')}
            </Button>
            <Button
              variant="contained"
              className={`mr-2 mt-2 mb-2 Btn-Color ${classes.ButtonSimilarWidth}`}
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isFiltering: false,
                }));
                fetchEntries();
              }}
            >
              {t('dashboardSelect')}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewSummary;
