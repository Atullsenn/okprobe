import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Service from "../../service";
import { Typography, Button, Paper, FormControlLabel, Checkbox, } from "@material-ui/core";
import { Grid, BarChart, Datepicker } from "shared/components";
import { writeXLSFile, getToday, getTime, getDateObject } from "utils";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ShowSaveReport from "./show-report";
import { useTranslation } from 'react-i18next';
import { AppContext } from 'shared/contexts';

const defaultState = {
  entries: [],
  isFetching: false,
  dateFrom: new Date(),
  dateTo: new Date(),
  dateFromDisplay: new Date(),
  dateToDisplay: new Date(),
  viewMode: "D",
  showSaveReport: false,
};

const AdvanveSearch = ({ deviceInfo, deviceInfoId, endCustomerName = '', displayName = '' }) => {
  const { lang } = useContext(AppContext);
  const [state, setState] = useState({
    ...defaultState,
    dateFrom: formatDate(new Date()),
    dateTo: formatDate(new Date()),
  });
  const { t } = useTranslation();

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const exportToExcel = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    let postBody = {
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      deviceInfoId,
      dt1: "",
      viewMode: state.viewMode,
    };

    const { data, error } = await Service.GetDeviceReportData(postBody);

    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({ ...prevState, isFetching: false }));
      let dataToBeWrite = data;
      dataToBeWrite = dataToBeWrite.map((row) => {
        let updatedRow = { ...row };
        Object.keys(updatedRow).map((key) => {
          if (typeof updatedRow[key] === "object") {
            updatedRow[key] =
              updatedRow[key]?.label ||
              updatedRow[key]?.name ||
              updatedRow[key]?.friendlyName ||
              updatedRow[key];

            if (Array.isArray(updatedRow[key])) {
              updatedRow[key] = updatedRow[key].join(",") || updatedRow[key];
            }
          }
          if (typeof updatedRow[key] === "boolean") {
            updatedRow[key] = updatedRow[key] ? "Y" : "N";
          }
          if (key == "rowIndexId") {
            delete updatedRow[key];
          }
        });
        return updatedRow;
      });
      let today = getToday();
      let time = getTime();
      const sheetName = endCustomerName + '_' + displayName + '_' + today + "_" + time;
      writeXLSFile("reportTable", sheetName);
    }
  };

  const GetDeviceReportData = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      deviceInfoId,
      dt1: "",
      viewMode: state.viewMode,
    };
    const { data, error } = await Service.GetDeviceReportData(payload);
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

  function getCommaNumber(value) {
    var numberValue = new Number(value);
    return numberValue
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  }

  const numberText = (value) => {
    return getCommaNumber(value);
  };

  const SaveReport = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      deviceInfoId,
      dt1: "",
      viewMode: state.viewMode,
    };
    const { data, error } = await Service.SaveReport(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      toast.success(t('popupSaved'));
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  const columnConfig = [
    {
      id: "label",
      field: "label",
      label: t('userPagedate'),
      canSort: true,
      secondLabel: t('userPageSum'),
    },
    {
      id: "black",
      field: "black",
      label: "흑백",
      canSort: true,
      secondLabel: (row) => {
        return (
          state.entries.reduce((a, c) => a + parseInt(c.black), 0) ||
          numberText(row.black) ||
          "0"
        );
      },
    },
    {
      id: "color",
      field: "color",
      label: "컬러",
      canSort: true,
      secondLabel: (row) => {
        return (
          state.entries.reduce((a, c) => a + parseInt(c.color), 0) ||
          numberText(row.color) ||
          "0"
        );
      },
    },
    {
      id: "total",
      field: "total",
      label: t('printerAll'),
      canSort: true,
      secondLabel: (row) => {
        return (
          state.entries.reduce((a, c) => a + parseInt(c.total), 0) ||
          numberText(row.total) ||
          "0"
        );
      },
    },
  ];

  useEffect(() => {
    GetDeviceReportData();
  }, [deviceInfoId, state.viewMode, state.dateFrom, state.dateTo]);

  //JSX
  return (
    <>
      {state.showSaveReport ? (
        <>
          <ShowSaveReport deviceInfoId={deviceInfoId} />
        </>
      ) : (
        <>
          <div className="d-flex">
            <Datepicker
              label={t('printersReportFrom')}
              selected={
                typeof state.dateFromDisplay === "string"
                  ? getDateObject(state.dateFromDisplay)
                  : state.dateFromDisplay
              }
              className="mb-8"
              onChange={(date) => {
                setState((prevState) => ({
                  ...prevState,
                  dateFrom: formatDate(date),
                  dateFromDisplay: date,
                }));
              }}
            />
            <Datepicker
              label={t('printersReportTo')}
              selected={
                typeof state.dateToDisplay === "string"
                  ? getDateObject(state.dateToDisplay)
                  : state.dateToDisplay
              }
              className="mb-8 ml-4"
              onChange={(date) => {
                setState((prevState) => ({
                  ...prevState,
                  dateToDisplay: date,
                  dateTo: formatDate(date),
                }));
              }}
            />
            <div className="ml-8">
              <Button
                variant="contained"
                className="mr-2 Btn-Color"
                onClick={() => exportToExcel()}
                style={{ width: '80px' }}
              >
                {t('userPageExcel')}
              </Button>
              <Button
                variant="contained"
                className="mr-2 Btn-Color"
                style={{ width: '80px' }}
                onClick={() => {
                  SaveReport();
                }}
              >
                {t('userPageSave')}
              </Button>
              <Button
                variant="contained"
                className="Btn-Color"
                style={{ width: '80px' }}
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    showSaveReport: true,
                  }));
                }}
              >
                {t('userPageList')}
              </Button>
            </div>
          </div>
          <div className="mt-8 d-flex">
            <Button
              variant="contained"
              color={state.viewMode == "D" ? "primary" : ""}
              style={{ width: '80px' }}
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  viewMode: "D",
                }));
              }}
              className="mr-2 Btn-Color"
            >
              {t('userPageglance')}
            </Button>
            <Button
              variant="contained"
              className={state.viewMode == "M" ? "Btn-Color mr-2" : "mr-2"}
              style={{ width: '80px' }}
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  viewMode: "M",
                }));
              }}
            >
              {t('userPagemonthly')}
            </Button>
            <Button
              variant="contained"
              className={state.viewMode == "Y" ? "Btn-Color" : ""}
              style={{ width: '80px' }}
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  viewMode: "Y",
                }));
              }}
            >
              {t('userPagedate')}
            </Button>
          </div>
          <Paper elevation={4} className="mt-4">
            <Grid
              tableId="reportTable"
              rows={state.entries}
              columns={columnConfig}
              isLoading={state.isFetching}
              hidePagination
              hasSelection={false}
              hasSecondLabel
            />
          </Paper>
        </>
      )}
    </>
  );
};
export default AdvanveSearch;
