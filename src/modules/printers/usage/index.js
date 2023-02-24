import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import { formatDate, daysBetween, writeXLSFile, getDateObject } from 'utils';
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, Datepicker } from "shared/components";
import $ from 'jquery';
import { useTranslation } from "react-i18next";
import "../../../shared/Shared.css";

const defaultState = {
  entries: [],
  isFetching: false,
  viewDate: new Date(),
  dateForApi: new Date(),
};

const UsagePage = ({ match }) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    ...defaultState,
    viewDate: match.params.lastUpdatedDate.split(" ")?.[0],
    dateForApi: match.params.lastUpdatedDate.split(" ")?.[0],
  });

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  const GetDevicePaperUsage2 = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.GetDevicePaperUsage2({
      deviceInfoId: match.params.deviceId,
      viewDate: state.dateForApi,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data?.PaperUsage || defaultState.entries,
        // viewDate: data?.ActualViewDate || defaultState.viewDate,
        // dateForApi : data?.ActualViewDate || defaultState.viewDate,
      }));
    }
  };

  useEffect(() => {
    GetDevicePaperUsage2();
  }, [state.dateForApi]);

  const exportToExcel = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    let postBody = {
      deviceInfoId: match.params.deviceId,
      viewDate: state.viewDate,
      dt1: "",
    };

    const { data, error } = await Service.GetDevicePaperUsage2(postBody);
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({ ...prevState, isFetching: false }));
      let dataToBeWrite = data?.PaperUsage;
      dataToBeWrite = dataToBeWrite.map(row => {
        let updatedRow = { ...row };
        Object.keys(updatedRow).map(key => {
          if (typeof updatedRow[key] === 'object') {
            updatedRow[key] =
              updatedRow[key]?.label ||
              updatedRow[key]?.name ||
              updatedRow[key]?.friendlyName ||
              updatedRow[key];
            if (Array.isArray(updatedRow[key])) {
              updatedRow[key] = updatedRow[key].join(',') || updatedRow[key];
            }
          }
          if (typeof updatedRow[key] === 'boolean') {
            updatedRow[key] = updatedRow[key] ? 'Y' : 'N';
          }
          if (key == 'rowIndexId') {
            delete updatedRow[key];
          }
        });
        return updatedRow;
      });

      let sheetName = formatDate(match.params.lastUpdatedDate.split(" ")?.[0]) + "-" + formatDate(state.viewDate) + '-' + formatDate(new Date());
      writeXLSFile(
        'usagePageTable',
        sheetName,
      );
    }
  };

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
        <Typography variant="body1" className={("align-right")}>
          {row.count ? new Intl.NumberFormat('en-US').format(row.count) : ''}
        </Typography>
      ),
    },
    {
      id: "delta",
      fieldName: "delta",
      label: t('userPageUsage page'),
      // canSort: true,
      render: (row) => (
        <Typography variant="body1" className={("align-right")}>
          {row.delta ? new Intl.NumberFormat('en-US').format(row.delta) : ''}
        </Typography>
      ),
    },
  ];

  setTimeout(() => {
    $(".MuiTableContainer-root").css("min-height", '585px')
  }, 200);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t('userPageUsage page')}</Typography>
        <div className="d-flex">
          <Datepicker
            label={t("date")}
            className="setPadding"
            selected={
              typeof state.viewDate === "string"
                ? getDateObject(state.viewDate)
                : state.viewDate
            }
            onChange={(date) => {
              setState((prevState) => ({
                ...prevState,
                viewDate: date,
                dateForApi: formatDate(date),
              }));
            }}
          />
          <Button
            variant="contained"
            className="ml-4 Btn-Color"
            style={{ height: '46px', width: '160px', margin: '0px 10px' }}
            onClick={() => exportToExcel()}
          >
            {t('userPageExcel')}
          </Button>
        </div>
      </div>
      <Paper elevation={4}>
        <Grid
          tableId='usagePageTable'
          isLoading={state.isFetching}
          rows={state.entries}
          columns={columnConfig}
          hidePagination
          hasSelection={false}
        />
      </Paper>
    </>
  );
};
export default UsagePage;
