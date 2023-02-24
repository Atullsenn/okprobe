import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { Grid } from "shared/components";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Datepicker } from "shared/components";
import "./RemainingTonerInkConsumablesStyle.css";
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
        consumableSerialNo: 'P85AX',
        refrence: 858,
        lastCollectedDate: '27 Dec',
        black: '15',
        cyan: '17',
        magenta: '5',
        yellow: '299',
        machineCount: '12'
    },
    {
        status: 2,
        customer: "Z",
        department: "M",
        location: 25,
        model: 552,
        serialNo: "PHCX29",
        ip: 859,
        consumableSerialNo: 'P85AX',
        refrence: 858,
        lastCollectedDate: '29 Sep',
        black: '7',
        cyan: '99',
        magenta: '75',
        yellow: '37',
        machineCount: '175'
    },
    {
        status: 3,
        customer: "M",
        department: "K",
        location: 19,
        model: 222,
        serialNo: "PFEDXC475",
        ip: 14569,
        consumableSerialNo: 'PPP001',
        refrence: 852369,
        lastCollectedDate: '15 Mar',
        black: '55',
        cyan: '85632',
        magenta: '745',
        yellow: '195',
        machineCount: '210'
    },
]

const defaultState = {
    entries: data,
    status: null,
    order: null,
    orderBy: null,
};

const RemainingTonerInkConsumables = ({ match }) => {
    const { t } = useTranslation();
    const [remaining, setRemaining] = useState();
    const [endcontract, setEndContract] = useState(EndDefaultDate());
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
            id: "Last_collected_date",
            field: "Last_collected_date",
            label: t('Lastcollecteddate'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1" >
                    {row.lastCollectedDate}
                </Typography>
            ),
        },
        {
            id: "_Black",
            field: "_Black",
            label: t('black'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "right" }} variant="body1" >
                    {row.black}
                </Typography>
            ),
        },
        {
            id: "_Cyan",
            field: "_Cyan",
            label: t('cyan'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "right" }} variant="body1" >
                    {row.cyan}
                </Typography>
            ),
        },
        {
            id: "_Magenta",
            field: "_Magenta",
            label: t('magenta'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "right" }} variant="body1" >
                    {row.magenta}
                </Typography>
            ),
        },
        {
            id: "_Yellow",
            field: "_Yellow",
            label: t('yellow'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "right" }} variant="body1" >
                    {row.yellow}
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
                <Typography variant="h4">{t("sidebarRemainingToner/Ink")} {t("sidebarConsumables")}</Typography>
            </div>
            <Paper elevation={4} className="p-2">
                <div className="TonerInkMainDiv">
                    <div className="PeriodTonerInkInnerDiv mb-2">
                        <div className="TonerInkLabelDiv">
                            <p className="TonerInkLabelText m-0 p-0">{t('Period')}</p>
                        </div>
                        <div className="TonerInkDateDiv">
                            <div className="TonerInkInnerDateDiv">
                                <div className="pl-4 pr-4">
                                    <Datepicker
                                        className="TonerINKmain-period-date-div"
                                        label={t("StartDate")}
                                        selected={new Date()}
                                    />
                                </div>
                                <span style={{ fontWeight: 'bold', fontSize: '18px' }} className="mr-2 ml-2"> ~ </span>
                                <div className="pl-4 pr-4">
                                    <Datepicker
                                        className="TonerINKmain-period-date-div"
                                        label={t("processEndDate")}
                                        selected={endcontract}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button className="Btn-Color" style={{ height: '44px', width: '161px' }} variant="contained">{t("processSearchBtn")}</Button>
                            </div>
                        </div>
                    </div>
                    <div className="ModelTonerInkDiv">
                        <div className="ModelFirstTonerInnerInk">
                            <div className="ModelTonerInkLabelDiv">
                                <p className="ModelTonerInkLabelText m-0 p-0">{t('modelname')}</p>
                            </div>
                            <div className="ModelTextfieldDiv pl-4">
                                <TextField
                                    fullWidth
                                    className="ModelNameTextfield"
                                    name="noticeUsageLevel"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                        </div>
                        <div className="ModelSecondTonerInnerInk">
                            <div className="RemainingTonerInkLabelDiv">
                                <p className="ModelTonerInkLabelText m-0 p-0">{t('Remaining')}</p>
                            </div>
                            <div className="RemainingTextfieldDiv pl-4">
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
                    </div>
                </div>
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
                        style={{ height: '44px', width: '15%' }}
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

export default RemainingTonerInkConsumables;