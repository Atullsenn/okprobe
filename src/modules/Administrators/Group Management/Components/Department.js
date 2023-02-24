import React, { useState } from "react";
import '../view/Groupstyle.css'
import Select from "@material-ui/core/Select";
import { Button, MenuItem, Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import { Grid } from "shared/components";
import Typography from "@material-ui/core/Typography";
import Add from '../Components/Add';
import Modify from "./Modify";
import "../../../../shared/Shared.css";

const TypographyWithClick = ({ children, onClick }) => {
  return <Typography variant="body1" style={{ textAlign: "center" }} onClick={onClick}>
    {children}
  </Typography>
}

const data = [
  {
    id: 1,
    Department: '본사',
    UpperDepartment: "",
    Remark: "",
    RegistrationDate: '2021-02-18',
  },
  {
    id: 2,
    Department: 'okProbe',
    UpperDepartment: "okProbe 2",
    Remark: "WebsiteGroup",
    RegistrationDate: '	2021-03-24',
  },
  {
    id: 3,
    Department: 'Smart',
    UpperDepartment: "",
    Remark: "",
    RegistrationDate: '2021-03-24',
  },
  {
    id: 4,
    Department: 'C',
    UpperDepartment: "B",
    Remark: "Chat Group",
    RegistrationDate: '2022-06-15',
  },
];

const defaultState = {
  entries: data,
  status: null,
  order: null,
  orderBy: null,
};

const Department = ({ match }) => {
  const [Department, setDepartment] = useState(0);
  const [popUp, setPopUp] = useState(false)
  const [modiPopUp, setModiPopUp] = useState(false)
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
  const updateDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const columnConfig = [
    {
      id: "_Department",
      fieldName: "_Department",
      label: t("processDepartment"),
      canSort: true,
      render: (Rows) => (
        <TypographyWithClick onClick={() => { setModiPopUp(true) }}>
          {Rows.Department}
        </TypographyWithClick>
      ),
    },
    {
      id: "_UpperDepartment",
      field: "_UpperDepartment",
      label: t("processUpperDepartment"),
      canSort: true,
      render: (Rows) => (
        <TypographyWithClick onClick={() => { setModiPopUp(true) }}>
          {Rows.UpperDepartment}
        </TypographyWithClick>
      ),
    },
    {
      id: "_Remark",
      fieldName: "_Remark",
      label: t("processRemark"),
      canSort: true,
      render: (Rows) => (
        <TypographyWithClick onClick={() => { setModiPopUp(true) }}>
          {Rows.Remark}
        </TypographyWithClick>
      ),
    },
    {
      id: "_RegistrationDate",
      field: "_RegistrationDate",
      label: t("processRegistrationDate"),
      canSort: true,
      render: (Rows) => (
        <TypographyWithClick onClick={() => { setModiPopUp(true) }}>
          {Rows.RegistrationDate}
        </TypographyWithClick>
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
      <div className="DepartMainDiv mt-4 mb-4">
        <div className="DepartField">
          <a className="commonTextPadding">{t('processShow')}</a>
          <Select
            className="FirstDropDown ml-1"
            value={Department}
            onChange={updateDepartment}
            displayEmpty
            variant="outlined" s
            style={{ height: "40px", minWidth: '70px' }}
          >
            <MenuItem value={0}>{t("20")}</MenuItem>
            <MenuItem value={'50'}>50</MenuItem>
            <MenuItem value={'100'}>100</MenuItem>
            <MenuItem value={'200'}>200</MenuItem>
          </Select>
          <a className="commonTextPadding">{t('processEntries')}</a>
          <a className="commonTextPadding">{t('processSearch')}</a>
          <TextField
            className="SearchTextField ml-2"
            name="noticeUsageLevel"
            variant="outlined"
            defaultValue={""}
            size="small"
          />
        </div>
        <div className="DepartButtons" >
          <Button variant="contained" className="btn Delete-Btn" >{t('processDelete')} </Button>
          <Button variant="contained" className="btn ml-2 Btn-Color" onClick={() => { setPopUp(true) }}>{t('processAdd')}</Button>
        </div>
      </div>
      <Paper elevation={4}>
        <Grid
          columns={columnConfig}
          rows={state.entries}
          onSortChange={handleSortChange}
          order={state.order}
          orderBy={state.orderBy}
        />
      </Paper>
      {popUp ? <Add setClosePopUp={setPopUp} /> : ''}
      {modiPopUp ? <Modify setCloseModiPopUp={setModiPopUp} /> : ''}
    </>
  );
};

export default Department;
