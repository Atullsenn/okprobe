import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "../view/SystemLogStyle.css";
import { Button } from "@material-ui/core";
import { Grid } from "shared/components";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import "../../../../shared/Shared.css";
import { Datepicker } from "shared/components";
import Service from '../../service';
import moment from 'moment';

const EndDefaultDate = () => {
    const currentyear = new Date().getFullYear();
    const newAddDate = new Date()
    newAddDate.setFullYear(currentyear + 1)
    return newAddDate
}



const defaultState = {
    entries: [],
    status: null,
    order: null,
    orderBy: null,
};

const noop = () => { };
const AgentActivity = ({ match, getUnassignDeviceCount = noop }) => {
    //New api

    useEffect(() => {
        getSystemLogs()
    }, [])
    
      const addSerialNumber = (datass) => {
        const data = [];
        datass.map((item, index) => {
          data.push({
            sNo: index + 1,
            id: index + 1,
            agentInfoId: item.agentInfoId,
            agentLogId:item.agentLogId,
            Description:item.description,
            InsertDt:item.insertDt,
            LogType:item.logType,
          })
        })
        return data
      }


    const getSystemLogs = async () => {
        setState(prevState => ({ ...prevState, isFetching: true }));
    await Service.getAgentLogs().then((res) => {
      if (res.data != null) {
        setState(prevState => ({ ...prevState, entries: addSerialNumber(res.data.content), isFetching: false }));
      } else {
        setState(prevState => ({ ...prevState, entries: [], isFetching: false }));
      }
    }).catch((error) => {
      console.log(error)
    })
  }
    
   
    //New api



    const [endcontract, setEndContract] = useState(EndDefaultDate());
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

    const columnConfig = [
        {
            id: "_date",
            field: "_date",
            label: t("date"),
            canSort: true,
            render: (Rows) => (
                <Typography variant="body1">
                    {moment(Rows.InsertDt).format('DD-MM-YYYY HH:MM:SS A')}
                </Typography>
            ),
        },
        {
            id: "_agent",
            fieldName: "_agent",
            label: t("Agent"),
            canSort: true,
            render: (Rows) => (
                <Typography variant="body1">
                    {Rows.agentInfoId}
                </Typography>
            ),
        },
        
        {
            id: "_printer_Name",
            field: "_printer_Name",
            label: t("Description"),
            canSort: true,
            render: (Rows) => (
                <Typography variant="body1">
                    {Rows.Description}
                </Typography>
            ),
        },
        {
            id: "_message",
            fieldName: "_message",
            label: t("processMessage"),
            canSort: true,
            render: (Rows) => (
                <Typography variant="body1" >
                    {Rows.LogType}
                </Typography>
            ),
        },
    ];

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
                <Typography variant="h4">{t("sidebarSystemLog")}</Typography>
            </div>
            <Paper elevation={4}>
                <div className="d-flex p-4 f-align-center">
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={t('processSearch')}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                    />
                    <div className="MainDateDiv dateDiv">
                        <Datepicker
                            className="set-default-date"
                            label={t("ContractStartDate")}
                            selected={new Date()}
                        />
                        <Datepicker
                            className="set-default-date"
                            label={t("ContractEndDate")}
                            selected={endcontract}
                        />
                        <Button
                            variant="contained"
                            className="Btn-Color"
                            style={{ width: '100px', height: '40px' }}
                        >
                            {t("searchLog")}
                        </Button>
                    </div>
                </div>
                <div >
                </div>
                <Divider />
                <Grid
                    hasSelection={false}
                    columns={columnConfig}
                    rows={state.entries}
                    onSortChange={handleSortChange}
                    order={state.order}
                    orderBy={state.orderBy}
                />
            </Paper>
        </>
    );
};

export default AgentActivity;