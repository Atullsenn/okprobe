import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "../view/ServerStyle.css";
import { Checkbox, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import "../../../../shared/Shared.css";

const SystemErrorNotificationSetting = () => {
    const { t } = useTranslation();
    const [month, setMonth] = useState(0);
    const selectMonth = (event) => {
        setMonth(event.target.value)
    };

    return (
        <>
            <Paper elevation={4} >
                <div className="SMPTServerMainDiv">
                    <div className="SMPTInnerDivs mt-3">
                        <p >{t('Managerincharge')}</p>
                        <TextField
                            className="Errortextfield setHeightTextfield ManagerinchargeTextfield"
                            name="noticeUsageLevel"
                            variant="outlined"
                            size="small"
                        />
                        <div className="ManagerinchargeTextDiv">
                            <p>User_id@smtp_server.com </p>
                        </div>
                    </div>
                    <div className="SMPTInnerDivs mt-3">
                        <p >{t('Period')}</p>
                        <Select
                            onChange={selectMonth}
                            displayEmpty
                            variant="outlined"
                            className="PeriodDropDown"
                            value={month}
                        >
                            <MenuItem value={0}>{t("processSelect")}</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                        <div className="PeriodTextDiv">
                            <p>{(t("Hour(s)"))}</p>
                        </div>
                    </div>
                    <div className="check-Box-main-div mt-3 mb-3">
                        <p >{t('NotificationType')}</p>
                        <div className="checkboxDiv">
                            <div style={{ width: "240px", marginRight: '5px', display: 'flex' }}>
                                <Checkbox style={{ padding: '0px' }} color="primary" /><label><p style={{ paddingLeft: '8px' }}> {t("DatabaseDisconnected")} </p></label>
                            </div>
                            <div style={{ width: "240px", display: 'flex' }}>
                                <Checkbox style={{ padding: '0px' }} color="primary" /> <label><p style={{ paddingLeft: '8px' }}> {t("LicenseExpired")} </p></label>
                            </div>
                        </div>
                    </div>
                    <div className="ButtonDiv">
                        <Button className="Btn-Color ButtonSimilarWidth" variant="contained"
                        >
                            {t("summarySave")}
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default SystemErrorNotificationSetting;