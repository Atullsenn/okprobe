import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Service from "../../../printers/service";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useTranslation } from "react-i18next";
import useStyles from "../../../printers/view/style";
import $ from "jquery";
import { formatDate, daysBetween, writeXLSFile, getToday, getTime, } from "utils";
import "../../../../shared/Shared.css";
import { Grid } from "shared/components";
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from "@material-ui/core/TextField";

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

const PrinterManagementList = ({ match, history }) => {
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
    const [rowId, setRowId] = useState();

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
            id: "_IP",
            field: "_IP",
            label: t('IpAddress'),
            canSort: true,
            render: (row) => (
                <div>
                    {rowId === row.deviceInfoId ?
                        <TextField
                            fullWidth
                            name="Name"
                            className='AgentTextField'
                            variant="outlined"
                            size="small"
                            defaultValue={'192.162.0.100'}
                        />
                        :
                        <Typography style={{ textAlign: "center" }} variant="body1">
                            {'192.162.0.100'}
                        </Typography>
                    }
                </div>
            ),
        },
        {
            id: "_Host_Name",
            field: "_Host_Name",
            label: t('processHostName'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Host Name'}
                </Typography>
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
            id: "_Display_Name",
            field: "_Display_Name",
            label: t('displayName'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Display Name'}
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
                    className="Text-Color"
                    component={NavLink}
                    to={`/printers/${row.endCustomerId}/device/${row?.deviceInfoId}/last-updated-at/${row?.lastUpdateDt}`}
                >
                    {row.endCustomerName}
                </Link>
            ),
        },
        {
            id: "_Department",
            field: "_Department",
            label: t('Department'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Department'}
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
            id: "_Customer_Info1",
            field: "_Customer_Info1",
            label: t('CustomerInfo-1'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Costomer Info-1'}
                </Typography>
            ),
        },
        {
            id: "_Customer_Info2",
            field: "__Customer_Info2",
            label: t('CustomerInfo-2'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Costomer Info-2'}
                </Typography>
            ),
        },
        {
            id: "_Contract_Start",
            field: "_Contract_Start",
            label: t('ContractStart'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Contract Start'}
                </Typography>
            ),
        },
        {
            id: "_Contract_End",
            field: "_Contract_End",
            label: t('ContractEnd'),
            canSort: true,
            render: (row) => (
                <Typography style={{ textAlign: "center" }} variant="body1">
                    {'Contract End'}
                </Typography>
            ),
        },
        {
            id: "_action",
            field: "_action",
            label: t("Action"),
            canSort: true,
            render: (row) => {
                return (
                    <div className="d-flex" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        {rowId === row.deviceInfoId ?
                            <>
                                <Tooltip title={t('Save')} placement='top-start'>
                                    <Button
                                        style={{ margin: '0px 6px', padding: '0px', minWidth: '38px' }}
                                        variant="contained"
                                        className="Btn-Color"
                                        onClick={() => { setRowId() }}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={t('Close')} placement='top-start'>
                                    <Button
                                        style={{ margin: '0px 6px', padding: '0px', minWidth: '38px' }}
                                        variant="contained"
                                        className="deleteBtn"
                                        onClick={() => { setRowId() }}
                                    >
                                        <CloseIcon />
                                    </Button>
                                </Tooltip>
                            </>
                            :
                            <>
                                <Tooltip title={t('Edit')} placement='top-start'>
                                    <Button
                                        style={{ margin: '0px 6px', padding: '0px', minWidth: '38px' }}
                                        variant="contained"
                                        onClick={() => { setRowId(row.deviceInfoId); }}
                                    >
                                        <EditIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={t('Delete')} placement='top-start'>
                                    <Button
                                        style={{ margin: '0px 6px', padding: '0px', minWidth: '38px' }}
                                        variant="contained"
                                        className="deleteBtn"
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
    ]

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
                <Typography variant="h4">{t('Printer Management list')}</Typography>
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

export default PrinterManagementList;