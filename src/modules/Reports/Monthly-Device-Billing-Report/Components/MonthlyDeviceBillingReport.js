import React, { useState } from "react";
import "../../../Administrators/Printer Search/view/PrinterSearchstyle.css";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "../../../../shared/Shared.css";
import { Datepicker } from "shared/components";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';


const MonthlyDeviceBillingReport = () => {
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [datePeriod, setDatePeriod] = useState(new Date());
    const { t } = useTranslation();

    return (
        <>
            <div className="d-flex f-align-center f-justify-between mb-8">
                <Typography variant="h4">{t("MonthlyDeviceReport")}</Typography>
            </div>
            <Paper elevation={4} className="p-4">
                <div className="d-flex">
                    <div className='wraplayout mr-4'>
                        <div className="d-flex f-justify-between">
                            <TextField
                                name='noticeNoUse'
                                className="mr-6"
                                fullWidth
                                variant='outlined'
                                size='small'
                                label={t('Customer')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <div
                                                style={{
                                                    width: 15,
                                                    height: 22,
                                                    color: "#35b803",
                                                }}
                                            >
                                                <SearchIcon />
                                            </div>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-50 ml-4">
                        <div className="d-flex f-justify-between">
                            <Datepicker
                                className="period-default-date"
                                label={t("Period")}
                                selected={datePeriod}
                                onChange={(date) => setDatePeriod(date)}
                                dateFormat="yyyy/MM"
                                fullWidth
                                showMonthYearPicker
                            />
                            <Button className='Btn-Color' style={{ minWidth: '90px' }} variant="contained">{t("processSearchBtn")}</Button>
                        </div>
                    </div>
                </div>
                <Paper className="mt-2 moreOptions">
                    <div className="d-flex f-justify-between f-align-center pl-4 pt-1 pr-4 pb-1" onClick={() => { setShowMoreDetails(!showMoreDetails) }}>
                        <Typography variant="h6">{t("moreoptions")}</Typography>
                        <div className="d-flex f-justify-center f-align-center"> {showMoreDetails ? <ChevronRightIcon onClick={() => { setShowMoreDetails(!showMoreDetails) }} /> : <KeyboardArrowDownIcon onClick={() => { setShowMoreDetails(!showMoreDetails) }} />}</div>
                    </div>
                    {showMoreDetails ?
                        <div className="d-flex moreInnerDiv">
                            <div className='wraplayout mr-4 mt-1 pl-4 mb-1'>
                                <div className="d-flex f-justify-between">
                                    <TextField
                                        name='noticeNoUse'
                                        className="mr-6"
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        label={t('sidebarModel')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div
                                                        style={{
                                                            width: 15,
                                                            height: 22,
                                                            color: "#35b803",
                                                        }}
                                                    >
                                                        <SearchIcon />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="mt-1 d-flex f-justify-between">
                                    <TextField
                                        name='noticeNoUse'
                                        className="mr-6"
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        label={`${t('processDepartment')} 1`}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div
                                                        style={{
                                                            width: 15,
                                                            height: 22,
                                                            color: "#35b803",
                                                        }}
                                                    >
                                                        <SearchIcon />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="mt-1 d-flex f-justify-between">
                                    <TextField
                                        name='noticeNoUse'
                                        className="mr-6"
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        label={`${t('processDepartment')} 3`}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div
                                                        style={{
                                                            width: 15,
                                                            height: 22,
                                                            color: "#35b803",
                                                        }}
                                                    >
                                                        <SearchIcon />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="mt-1 d-flex f-justify-between">
                                    <TextField
                                        name='noticeNoUse'
                                        className="mr-6"
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        label={`${t('processDepartment')} 5`}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div
                                                        style={{
                                                            width: 15,
                                                            height: 22,
                                                            color: "#35b803",
                                                        }}
                                                    >
                                                        <SearchIcon />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-50 ml-4 mt-1 pr-4">
                                <div className="d-flex f-justify-between" style={{ height: '40px' }}></div>
                                <div className="mt-1 d-flex f-justify-between">
                                    <TextField
                                        name='noticeNoUse'
                                        className="mr-6"
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        label={`${t('processDepartment')} 2`}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div
                                                        style={{
                                                            width: 15,
                                                            height: 22,
                                                            color: "#35b803",
                                                        }}
                                                    >
                                                        <SearchIcon />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="mt-1 d-flex f-justify-between">
                                    <TextField
                                        name='noticeNoUse'
                                        className="mr-6"
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        label={`${t('processDepartment')} 4`}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div
                                                        style={{
                                                            width: 15,
                                                            height: 22,
                                                            color: "#35b803",
                                                        }}
                                                    >
                                                        <SearchIcon />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                        </div> : ''}
                </Paper>
            </Paper>
        </>
    );
};

export default MonthlyDeviceBillingReport;
