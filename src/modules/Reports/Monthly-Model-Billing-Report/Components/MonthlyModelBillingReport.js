import React, { useState } from "react";
import "../../../Administrators/Printer Search/view/PrinterSearchstyle.css";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "../../../../shared/Shared.css";
import { Datepicker } from "shared/components";

const MonthlyModelBillingReport = () => {
    const [datePeriod, setDatePeriod] = useState(new Date());
    const { t } = useTranslation();
    return (
        <>
            <div className="d-flex f-align-center f-justify-between mb-8">
                <Typography variant="h4">{t("MonthlyModelReport")}</Typography>
            </div>
            <Paper elevation={4} className="p-4">
                <div className="d-flex">
                    <div className='wraplayout mr-4'>
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
                        </div>
                        <div className="mt-4 d-flex f-justify-between">
                            <TextField
                                name='noticeNoUse'
                                className="mr-6"
                                fullWidth
                                variant='outlined'
                                size='small'
                                label={t('sidebarModel')}
                            />
                            <Button className='Btn-Color' style={{ minWidth: '90px' }} variant="contained">{t("processSelect")}</Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default MonthlyModelBillingReport;