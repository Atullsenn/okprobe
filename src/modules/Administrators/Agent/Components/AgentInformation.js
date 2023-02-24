import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Grid } from "shared/components";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "../view/AgentStyle.css";
import "../../../../shared/Shared.css";
import SMTPSettings from "./SMTPSettings";
import Tooltip from '@material-ui/core/Tooltip';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Service from '../../service';
import moment from 'moment';

const TypographyWithClick = ({ children, onClick }) => {
    return <Typography variant="body1" style={{ textAlign: "center" }} onClick={onClick}>
        {children}
    </Typography>
}

const defaultState = {
    entries: [],
    status: null,
    order: null,
    orderBy: null,
    isFetching: false,
    popUp: false,
    showTextarea: false,
};

const AgentInformation = () => {
    const { t } = useTranslation();
    const [state, setState] = useState(defaultState);
    const addSerialNumber = (datass) => {
        const data = [];
        datass.map((item, index) => {
            data.push({
                id: index + 1,
                active: item.active,
                agentInfoId: item.agentInfoId,
                category: item.category,
                createDt: item.createDt,
                description: item.description,
                displayName: item.displayName,
                hostname: item.hostname,
                ipAddress: item.ipAddress,
                macAddress: item.macAddress,
                partnerId: item.partnerId,
                snmpAuthAlgo: item.snmpAuthAlgo,
                snmpAuthPassword: item.snmpAuthPassword,
                snmpCollectionRetry: item.snmpCollectionRetry,
                snmpCollectionTimeout: item.snmpCollectionTimeout,
                snmpCommunityName: item.snmpCommunityName,
                snmpContectName: item.snmpContectName,
                snmpPort: item.snmpPort,
                snmpPrivacyAlgo: item.snmpPrivacyAlgo,
                snmpPrivacyPass: item.snmpPrivacyPass,
                snmpSearchRetry: item.snmpSearchRetry,
                snmpSearchTimeout: item.snmpSearchTimeout,
                snmpUsername: item.snmpUsername,
                snmpVersion: item.snmpVersion,
                timeInterval: item.timeInterval,
                updateDt: item.updateDt,
            })
        })
        return data
    }

    const getAgentData = async () => {
        setState(prevState => ({ ...prevState, isFetching: true }));
        await Service.getAgentData().then((res) => {
            if (res.data != null) {
                setState(prevState => ({ ...prevState, entries: addSerialNumber(res.data), isFetching: false }));
            } else {
                setState(prevState => ({ ...prevState, entries: [], isFetching: false }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAgentData()
    }, [])

    const [passingIdTable, setPassingIdTable] = useState();
    const [tableDublicateValue, setTableDublicateValue] = useState()
    const getDublicateValue = () => {
        setTableDublicateValue(state.entries)
    }

    const changeNameText = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            entries: prevState.map(items => {
                if (items.id === passingIdTable) {
                    return { ...items, [name]: value };
                }
                return items; 
            }),
        }));
    }

    const InputNumberValidation = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            entries: prevState.map(items => {
                if (items.id === passingIdTable) {
                    let PollingIntervalValue = parseInt(value);
                    if (PollingIntervalValue > 9999) PollingIntervalValue = 9999;
                    if (PollingIntervalValue < 0) PollingIntervalValue = 0;
                    return { ...items, [name]: PollingIntervalValue };
                }
                return items;
            })
        }));
    }

    const showPopUp = () => {
        setState(prevState => ({ ...prevState, popUp: true }));
    }

    const columnConfig = [
        {
            id: "Status_Id",
            fieldName: "Status_Id",
            label: t("processStatus"),
            canSort: true,
            render: (Rows) => (
                <TypographyWithClick onClick={() => {
                    setState(prevState => ({ ...prevState, popUp: !state.popUp }));
                }}>
                    {Rows.active}
                </TypographyWithClick>
            ),
        },
        {
            id: "_Name",
            fieldName: "_Name",
            label: t("Name"),
            canSort: true,
            render: (Rows) => (
                <div style={{ textAlign: 'center' }}>
                    {state.showTextarea && passingIdTable === Rows.agentInfoId ?
                        <TextField
                            fullWidth
                            name="Name"
                            className={`AgentTextField ${passingIdTable === Rows.agentInfoId ? '' : 'editabledisableColor'}`}
                            variant="outlined"
                            size="small"
                            value={Rows.Name}
                            disabled={passingIdTable === Rows.agentInfoId ? false : true}
                        // onChange={changeNameText}
                        /> :
                        <Typography variant="body1" style={{ textAlign: "left" }}>
                            {Rows.displayName}
                        </Typography>
                    }
                </div>
            ),
        },
        {
            id: "_IP",
            fieldName: "_IP",
            label: t("IP"),
            canSort: true,
            render: (Rows) => (
                <TypographyWithClick  onClick={() => {
                    setState(prevState => ({ ...prevState, popUp: !state.popUp }));
                }}>
                    {Rows.ipAddress}
                </TypographyWithClick>
            ),
        },
        {
            id: "host_Name",
            field: "host_Name",
            label: t("processHostName"),
            canSort: true,
            render: (Rows) => (
                <TypographyWithClick onClick={() => {
                    setState(prevState => ({ ...prevState, popUp: !state.popUp }));
                }}>
                    {Rows.hostname}
                </TypographyWithClick>
            ),
        },
        {
            id: "_version",
            field: "_version",
            label: t("Version"),
            canSort: true,
            render: (Rows) => (
                <TypographyWithClick onClick={() => {
                    setState(prevState => ({ ...prevState, popUp: !state.popUp }));
                }}>
                    {Rows.snmpVersion}
                </TypographyWithClick>
            ),
        },
        {
            id: "start_Date",
            field: "start_Date",
            label: t("StartDate"),
            canSort: true,
            render: (Rows) => (
                <TypographyWithClick onClick={() => {
                    setState(prevState => ({ ...prevState, popUp: !state.popUp }));
                }}>
                    {moment(Rows.createDt).format('DD-MM-YYYY HH:MM:SS A')}
                </TypographyWithClick>
            ),
        },
        {
            id: "last_collect_date",
            fieldName: "last_collect_date",
            label: t("LastCollectDate"),
            canSort: true,
            render: (Rows) => (
                <TypographyWithClick onClick={() => {
                    setState(prevState => ({ ...prevState, popUp: !state.popUp }));
                }}>
                    {moment(Rows.updateDt).format("DD-MM-YYYY HH:MM:SS A")}
                </TypographyWithClick>
            ),
        },
        {
            id: "polling_interval",
            field: "polling_interval",
            label: t("Polling Interval (Minutes)"),
            canSort: true,
            render: (Rows) => (

                <div style={{ textAlign: 'center' }}>
                    {state.showTextarea && passingIdTable === Rows.agentInfoId ?
                        <TextField
                            fullWidth
                            name="PollingInterval"
                            className={`AgentTextField AgentTextRight ${passingIdTable === Rows.agentInfoId ? '' : 'editabledisableColor'}`}
                            variant="outlined"
                            size="small"
                            type="number"
                            value={Rows.PollingInterval}
                            disabled={passingIdTable === Rows.agentInfoId ? false : true}
                        // onChange={InputNumberValidation}
                        /> :
                        <Typography variant="body1" style={{ textAlign: "right" }}>
                            {Rows.timeInterval}
                        </Typography>
                    }
                </div>
            ),
        },
        {
            id: "_action",
            field: "_action",
            label: t("Action"),
            render: (Rows) => {
                return (
                    <div className="d-flex f-align-center f-justify-center" style={{ minWidth: '200px' }}>
                        {passingIdTable === Rows.agentInfoId ?
                            <>
                                <Tooltip title={t('Save')} placement='top-start'>
                                    <Button
                                        variant="contained"
                                        className="Btn-Color iconButtons"
                                        onClick={() => { setPassingIdTable(); setState(prevState => ({ ...prevState, showTextarea: false })); }}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={t('Close')} placement='top-start'>
                                    <Button
                                        variant="contained"
                                        className="deleteBtn iconButtons"
                                        onClick={() => { setPassingIdTable(); setState(prevState => ({ ...prevState, entries: tableDublicateValue })); setState(prevState => ({ ...prevState, showTextarea: false })); }}
                                    >
                                        <CloseIcon />
                                    </Button>
                                </Tooltip>
                            </> :
                            <>
                                <Tooltip title={t('Edit')} placement='top-start'>
                                    <Button
                                        variant="contained"
                                        className="iconButtons"
                                        onClick={() => { setPassingIdTable(Rows.agentInfoId); getDublicateValue(); setState(prevState => ({ ...prevState, showTextarea: true })); }}
                                    >
                                        <EditIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={t('Pause')} placement='top-start'>
                                    <Button
                                        variant="contained"
                                        className="iconButtons"
                                    >
                                        <NotStartedIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={t('Resume')} placement='top-start'>
                                    <Button
                                        variant="contained"
                                        className="Btn-Color iconButtons"
                                    >
                                        <PauseCircleFilledIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={t('newPrinterdelete')} placement='top-start'>
                                    <Button
                                        variant="contained"
                                        className="deleteBtn iconButtons"
                                    >
                                        <DeleteForeverIcon />
                                    </Button>
                                </Tooltip>
                            </>
                        }
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <Paper elevation={4}>
                <Grid
                    hasSelection={true}
                    columns={columnConfig}
                    rows={state.entries}
                    clickEvent={showPopUp}
                    isLoading={state.isFetching}
                />
            </Paper>
            {state.popUp ? <SMTPSettings setClosePopUp={setState}  /> : ''}
        </>
    );
};

export default AgentInformation;