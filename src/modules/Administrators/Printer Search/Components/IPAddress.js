import React, { useState,useEffect } from "react";
import "../view/PrinterSearchstyle.css";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { Button, Checkbox, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";
import Items from "./Items";
import Service from '../../service';

const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const noop = () => { };
const IPAddress = ({ match, getUnassignDeviceCount = noop }) => {
  const [agent, setAgent] = useState(0);
  const { t } = useTranslation();
  const [startIpError, setStartIpError] = useState(false);
  const [endIpError, setEndIpError] = useState(false);
  const [firstSecondPartError, setFirstSecondPartError] = useState(false);
  const [firstTextfield, setFirstTextfield] = useState('');
  const [secondTextfield, setSecondTextfield] = useState('');
  const [showPaperAndData, setShowPaperAndData] = useState(false);
  const [autoChecked, setAutoChecked] = useState(false);
  const [agentName,setAgentName] = useState([])

  const checkSecondIpWRTFirstIp = (ip) => {
    const firstIP = firstTextfield
    const secondIp = ip
    const firstIPArr = firstIP.split('.')
    const secondIPArr = secondIp.split('.')
    const isFirstPartSame = parseInt(firstIPArr[0]) === parseInt(secondIPArr[0])
    const isSecondPartSame = parseInt(firstIPArr[1]) === parseInt(secondIPArr[1])
    const isThirdPartGreater = parseInt(firstIPArr[2]) <= parseInt(secondIPArr[2])
    const isForthPartCorrect = parseInt(firstIPArr[3]) <= parseInt(secondIPArr[3])
    const isAllOk = isFirstPartSame && isSecondPartSame && isThirdPartGreater && isForthPartCorrect
    return isAllOk
  }

  const fetchData = (firstIPAddress, secondIPAddress) => {
    return fetch(`https://ep20210201.iptime.org:38765/gateway/printer-discovery/printers/collect-ip?startip=${firstIPAddress}&endip=${secondIPAddress}`,
      {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
          'Authorization': 'Basic ZXBzb2Z0OlByaW50ZXJEaXNjb3Zlcnkh'
        }
      });
  }

  // New API Integeration
  const getAgentData = async () => {
   
    await Service.getAgentData().then((res) => {
        if (res.data != null) {
          setAgentName(res.data)
        
        } else {
          console.log("api error")
        }
    }).catch((error) => {
        console.log(error)
    })
}

console.log("check response for agent")
console.log(agentName)
console.log("check response for agent")


useEffect(() => {
    getAgentData()
}, [])



  //New API Integeration

  const updateAgent = (event) => {
    setAgent(event.target.value);
  };

  const setAutoSearch = (e) => {
    setStartIpError(false);
    setEndIpError(false);
    setFirstSecondPartError(false)
    if (e.target.checked) {
      setFirstTextfield('0.0.0.0')
      setSecondTextfield('0.0.0.0')
      setAutoChecked(!autoChecked);
    } else {
      setFirstTextfield('')
      setSecondTextfield('')
      setAutoChecked(!autoChecked);
    }
  }

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("sidebarPrinterSearch")}</Typography>
      </div>
      <Paper elevation={4} className="p-4">
        <div className="agent-label-select-main-area">
          <div className="agent-label-select-box-area">
            <label className="agent">{t("processagent")}<span style={{ color: 'red' }}> * </span></label>
            
            <Select
              className="dropDown"
              value={agent}
              onChange={updateAgent}
              displayEmpty
              variant="outlined"
            >
             {agentName.map((item)=>{
              <MenuItem value={item.displayName}>t{item.displayName}</MenuItem>
              // <MenuItem value={0}>{t("processSelect")}</MenuItem>
              // <MenuItem value={1}>1</MenuItem>
              // <MenuItem value={2}>2</MenuItem>
              // <MenuItem value={3}>3</MenuItem>
              // <MenuItem value={4}>4</MenuItem>
            })}
            </Select>
            
          </div>
        </div>
        <div className="startip-label-input-main-area">
          <div className="startip-label-input-box-area">
            <label className={`${startIpError ? 'paddingBottom' : ''} startIplabel`}>{t("processStartIp")}<span style={{ color: 'red' }}> * </span></label>
            <TextField
              error={startIpError}
              variant="outlined"
              className="textField"
              size="small"
              label={t("IpAddress")}
              value={firstTextfield}
              helperText={(startIpError ? "IP Address is required." : '')}
              onChange={(e) => {
                const isIpCorrect = ipRegex.test(e.target.value);
                setStartIpError(e.target.value === '' ? '' : !isIpCorrect);
                setFirstTextfield(e.target.value);
                setShowPaperAndData(false);
                setSecondTextfield('')
                setAutoChecked(e.target.value === '0.0.0.0' && secondTextfield === '0.0.0.0.0' ? true : false)
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      style={{
                        width: 15,
                        height: 22,
                        color: startIpError ? "red" : "#35b803",
                      }}
                    >
                      {startIpError ? <InfoIcon /> : <CheckCircleOutlineIcon />}
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="endip-label-input-main-area">
          <div className="endip-label-input-box-area">
            <label className={`${endIpError || firstSecondPartError ? 'paddingBottom' : ''} EndIplabel`}>{t("processEndIp")}<span style={{ color: 'red' }}> * </span> </label>
            <TextField
              error={endIpError && secondTextfield != '' || firstSecondPartError && secondTextfield != ''}
              variant="outlined"
              className="textField"
              color="yellow"
              size="small"
              label={t("IpAddress")}
              value={secondTextfield}
              helperText={(endIpError && secondTextfield != '' ? "IP Address is required." : firstSecondPartError && secondTextfield != '' ? 'Make sure first 2 parts are same and end IP is greater' : '')}
              onChange={(e) => {
                const isIpCorrect = ipRegex.test(e.target.value);
                const isSecondIpCorrect = checkSecondIpWRTFirstIp(e.target.value)
                setFirstSecondPartError(e.target.value === '' ? '' : !isSecondIpCorrect)
                setEndIpError(e.target.value === '' ? '' : !isIpCorrect);
                setSecondTextfield(e.target.value);
                setShowPaperAndData(false);
                setAutoChecked(e.target.value === '0.0.0.0' && firstTextfield === '0.0.0.0' ? true : false)
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      style={{
                        width: 15,
                        height: 22,
                        color: endIpError && secondTextfield != '' || firstSecondPartError && secondTextfield != '' ? "red" : "#35b803",
                      }}
                    >
                      {endIpError && secondTextfield != '' || firstSecondPartError && secondTextfield != '' ? <InfoIcon /> : <CheckCircleOutlineIcon />}
                    </div>
                  </InputAdornment>
                ),
              }}
            />
            <span style={{ color: 'red', height: `${endIpError && secondTextfield != '' || firstSecondPartError && secondTextfield != '' ? '66px' : ''}` }}><Checkbox color="primary" checked={autoChecked} onChange={(e) => { setAutoSearch(e) }} /> <span style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '16px', fontWeight: 'bold' }}>{t("Auto")}</span></span>
          </div>
        </div>
        <div className="agent-start-end-smbtbtn-area">
          <label className="EndIplabel">{t("")}</label>
          <div className="smbt-btn-area">
            {/* <Link to={`${match.path}/search-result`}> */}
            <Button variant="contained" className="searchBtn" color="primary"
              disabled={(agent != 0 && !showPaperAndData && firstTextfield.length && !firstSecondPartError && secondTextfield.length && !endIpError && !startIpError) ? false : true} onClick={() => { fetchData(firstTextfield, secondTextfield); setShowPaperAndData(!showPaperAndData); }}
            >
              {t("processSearchBtn")}
            </Button>
            {/* </Link> */}
          </div>
        </div>
        <Items setShowPaperAndData={showPaperAndData} />
      </Paper>
    </>
  );
};

export default IPAddress;
