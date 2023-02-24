import React, { useState } from "react";
import "../view/PrinterSearchstyle.css";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { Button, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "../../../../shared/Shared.css";
import { Divider } from '@material-ui/core';
import SelectedDepartment from "./SelectedDepartment";
import { Datepicker } from "shared/components";
import { useHistory } from "react-router-dom";

const EndDefaultDate = () => {
  const currentyear = new Date().getFullYear();
  const newAddDate = new Date()
  newAddDate.setFullYear(currentyear + 1)
  return newAddDate
}

const RegisterPrinter = () => {
  const [endcontract, setEndContract] = useState(EndDefaultDate());
  const [popUp, setPopUp] = useState(false)
  const [departmentName, setDepartmentName] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("processRegisterPrinter")}</Typography>
      </div>
      <Paper elevation={4} className="p-4">
        <div className='wraplayout'>
          <TextField
            name="noticeNoUse"
            className="disableColor"
            fullWidth
            variant="outlined"
            size="small"
            label={t("processPrinterModel")}
            value="Brother MFC-LS700DW services"
            disabled={true}
          />
          <TextField
            name="noticeNoUse"
            className='mt-6 disableColor'
            fullWidth
            variant="outlined"
            size="small"
            label={t("processSerialNumber")}
            value="RJF9800293"
            disabled={true}
          />
          <Divider className="mt-6" />
          <div className="mt-6 d-flex f-justify-between">
            <TextField
              name='noticeNoUse'
              className="mr-6"
              fullWidth
              variant='outlined'
              size='small'
              label={t('processDepartmentName')}
              value={departmentName}
            />
            <Button className='Btn-Color' style={{ minWidth: '90px' }} variant="contained" onClick={() => { setPopUp(!popUp) }}>{t("processSelect")}</Button>
          </div>
          <TextField
            name="noticeNoUse"
            className='mt-6'
            fullWidth
            variant="outlined"
            size="small"
            label={t("dashboardLocation")}
          />
          <TextField
            name="noticeNoUse"
            fullWidth
            className="mt-6"
            variant="outlined"
            size="small"
            label={t("processPrinterinformation")}
            defaultValue="Brother MFC-LS700DW services"
          />
          <Divider className="mt-6 mb-6" />
          <div className="d-flex f-justify-between">
            <div className="mr-2">
              <Datepicker
                className="set-default-date"
                label={t("startofContract")}
                selected={new Date()}
              />
            </div>
            <div className="ml-2">
              <Datepicker
                className="set-default-date"
                label={t("contractTerminal")}
                selected={endcontract}
              />
            </div>
          </div>
          <TextField
            name="noticeNoUse"
            fullWidth
            className="mt-6"
            variant="outlined"
            size="small"
            label={t("summarymemo")}
          />
          <div className="d-flex f-align-center mt-6">
            <Button
              fullWidth
              className="mr-10"
              style={{ height: '40.3px' }}
              size="large"
              variant="contained"
              onClick={() => {
                history.goBack();
              }}
            >
              {t("settingsCancel")}
            </Button>
            <Button
              fullWidth
              className="ml-10 Btn-Color"
              size="large"
              variant="contained"
            >
              {t("settingsSave")}
            </Button>
          </div>
        </div>
      </Paper>
      {popUp ? <SelectedDepartment setClosePopUp={setPopUp} setSelectedDepartmentName={setDepartmentName} /> : ''}
    </>
  );
};

export default RegisterPrinter;
