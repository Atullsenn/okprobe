import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Service from "../service";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useTranslation } from "react-i18next";
import useStyles from "./style";
import $ from "jquery";
import { formatDate, daysBetween, writeXLSFile, getToday, getTime, } from "utils";
import "../../../shared/Shared.css";
import { Grid } from "shared/components";

const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 50,
  status: null,
  fetchingParnters: false,
  fetchingPrinters: false,
  partnerSetting: {},
  order: null,
  orderBy: null,
};

const ViewPrinters = ({ match, history }) => {
  const search = useLocation().search;
  const pageSize = new URLSearchParams(search).get('pageSize') || 50;
  const pageNumber = new URLSearchParams(search).get('pageNumber') || 1;
  const classes = useStyles();
  const { t } = useTranslation();
  const printerState = [
    { label: t('printerAll'), value: "A" },
    { label: t('printernormal'), value: "N" },
    { label: t('printercaution'), value: "C" },
    { label: t('printercheck'), value: "W" },
  ];

  const [state, setState] = useState({
    ...defaultState,
    status: match?.params?.status ? match?.params?.status : printerState[0].value
  });

  const getRowCount = async (totalPage) => {
    const { data } = await Service.post({
      status: state.status,
      page: totalPage,
      onePageDataCount: pageSize,
      endCustomerId: "0",
      dt1: "",
      sortField: state.order,
      sortOrder: state.orderBy,
    });
    setState(prevState => ({
      ...prevState,
      totalEntries: (((+totalPage - 1) * pageSize) + data?.Device?.length) || prevState.totalEntries,
    }));
  };

  const fetchPrinters = async () => {
    setState((prevState) => ({ ...prevState, fetchingPrinters: true }));
    const { data, error } = await Service.post({
      status: state.status,
      page: pageNumber,
      onePageDataCount: pageSize,
      endCustomerId: "0",
      dt1: "",
      sortField: state.orderBy,
      sortOrder: state.order,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, fetchingPrinters: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingPrinters: false,
        entries: data?.Device || defaultState.entries,
      }));
      getRowCount(data.TotalPage)
    }
  };

  const fetchPartnerSetting = async () => {
    setState((prevState) => ({ ...prevState, fetchingParnters: true }));
    const { data, error } = await Service.GetPartnerSetting({
      dt1: "",
    });
    if (error) {
      setState((prevState) => ({ ...prevState, fetchingParnters: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingParnters: false,
        partnerSetting: data,
      }));
    }
  };

  useEffect(async () => {
    await fetchPrinters();
    await fetchPartnerSetting();
  }, [
    pageNumber,
    pageSize,
    state.status,
    state.orderBy,
    state.order,
  ]);

  function getDeviceStatusTitle(deviceStatus) {
    deviceStatus = deviceStatus.toUpperCase();
    var deviceStatusTitle = "";
    if (deviceStatus == "A") {
      deviceStatusTitle = "전체";
    } else if (deviceStatus == "N") {
      deviceStatusTitle = "정상";
    } else if (deviceStatus == "C") {
      deviceStatusTitle = "주의";
    } else if (deviceStatus == "W") {
      deviceStatusTitle = "점검";
    }
    return deviceStatusTitle;
  }

  const dateDiff = (lastUpdateDateTime) => {
    var lastUpdateDate = lastUpdateDateTime.substring(0, 10);
    var today = formatDate(new Date());
    return daysBetween(lastUpdateDate, today);
  };

  const noticeNoEmail = () => {
    return state.partnerSetting.noticeNoEmail;
  };

  const exportToExcel = async () => {
    setState((prevState) => ({ ...prevState, fetchingPrinters: true }));
    let postBody = {
      status: 'A',
      page: pageNumber,
      onePageDataCount: 10000,
      endCustomerId: "0",
      sortField: "company_name",
      sortOrder: "A",
      dt1: "",
    };

    const { data, error } = await Service.post(postBody);
    if (error) {
      setState((prevState) => ({ ...prevState, fetchingPrinters: false }));
    } else {
      setState((prevState) => ({ ...prevState, excelData: data?.Device || [], fetchingPrinters: false }));
      // let dataToBeWrite = data?.Device;
      // dataToBeWrite = dataToBeWrite.map((row) => {
      //   let updatedRow = { ...row };
      //   Object.keys(updatedRow).map((key) => {
      //     if (typeof updatedRow[key] === "object") {
      //       updatedRow[key] =
      //         updatedRow[key]?.label ||
      //         updatedRow[key]?.name ||
      //         updatedRow[key]?.friendlyName ||
      //         updatedRow[key];
      //       if (Array.isArray(updatedRow[key])) {
      //         updatedRow[key] = updatedRow[key].join(",") || updatedRow[key];
      //       }
      //     }
      //     if (typeof updatedRow[key] === "boolean") {
      //       updatedRow[key] = updatedRow[key] ? "Y" : "N";
      //     }
      //     if (key == "rowIndexId") {
      //       delete updatedRow[key];
      //     }
      //   });
      //   return updatedRow;
      // });
      let today = getToday();
      let time = getTime();
      const sheetName = "장비목록_" + today + "_" + time;
      setTimeout(() => writeXLSFile("deviceListTableForExcel", sheetName), 1000);
    }
  };

  const handleSortChange = useCallback((fieldObj, order) => {
    setState((prevState) => ({
      ...prevState,
      order: order,
      orderBy: fieldObj.field || fieldObj.fieldName,
    }));
  }, []);

  const columnConfig = [
    {
      id: "status_order",
      field: "status_order",
      label: t('printerStatus'),
      canSort: true,
      render: (row) => (
        <Typography
          style={{ textAlign: "center" }}
          variant="body1"
          className={clsx({
            "color-error": row.status == "W",
            [classes.warning]: row.status == "C",
          })}
        >
          {getDeviceStatusTitle(row.status)}
        </Typography>
      ),
    },
    {
      id: "company_name",
      fieldName: "company_name",
      label: t('printercustomer'),
      canSort: true,
      render: (row) => (
        <Link

          component={NavLink}
          to={`/printers/${row.endCustomerId}/device/${row?.deviceInfoId}/last-updated-at/${row?.lastUpdateDt}`}
        >
          {row.endCustomerName}
        </Link>
      ),
    },
    {
      id: "display_name",
      field: "display_name",
      label: t('printerModel'),
      canSort: true,
      render: (row) => (
        <Typography
          variant="body1"
        >
          {row.displayName}
        </Typography>
      ),
    },
    {
      id: "device_serial",
      field: "device_serial",
      label: t('summarySerial Number'),
      canSort: true,
      render: (row) => (
        <Typography
          style={{ textAlign: "center" }}
          variant="body1"
        >
          {row.deviceSerial}
        </Typography>
      ),
    },
    {
      id: "location",
      field: "location",
      label: t('dashboardLocation'),
      canSort: true,
    },
    {
      id: "last_update_dt",
      fieldName: "last_update_dt",
      label: t('printerLast update date'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
            style={{ textAlign: "center" }}
            variant="body1"
            className={clsx("text-bold", {
              "color-error": dateDiff(row.lastUpdateDt) >= noticeNoEmail(),
              [classes.warning]: dateDiff(row.lastUpdateDt) == 0,
            })}
          >
            {row.lastUpdateDt}
          </Typography>
        )
      },
    },
    {
      id: "total_usage_page",
      fieldName: "total_usage_page",
      label: t('printerTotal count'),
      canSort: true,
      render: (row) => (
        <Typography
          variant="body1"
          className={clsx("align-right")}
        >
          {row.totalUsagePage ? new Intl.NumberFormat('en-US').format(row.totalUsagePage) : ''}
        </Typography>
      ),
    },
    {
      id: "total_delta_page",
      fieldName: "total_delta_page",
      label: t('printerDelta'),
      canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("color-text-link align-right")}>
          {row.totalDeltaPage ? new Intl.NumberFormat('en-US').format(row.totalDeltaPage) : ''}
        </Typography>
      ),
    },
    {
      id: "color_usage_page",
      fieldName: "color_usage_page",
      label: t('printerColour count'),
      canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("align-right")}>
          {row.colorUsagePage ? new Intl.NumberFormat('en-US').format(row.colorUsagePage) : ''}
        </Typography>
      ),
    },
    {
      id: "color_delta_page",
      fieldName: "color_delta_page",
      label: t('printerDelta'),
      canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("color-text-link align-right")}>
          {row.colorDeltaPage ? new Intl.NumberFormat('en-US').format(row.colorDeltaPage) : ''}
        </Typography>
      ),
    },
    {
      id: "mono_usage_page",
      fieldName: "mono_usage_page",
      label: t('printerMono'),
      canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("align-right")}>
          {row.monoUsagePage ? new Intl.NumberFormat('en-US').format(row.monoUsagePage) : ''}
        </Typography>
      ),
    },
    {
      id: "mono_delta_page",
      fieldName: "mono_delta_page",
      label: t('printerDelta'),
      canSort: true,
      render: (row) => (
        <Typography variant="body1" className={clsx("color-text-link right-align")}>
          {row.monoDeltaPage ? new Intl.NumberFormat('en-US').format(row.monoDeltaPage) : ''}
        </Typography>
      ),
    },
  ];

  const myclassadd = (t('printerStatus') === "Status") ? "break-spaces" : 'nowrap';
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      status: match.params.status || printerState[0].value,
      order: null,
      orderBy: null,
    }));
  }, [match.params.status]);

  setTimeout(() => {
    $(".makeStyles-container-13").css("padding-top", '10px')
    $(".MuiButtonBase-root").css("white-space", myclassadd)
  }, 200);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t('printerEquipment list')}</Typography>
      </div>
      <Paper elevation={4}>
        <div className={clsx("d-flex f-justify-end p-2", classes.divider)}>
          <FormControl
            variant="outlined"
            className={clsx("w-25", classes.formControl)}
          >
            <Select
              value={state.status}
              style={{ height: '46px' }}
              onChange={(event) => {
                history.push(`/printers/status/${event.target.value}`)
                // setState((prevState) => ({
                //   ...prevState,
                //   status: event.target.value,
                // }));
              }}
            >
              {printerState.map((item) => {
                return <MenuItem value={item.value}>{item.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            className="ml-4 Btn-Color"
            style={{ height: '45px', width: '15%' }}
            onClick={() => exportToExcel()}
          >
            {t('printerExcel')}
          </Button>
        </div>
        <Grid
          hasSelection={false}
          isLoading={state.fetchingPrinters}
          rows={state.entries}
          columns={columnConfig}
          totalRows={state.totalEntries}
          pageSize={pageSize}
          pageNumber={pageNumber}
          onPageNumberChange={(pageNumber) => {
            history.push(`${match.url}?pageSize=${pageSize}&pageNumber=${pageNumber}`);
            // setState((prevState) => ({
            //   ...prevState,
            //   pageNumber,
            // }));
          }}
          onPageSizeChange={(pageSize) => {
            history.push(`${match.url}?pageSize=${pageSize}&pageNumber=1`);
            // setState((prevState) => ({
            //   ...prevState,
            //   pageSize,
            //   pageNumber: defaultState.pageNumber,
            // }));
          }}
          onSortChange={handleSortChange}
          order={state.order}
          orderBy={state.orderBy}
        />
        <div className='d-none'>
          <Grid
            tableId="deviceListTableForExcel"
            rows={state.excelData}
            columns={columnConfig}
          />
        </div>
      </Paper>
    </>
  );
};

export default ViewPrinters;
