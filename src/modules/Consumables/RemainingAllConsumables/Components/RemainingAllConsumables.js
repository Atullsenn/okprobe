import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Grid } from "shared/components";
import Paper from "@material-ui/core/Paper";
import { Button, MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import "./RemainingAllConsumableStyle.css";
import { Datepicker } from "shared/components";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from "@material-ui/icons/Search";

const EndDefaultDate = () => {
    const currentyear = new Date().getFullYear();
    const newAddDate = new Date()
    newAddDate.setFullYear(currentyear + 1)
    return newAddDate
}

const data = [
    {
        status: 1,
        customer: "A",
        department: "P",
        location: 10,
        model: 288,
        serialNo: "ABXCD",
        ip: 14569,
        type: 'Color',
        consumableSerialNo: 'P85AX',
        refrence: 858,
        lastChangeDate: '10 Mar',
        lastCollectedDate: '27 Dec',
        currentLevel: 25,
        machineCount: 12,
    },
    {
        status: 2,
        customer: "Z",
        department: "M",
        location: 25,
        model: 552,
        serialNo: "PHCX29",
        ip: 859,
        type: 'Mono',
        consumableSerialNo: 'P85AX',
        refrence: 858,
        lastChangeDate: '28 Dec',
        lastCollectedDate: '29 Sep',
        currentLevel: 55,
        machineCount: 175,
    },
    {
        status: 3,
        customer: "M",
        department: "K",
        location: 19,
        model: 222,
        serialNo: "PFEDXC475",
        ip: 14569,
        type: 'Color',
        consumableSerialNo: 'PPP001',
        refrence: 852369,
        lastChangeDate: '15 Jan',
        lastCollectedDate: '15 Mar',
        currentLevel: 265,
        machineCount: 210,
    },
]

const defaultState = {
    entries: data,
    status: null,
    order: null,
    orderBy: null,
};

const RemainingAllConsumables = ({ match }) => {
    const { t } = useTranslation();
    const [wasteToner, setWasteToner] = useState(0);
    const [type, setType] = useState(0);
    const [remaining, setRemaining] = useState();
    const [endcontract, setEndContract] = useState(EndDefaultDate());
    const [showMoreDetails, setShowMoreDetails] = useState(false);
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

    const updateType = (event) => {
        setType(event.target.value);
    };

    const updateWasteToner = (event) => {
        setWasteToner(event.target.value);
    }

    const RemainingValuePercantage = (event) => {
        const value = event.target.value;
        let percentageValue = parseInt(value, 10);
        if (percentageValue > 100) percentageValue = 100;
        if (percentageValue < 0) percentageValue = 0;
        setRemaining(percentageValue);
    }

    const columnConfig = [
        {
            id: "Status_Id",
            fieldName: "Status_Id",
            label: t("processStatus"),
            canSort: true,
            render: (row) => (
                <Typography variant="body1" style={{ textAlign: "center" }}>
                    {row.status}
                </Typography>
            ),
        },
        {
            id: "_customers",
            fieldName: "_customers",
            label: t("printercustomer"),
            canSort: true,
            render: (row) => (
                <Typography variant="body1" style={{ textAlign: "left" }}>
                    {row.customer}
                </Typography>
            ),
        },
        {
            id: "_Department",
            field: "_Department",
            label: t('Department'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "left" }} variant="body1">
                    {row.department}
                </Typography>
            ),
        },
        {
            id: "location",
            field: "location",
            label: t('dashboardLocation'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "left" }} variant="body1" >
                    {row.location}
                </Typography>
            ),
        },
        {
            id: "display_name",
            field: "display_name",
            label: t('printerModel'),
            canSort: true,
            render: (row) => (
                <Typography variant="body1" style={{ textAlign: "left" }}>
                    {row.model}
                </Typography>
            ),
        },
        {
            id: "device_serial",
            field: "device_serial",
            label: t('summarySerial Number'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "left" }} variant="body1" >
                    {row.serialNo}
                </Typography>
            ),
        },
        {
            id: "IP_",
            field: "IP_",
            label: t('IP'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1" >
                    {row.ip}
                </Typography>
            ),
        },
        {
            id: "Type_",
            field: "Type_",
            label: t('dashboardType'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1" >
                    {row.type}
                </Typography>
            ),
        },
        {
            id: "Consumable_Serial_Number",
            field: "Consumable_Serial_Number",
            label: t('ConsumableSerialNumber'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1" >
                    {row.consumableSerialNo}
                </Typography>
            ),
        },
        {
            id: "Reference_",
            field: "Reference_",
            label: t('reference'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "left" }} variant="body1" >
                    {row.refrence}
                </Typography>
            ),
        },
        {
            id: "Last_change_date",
            field: "Last_change_date",
            label: t('Lastchangedate'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1" >
                    {row.lastChangeDate}
                </Typography>
            ),
        },
        {
            id: "Last_collected_date",
            field: "Last_collected_date",
            label: t('Lastcollecteddate'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1" >
                    {row.lastChangeDate}
                </Typography>
            ),
        },
        {
            id: "Current_Level",
            field: "Current_Level",
            label: t('CurrentLevel'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "right" }} variant="body1" >
                    {row.currentLevel}
                </Typography>
            ),
        },
        {
            id: "Machine_Count",
            field: "Machine_Count",
            label: t('MachineCount'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "right" }} variant="body1" >
                    {row.machineCount}
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
                <Typography variant="h4">{t("RemaininAllConsumables")}</Typography>
            </div>
            <Paper elevation={4} className="p-2">
                <div>
                    <div className="PeriodAllInnerDiv">
                        <div className="AllLabelDiv">
                            <p className="AllLabelText m-0 p-0">{t('Period')}</p>
                        </div>
                        <div className="AllDateDiv">
                            <div className="d-flex">
                                <div className="AllInnerDateDiv">
                                    <div className="pl-4 pr-2">
                                        <Datepicker
                                            className="Allmain-period-date-div"
                                            label={t("StartDate")}
                                            selected={new Date()}
                                        />
                                    </div>
                                    <span style={{ fontWeight: 'bold', fontSize: '18px' }} className="mr-2 ml-2"> ~ </span>
                                    <div className="pl-2 pr-4">
                                        <Datepicker
                                            className="Allmain-period-date-div"
                                            label={t("processEndDate")}
                                            selected={endcontract}
                                        />
                                    </div>
                                </div>
                                <div className="RemainingAllLabelDiv">
                                    <p className="ModelAllLabelText m-0 p-0">{t('Remaining')}</p>
                                </div>
                                <div className="RemainingAllTextfieldDiv pl-4">
                                    <TextField
                                        fullWidth
                                        type="number"
                                        className="ModelNameTextfield"
                                        name="noticeUsageLevel"
                                        variant="outlined"
                                        size="small"
                                        value={remaining}
                                        onChange={RemainingValuePercantage}
                                    />
                                </div>
                                <span className="ml-1 mr-1 under">% {t('under')}</span>
                            </div>
                            <div>
                                <Button className="Btn-Color" style={{ height: '44px', width: '161px' }} variant="contained">{t("processSearchBtn")}</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Paper className="mt-2 moreOptions">
                    <div className="d-flex f-justify-between f-align-center pl-2 pt-1 pr-4 pb-1" onClick={() => { setShowMoreDetails(!showMoreDetails) }}>
                        <Typography variant="h6">{t("moreoptions")}</Typography>
                        <div className="d-flex f-justify-center f-align-center"> {showMoreDetails ? <ChevronRightIcon onClick={() => { setShowMoreDetails(!showMoreDetails) }} /> : <KeyboardArrowDownIcon onClick={() => { setShowMoreDetails(!showMoreDetails) }} />}</div>
                    </div>
                    {showMoreDetails ?
                        <div className="moreInnerDiv">
                            <div className="d-flex modelNameMainDiv mt-1 mb-1">
                                <div className="AllModelNameLabelDiv pl-2">
                                    <p className="AllLabelText m-0 p-0">{t('modelname')}</p>
                                </div>
                                <div className="RemainingAllModelNameTextfieldDiv pl-4">
                                    <TextField
                                        fullWidth
                                        className="ModelNameTextfield"
                                        name="noticeUsageLevel"
                                        variant="outlined"
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="d-flex modelNameMainDiv mt-2 mb-1 f-justify-between">
                                <div className="d-flex" style={{ width: '48%' }}>
                                    <div className="AllWasteLabelDiv pl-2">
                                        <p className="AllLabelText m-0 p-0">{t('WasteTonerState')}</p>
                                    </div>
                                    <div className="RemainingAllWasteTonerDiv pl-4">
                                        <Select
                                            value={wasteToner}
                                            className="textfieldStyle tonerTypeDropdown"
                                            onChange={updateWasteToner}
                                            displayEmpty
                                            variant="outlined"
                                        >
                                            <MenuItem value={0}>{t("All")}</MenuItem>
                                            <MenuItem value={1}>{t("full")}</MenuItem>
                                            <MenuItem value={2}>{t("nearFull")}</MenuItem>
                                            <MenuItem value={3}>{t("printernormal")}</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="d-flex" style={{ width: '48%' }}>
                                    <div className="AllTypeLabelDiv pl-2">
                                        <p className="AllLabelText m-0 p-0">{t('dashboardType')}</p>
                                    </div>
                                    <div className="RemainingAllWasteTonerDiv pl-4">
                                        <Select
                                            value={type}
                                            className="textfieldStyle tonerTypeDropdown"
                                            onChange={updateType}
                                            displayEmpty
                                            variant="outlined"
                                        >
                                            <MenuItem value={0}>{t("All")}</MenuItem>
                                            <MenuItem value={1}>{t("printerToner")}</MenuItem>
                                            <MenuItem value={2}>{t("fuser")}</MenuItem>
                                            <MenuItem value={3}>{t("developer")}</MenuItem>
                                            <MenuItem value={4}>{t("opc")}</MenuItem>
                                            <MenuItem value={5}>{t("transfer")}</MenuItem>
                                            <MenuItem value={6}>{t("other")}</MenuItem>
                                            <MenuItem value={7}>{t("wastetoner")}</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div> : ''}
                </Paper>
            </Paper>
            <Paper elevation={4} className="mt-5">
                <div className="d-flex f-justify-between f-align-center exportButtonHeight">
                    <TextField
                        className="pl-2 TonerInkSearchTextField"
                        variant="outlined"
                        size="small"
                        placeholder={t('processSearch')}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                    />
                    <Button
                        variant="contained"
                        className="Btn-Color mr-2"
                        style={{ height: '45px', width: '15%' }}
                    >
                        {t('printerExcel')}
                    </Button>
                </div>
                <hr className="p-0 m-0" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)' }} />
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

export default RemainingAllConsumables;