import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Service from "../service";
import {
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import { Grid } from "shared/components";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useTranslation } from 'react-i18next';
import useStyles from '../style';

const defaultState = {
  eventList: [],
  isFetching: false,
  pageSize: 50,
  pageNumber: 1,
  totalPages: 0,
  serviceKey: [11,13],
};

const EventComponent = ({ match }) => {
  const [state, setState] = useState(defaultState);
  const classes=useStyles();
  const { t } = useTranslation();

  const filterArr = [
    { label: t('dashboardAAll'), value: "ALL" },
    { label: t('dashboardToner/Ink'), value: 11 },
    { label: t('dashboardDrum'), value: 13 },
    { label: t('dashboardOthers'), value: 12 },
    { label: t('dashboardDevice'), value: 20 },
    { label: t('dashboardTray'), value: 21 },
    { label: t('dashboardNo Paper'), value: 22 },
    { label: t('dashboardAdf'), value: 23 },
    { label: t('dashboardNot Defined'), value: 29 },
  ];
  

  const columnConfig = [
    {
      id: "serviceKey",
      field: "serviceKey",
      label: t('summarytype'),
      headerClasss: classes.headerClasss,
      // canSort: true,
      render: (row) => {
        if (row.serviceKey == "00" || row.serviceKey == "10") {
          return <ErrorOutlineIcon />;
        } else if (row.serviceKey == "11") {
          return <WarningIcon />;
        } else {
          return <InfoIcon />;
        }
      },
    },
    {
      id: "description",
      field: "description",
      label: t('dashboardNote'),
      // canSort: true,
    },
    {
      id: "logDt",
      field: "logDt",
      label: t('printerLast update date'),
      // canSort: true,
    },
  ];

  const GetEventList = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      deviceInfoId: match.params.deviceId,
      dt1: "",
      onePageDataCount: state.pageSize,
      page: state.pageNumber,
      serviceKey: state.serviceKey.join(","),
      // sortField: "log_dt",
      // sortOrder: "D"
    };
    const { data, error } = await Service.GetEventList(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        eventList: data.Event || defaultState.memoList,
        totalPages: data.TotalPage || defaultState.totalPages,
      }));
    }
  };

  const handleChange = (event) => {
    if (event.target.checked && event.target.name !== t('dashboardAAll')) {
      const eventObj = filterArr.find(
        (item) => item.label === event.target.name
      );
      setState((prevState) => ({
        ...prevState,
        serviceKey: [...prevState.serviceKey, eventObj?.value],
      }));
    } else if (!event.target.checked && event.target.name !== t('dashboardAAll')) {
      const eventObj = filterArr.find(
        (item) => item.label === event.target.name
      );
      setState((prevState) => ({
        ...prevState,
        serviceKey: prevState.serviceKey.filter(
          (item) => item !== eventObj.value
        ),
      }));
    } else if (event.target.checked && event.target.name === t('dashboardAAll')) {
      setState((prevState) => ({
        ...prevState,
        serviceKey: [12, 20, 22, 23, 29, 21, 13, 11],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        serviceKey: [],
      }));
    }
  };

  useEffect(() => {
    GetEventList();
  }, [state.pageSize, state.pageNumber, state.serviceKey]);

  //JSX
  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t('summaryevent')}</Typography>
      </div>
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
      <Paper elevation={4}>
        <Grid
          isLoading={state.isFetching}
          rows={state.eventList}
          columns={columnConfig}
          hasSelection={false}
          totalRows={state.totalPages}
          pageSize={state.pageSize}
          pageNumber={state.pageNumber}
          onPageNumberChange={(pageNumber) => {
            setState((prevState) => ({
              ...prevState,
              pageNumber,
            }));
          }}
          onPageSizeChange={(pageSize) => {
            setState((prevState) => ({
              ...prevState,
              pageSize,
            }));
          }}
          passedClasses={{
            tableCell: classes.tableCell
          }}
        />
      </Paper>
    </>
  );
};
export default EventComponent;
