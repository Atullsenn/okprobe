import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Grid } from "shared/components";
import "../view/PrinterSearchstyle.css";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import "../../../../shared/Shared.css";
import Service from '../../service';

const defaultState = {
  entries: [],
  status: null,
  order: null,
  orderBy: null,
  isFetching: false,
};

const noop = () => { };
const SearchResult = ({ match, getUnassignDeviceCount = noop }) => {
  const { t } = useTranslation();
  const history = useHistory()
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

  useEffect(() => {
    getSearchResult()
  }, [])

  const addSerialNumber = (datass) => {
    const data = [];
    datass.map((item, index) => {
      data.push({
        sNo: index + 1,
        id: index + 1,
        agentInfoId: item.agentInfoId,
        assignStatus: item.assignStatus,
        deviceModelId: item.deviceModeName,
        deviceSerial: item.deviceSerial,
        hostname: item.hostname,
        insertDt: item.insertDt,
        ipaddress: item.ipaddress,
        partnerId: item.partnerId,
        searchHistoryId: item.searchHistoryId,
        searchResultId: item.searchResultId,
        toolType: item.toolType,
        updateDt: item.updateDt,
      })
    })
    return data
  }

  const getSearchResult = async () => {
    setState(prevState => ({ ...prevState, isFetching: true }));
    await Service.getAgentSearchResult().then((res) => {
      if (res.data != null) {
        setState(prevState => ({ ...prevState, entries: addSerialNumber(res.data.content), isFetching: false }));
      } else {
        setState(prevState => ({ ...prevState, entries: [], isFetching: false }));
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const columnConfig = [
    {
      id: "s_No",
      fieldName: "s_No",
      label: t("processNo"),
      canSort: true,
      render: (Rows) => (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {Rows.sNo}
        </Typography>
      ),
    },
    {
      id: "printer_Model",
      field: "printer_Model",
      label: t("processPrinterModel"),
      canSort: true,
      render: (Rows) => (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {Rows.deviceModelId}
        </Typography>
      ),
    },
    {
      id: "serial_Number",
      fieldName: "serial_Number",
      label: t("processSerialNumber"),
      canSort: true,
      render: (Rows) => (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {Rows.deviceSerial}
        </Typography>
      ),
    },
    {
      id: "Ip",
      field: "Ip",
      label: t("processIp"),
      canSort: true,
      render: (Rows) => (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {Rows.ipaddress}
        </Typography>
      ),
    },
    {
      id: "host_Name",
      field: "host_Name",
      label: t("processHostName"),
      canSort: true,
      render: (Rows) => (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {Rows.hostname}
        </Typography>
      ),
    },
    {
      id: "Status_Id",
      fieldName: "Status_Id",
      label: t("processStatus"),
      canSort: true,
      render: (Rows) => (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {Rows.assignStatus?'New':'Assigned'}
        </Typography>
      ),
    },
  ];

  const findSelectedRow = () => {
    var SelectedRows = [];
    SelectedRows = JSON.parse(localStorage.getItem('SelectRow'));
    if (SelectedRows === null) { }
    else {
      if (SelectedRows.length === 1) {
        history.push(`${match.path}/register-printer`)
      }
      if (SelectedRows.length >= 2) {
        history.push(`${match.path}/printers-detail`)
      }
    }
  }

  const handleSortChange = (fieldObj, order) => {
    const data = [...state.entries]
    data.sort((a, b) => {
      if (a[fieldObj.field] > b[fieldObj.field])
        return order === 'A' ? 1 : -1
      else return order === 'A' ? -1 : 1
    })
    setState((prevState) => ({
      ...prevState,
      orderBy: fieldObj.field || fieldObj.fieldName,
      order: order,
      entries: data,
    }));
  };

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("processSearchResult")}</Typography>
      </div>
      <Paper elevation={4}>
        <Grid
          columns={columnConfig}
          rows={state.entries}
          onSortChange={handleSortChange}
          order={state.order}
          orderBy={state.orderBy}
          isLoading={state.isFetching}
        />
      </Paper>
      <div className="divBtn">
        <Button
          className="ButtonSimilarWidth mr-4 bg-danger"
          variant="contained"
          type="submit"
        >
          {t("processDeleteBtn")}
        </Button>
        <Button
          variant="contained"
          className="Btn-Color ButtonSimilarWidth"
          type="submit"
          onClick={() => { findSelectedRow() }}
        >
          {t("processRegisterBtn")}
        </Button>
      </div>
    </>
  );
};

export default SearchResult;