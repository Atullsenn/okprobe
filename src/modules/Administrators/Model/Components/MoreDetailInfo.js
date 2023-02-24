import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import "../view/Modelstyle.css";
import { Grid } from "shared/components";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem } from "@material-ui/core";
import "../../../../shared/Shared.css";
import PrinterImage from "../Image/printer1.png";
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const MoreDetailInfo = () => {
  const { t } = useTranslation();
  const [passingIdFirstTable, setPassingIdFirstTable] = useState();
  const [passingIdSecondTable, setPassingIdSecondTable] = useState();
  const [showTextarea, setShowTextarea] = useState(false);
  const [showTextareaOther, setShowTextareaOther] = useState(false);
  const [firstTableData, setFirstTableData] = useState([
    {
      id: 1,
      TonerValue: 5,
      FuserValue: 27,
      DeveloperValue: 77,
      OPCValue: 45,
      TransferValue: 88,
      OtherValue: 100,
    }
  ])
  const [firstTableDublicateValue, setFisrtTableDublicateValue] = useState()
  const [secondTableData, setSecondTableData] = useState([
    {
      id: 1,
      MinValue: 94,
      MaxValue: 57,
    }
  ])
  const [secondTableDublicateValue, setSecondTableDublicateValue] = useState()
  const [ModelType, setModelType] = useState(1);
  const [SupplyType, setSupplyType] = useState(0);
  const [PaperSize, setPaperSize] = useState(0);

  const updateModelType = (event) => {
    setModelType(event.target.value);
  };

  const updateSupplyType = (event) => {
    setSupplyType(event.target.value);
  }

  const updatePaperSize = (event) => {
    setPaperSize(event.target.value);
  }

  const FirstEventValue = (event) => {
    const { name, value } = event.target;
    setFirstTableData(prevState =>
      prevState.map(items => {
        if (items.id === passingIdFirstTable) {
          let percentageValue = parseInt(value, 10);
          if (percentageValue > 100) percentageValue = 100;
          if (percentageValue < 0) percentageValue = 0;
          return { ...items, [name]: percentageValue };
        }
        return items;
      }),
    );
  }

  const getFirstDublicateValue = () => {
    setFisrtTableDublicateValue(firstTableData)
  }

  const SecondEventValue = (event) => {
    const { name, value } = event.target;
    setSecondTableData(prevState =>
      prevState.map(items => {
        if (items.id === passingIdSecondTable) {
          let percentageValue = parseInt(value, 10);
          if (percentageValue > 100) percentageValue = 100;
          if (percentageValue < 0) percentageValue = 0;
          return { ...items, [name]: percentageValue };
        }
        return items;
      }),
    );
  }

  const getSecondDublicateValue = () => {
    setSecondTableDublicateValue(secondTableData)
  }

  const columnConfig = [
    {
      id: "_Toner",
      field: "_Toner",
      label: t("processToner"),
      render: (firstTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextarea ?
            <TextField
              className={`Rowfield TextRight ${passingIdFirstTable === firstTableData.id ? '' : 'disableColor'}`}
              name="TonerValue"
              variant="outlined"
              value={firstTableData.TonerValue}
              size="small"
              type={'number'}
              onChange={FirstEventValue}
              disabled={passingIdFirstTable === firstTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {firstTableData.TonerValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_Fuser",
      fieldName: "_Fuser",
      label: t("processFuser"),
      render: (firstTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextarea ?
            <TextField
              className={`Rowfield TextRight ${passingIdFirstTable === firstTableData.id ? '' : 'disableColor'}`}
              name="FuserValue"
              variant="outlined"
              value={firstTableData.FuserValue}
              size="small"
              type={'number'}
              onChange={FirstEventValue}
              disabled={passingIdFirstTable === firstTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {firstTableData.FuserValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_Developer",
      field: "_Developer",
      label: t("processDeveloper"),
      render: (firstTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextarea ?
            <TextField
              className={`Rowfield TextRight ${passingIdFirstTable === firstTableData.id ? '' : 'disableColor'}`}
              name="DeveloperValue"
              variant="outlined"
              value={firstTableData.DeveloperValue}
              size="small"
              type={'number'}
              onChange={FirstEventValue}
              disabled={passingIdFirstTable === firstTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {firstTableData.DeveloperValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "-OPC",
      field: "_OPC",
      label: t("processOPC"),
      render: (firstTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextarea ?
            <TextField
              className={`Rowfield TextRight ${passingIdFirstTable === firstTableData.id ? '' : 'disableColor'}`}
              name="OPCValue"
              variant="outlined"
              value={firstTableData.OPCValue}
              size="small"
              type={'number'}
              onChange={FirstEventValue}
              disabled={passingIdFirstTable === firstTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {firstTableData.OPCValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_Transfer",
      field: "_Transfer",
      label: t("processTransfer"),
      render: (firstTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextarea ?
            <TextField
              className={`Rowfield TextRight ${passingIdFirstTable === firstTableData.id ? '' : 'disableColor'}`}
              name="TransferValue"
              variant="outlined"
              value={firstTableData.TransferValue}
              size="small"
              type={'number'}
              onChange={FirstEventValue}
              disabled={passingIdFirstTable === firstTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {firstTableData.TransferValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_Other",
      field: "_Other",
      label: t("processOther"),
      render: (firstTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextarea ?
            <TextField
              className={`Rowfield TextRight ${passingIdFirstTable === firstTableData.id ? '' : 'disableColor'}`}
              name="OtherValue"
              variant="outlined"
              value={firstTableData.OtherValue}
              size="small"
              type={'number'}
              onChange={FirstEventValue}
              disabled={passingIdFirstTable === firstTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {firstTableData.OtherValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_action",
      field: "_action",
      label: t("newPrinterAction"),
      render: (firstTableData) => {
        return (
          <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
            {passingIdFirstTable === firstTableData.id ?
              <>
                <Tooltip title={t('Save')} placement='top-start'>
                  <Button
                    variant="contained"
                    className="Btn-Color iconButtons"
                    onClick={() => { setPassingIdFirstTable(); setShowTextarea(false); }}
                  >
                    <SaveIcon />
                  </Button>
                </Tooltip>
                <Tooltip title={t('Close')} placement='top-start'>
                  <Button
                    variant="contained"
                    className="deleteBtn iconButtons"
                    onClick={() => { setPassingIdFirstTable(); setFirstTableData(firstTableDublicateValue); setShowTextarea(false); }}
                  >
                    <CloseIcon />
                  </Button>
                </Tooltip>
              </> :
              <Tooltip title={t('Edit')} placement='top-start'>
                <Button
                  variant="contained"
                  className="iconButtons"
                  onClick={() => { setPassingIdFirstTable(firstTableData.id); getFirstDublicateValue(); setShowTextarea(true); }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
            }
          </div>
        )
      }
    },
  ];

  const columnConfig2 = [
    {
      id: "_Min",
      field: "_Min",
      label: t("processMin"),
      render: (secondTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextareaOther ?
            <TextField
              className={`Rowfield TextRight ${passingIdSecondTable === secondTableData.id ? '' : 'disableColor'}`}
              name="MinValue"
              variant="outlined"
              value={secondTableData.MinValue}
              size="small"
              type={'number'}
              onChange={SecondEventValue}
              disabled={passingIdSecondTable === secondTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {secondTableData.MinValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_Max",
      field: "_Max",
      label: t("processMax"),
      render: (secondTableData) => (
        <div style={{ textAlign: 'center' }}>
          {showTextareaOther ?
            <TextField
              className={`Rowfield TextRight ${passingIdSecondTable === secondTableData.id ? '' : 'disableColor'}`}
              name="MaxValue"
              variant="outlined"
              value={secondTableData.MaxValue}
              size="small"
              type={'number'}
              onChange={SecondEventValue}
              disabled={passingIdSecondTable === secondTableData.id ? false : true}
            /> :
            <Typography variant="body1" style={{ textAlign: "right", paddingRight: '20%' }}>
              {secondTableData.MaxValue}
            </Typography>
          }
        </div>
      ),
    },
    {
      id: "_action",
      field: "_action",
      label: t("newPrinterAction"),
      render: (secondTableData) => {
        return (
          <div className="d-flex" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {passingIdSecondTable === secondTableData.id ?
              <>
                <Tooltip title={t('Save')} placement='top-start'>
                  <Button
                    variant="contained"
                    className="Btn-Color iconButtons"
                    onClick={() => { setPassingIdSecondTable(); setShowTextareaOther(false); }}
                  >
                    <SaveIcon />
                  </Button>
                </Tooltip>
                <Tooltip title={t('Close')} placement='top-start'>
                  <Button
                    variant="contained"
                    className="deleteBtn iconButtons"
                    onClick={() => { setPassingIdSecondTable(); setSecondTableData(secondTableDublicateValue); setShowTextareaOther(false); }}
                  >
                    <CloseIcon />
                  </Button>
                </Tooltip>
              </> :
              <Tooltip title={t('Edit')} placement='top-start'>
                <Button
                  variant="contained"
                  className="iconButtons"
                  onClick={() => { setPassingIdSecondTable(secondTableData.id); getSecondDublicateValue(); setShowTextareaOther(true); }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
            }
          </div>
        )
      }
    },
  ]

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("processModelDetailInfo")}</Typography>
      </div>
      <Paper evaluation={4}>
        <table class="table tableBordered other-page-table-main">
          <tbody>
            <tr>
              <td colspan="2">
                <p className="para">{t('processManufacturer')}</p>
              </td>
              <td>
                <TextField
                  className="textfieldStyle disableColor"
                  name="noticeUsageLevel"
                  variant="outlined"
                  value="Samsung Electronics"
                  size="small"
                  disabled={true}
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p className="para">{t('processModelType')}</p>
              </td>
              <td>
                <Select
                  value={ModelType}
                  className="textfieldStyle"
                  onChange={updateModelType}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value={0}>{t("processSelect")}</MenuItem>
                  <MenuItem value={1}>{t("processcolorprinter")}</MenuItem>
                  <MenuItem value={2}>{t("processcolormfp")}</MenuItem>
                  <MenuItem value={4}>{t("processmonoprinter")}</MenuItem>
                  <MenuItem value={5}>{t("processmonomfp")}</MenuItem>
                </Select>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p className="para">{t('supportPaperSize')}</p>
              </td>
              <td>
                <Select
                  value={PaperSize}
                  className="textfieldStyle"
                  onChange={updatePaperSize}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value={0}>{t("processSelect")}</MenuItem>
                  <MenuItem value={'A3'}>A3</MenuItem>
                  <MenuItem value={'A4'}>A4</MenuItem>
                </Select>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p className="para">{t('processSupplyType')}</p>
              </td>
              <td>
                <Select
                  value={SupplyType}
                  className="textfieldStyle"
                  onChange={updateSupplyType}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value={0}>{t("processSelect")}</MenuItem>
                  <MenuItem value={'TONOR'}>{t("printerToner")}</MenuItem>
                  <MenuItem value={'INK'}>{t("printerInk")}</MenuItem>
                </Select>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p className="para">{t('processDriver')}</p>
              </td>
              <td>
                <div className="d-flex">
                  <TextField
                    className="textfieldStyleAnother"
                    name="noticeUsageLevel"
                    variant="outlined"
                    defaultValue={""}
                    size="small"
                  />
                  <Button variant="contained" className="browserBtn Btn-Color ButtonSimilarWidth"> {t("printerBrowse")} </Button>
                </div>
                <a className="textClass" >-Filename can be alphanumeric characters,'-' and '-'</a>
                <br />
                <p className="textClass" > <input type="checkbox" /> Use Default Printer Driver</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p className="para">{t('processDescription')}</p>
              </td>
              <td>
                <TextField
                  style={{ width: '60%', padding: '0px' }}
                  name="noticeUsageLevel"
                  variant="outlined"
                  defaultValue={""}
                  size="small"
                />
              </td>
            </tr>
            <tr>
              <td rowspan="2" style={{ padding: '0px', border: 'none' }}>
                <p className="para">{t('')}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="para">{t('processImage')}</p>
              </td>
              <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '60%' }}>
                  <TextField
                    className="textfieldStyleAnother"
                    style={{ width: '100%' }}
                    name="noticeUsageLevel"
                    variant="outlined"
                    defaultValue={""}
                    size="small"
                  />
                  <Button variant="contained" className="browserBtn Btn-Color ButtonSimilarWidth"> {t("printerBrowse")} </Button>
                  <br />
                  <p className="textClass"> <input type="checkbox" /> Date Existing Image </p>
                  <a className="textClass">-Filename can be alphanumeric characters,'-' and '-', 65x65
                    pixle image size is appropriate. </a>
                </div>
                <div style={{ width: '20%', height: '38px', marginRight: '40px' }}>
                  <img style={{ width: '60px' }} src={PrinterImage} alt="No Image" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3" style={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'right' }}>
          <Button className="Btn-Color mb-3 mr-3 ButtonSimilarWidth" variant="contained">{t("settingSave")}</Button>
        </div>
      </Paper>
      <h1 className="Heading mt-5">{t('processModelConsumableThreshold')}</h1>
      <Paper className='removeBottom mt-5' elevation={4}>
        <Grid hasSelection={false} columns={columnConfig} rows={firstTableData} />
      </Paper>
      <h1 className="Heading mt-5">{t('processModelUsageThreshold')}</h1>
      <Paper elevation={4} className='mt-5'   >
        <Grid hasSelection={false} columns={columnConfig2} rows={secondTableData} />
      </Paper>
    </>
  );
};

export default MoreDetailInfo;
