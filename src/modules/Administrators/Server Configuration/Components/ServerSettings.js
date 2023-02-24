import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "../view/ServerStyle.css";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";


const ServerSettings = () => {
    const { t } = useTranslation();
    const [manageCycle, setManageCycle] = useState({
        fault: '0',
        usage: '0',
        consumable: '0',
        dbBackup: '0',
        index: '0',
    });
    const selectManage = (event) => {
        const { value, name } = event.target;
        setManageCycle((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    };
    return (
        <>
            <Paper elevation={4} className="p-1">
                <div className="ServerSettingDiv ">
                    <p>{t('FaultManageCycle')}</p>
                    <Select
                        className="ServerSettingTextfield"
                        onChange={selectManage}
                        displayEmpty
                        variant="outlined"
                        name="fault"
                        value={manageCycle.fault}
                    >
                        <MenuItem value={0}>{t("processSelect")}</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </Select>
                    <div>
                        <a>{t("Months")}</a>
                    </div>
                </div>
                <div className="ServerSettingDiv ">
                    <p>{t('UsageManageCycle')}</p>
                    <Select
                        className="ServerSettingTextfield"
                        onChange={selectManage}
                        displayEmpty
                        variant="outlined"
                        name="usage"
                        value={manageCycle.usage}
                    >
                        <MenuItem value={0}>{t("processSelect")}</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={17}>17</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                        <MenuItem value={19}>19</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={21}>21</MenuItem>
                        <MenuItem value={22}>22</MenuItem>
                        <MenuItem value={23}>23</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                    </Select>
                    <div>
                        <a>{t("Months")}</a>
                    </div>
                </div>
                <div className="ServerSettingDiv ">
                    <p >{t('ConsumableManageCycle')}</p>
                    <Select
                        className="ServerSettingTextfield"
                        onChange={selectManage}
                        displayEmpty
                        variant="outlined"
                        name="consumable"
                        value={manageCycle.consumable}
                    >
                        <MenuItem value={0}>{t("processSelect")}</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </Select>
                    <div>
                        <a>{t("Months")}</a>
                    </div>
                </div>
                <div className="ServerSettingDiv">
                    <p >{t('DBBackupManageCycle')}</p>
                    <Select
                        onChange={selectManage}
                        className="ServerSettingTextfield"
                        displayEmpty
                        variant="outlined"
                        name="dbBackup"
                        value={manageCycle.dbBackup}
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
                    <div>
                        <a>{t("Months")}</a>
                    </div>
                </div>
                <div className="ServerSettingDiv">
                    <p >{t('IndexRebuildManageCycle')}</p>
                    <Select
                        onChange={selectManage}
                        displayEmpty
                        className="ServerSettingTextfield"
                        variant="outlined"
                        name="index"
                        value={manageCycle.index}
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
                    <div>
                        <a>{t("Months")}</a>
                    </div>
                </div>
                <div className="ButtonDiv">
                    <Button className="Btn-Color ButtonSimilarWidth" variant="contained"
                    >
                        {t("summarySave")}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ServerSettings;