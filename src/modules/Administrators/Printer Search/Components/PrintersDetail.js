import React, { useState } from "react";
import "../view/PrinterSearchstyle.css";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
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

const PrintersDetail = () => {
  const [endcontract, setEndContract] = useState(EndDefaultDate());
  const [popUp, setPopUp] = useState(false)
  const [departmentName, setDepartmentName] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("processRegisterPrinters")}</Typography>
      </div>
      <Paper elevation={4} className="p-4">
        <div className='wraplayout'>
          <div className="d-flex f-justify-between">
            <TextField
              name='noticeNoUse'
              className="mr-6"
              fullWidth
              variant='outlined'
              size='small'
              label={t('processDepartmentName')}
              value={departmentName}
            />
            <Button style={{ minWidth: '90px' }} className="Btn-Color" variant="contained" onClick={() => { setPopUp(!popUp) }}>{t("processSelect")}</Button>
          </div>
          <TextField
            name="noticeNoUse"
            className='mt-6'
            fullWidth
            variant="outlined"
            size="small"
            label={t("dashboardLocation")}
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
              variant="contained"
              fullWidth
              className="mr-10"
              size="large"
              style={{ height: '40.3px' }}
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

export default PrintersDetail;
