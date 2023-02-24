import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "./style";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";
import { AppContext } from 'shared/contexts';
import { SharedService } from '../../../services';
import UsagePageComponent from "./usage-page";
import TrayComponent from "./tray";
import DeviceConsumableLevel from "./device-consumable";
import { getTokenData } from "utils";
import "../../../shared/Shared.css";
import PrinterImage from "../../Administrators/Model/Image/printer1.png";

const defaultState = {
  isDeleting: false,
  usagePageEntries: [],
  trayEntries: [],
  deviceConsumableLevel: [],
  fetchingDevice: false,
  fetchingPaper: false,
  fetchingTray: false,
  fetchingConsumable: false,
  deviceInfo: {},
  partnerSetting: {},
  fetchingParnters: false,
};

const EquipmentSummary = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();
  const { setNewPrinterCount, setWaitingPrinterCount, devices, setDevices } = useContext(AppContext);
  const userData = getTokenData();
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

  const GetUnassignDeviceCount = async () => {
    const { data, error } = await SharedService.GetUnassignDeviceCount();
    if (error) {
      toast.error(error);
    } else {
      setNewPrinterCount(data || "0");
    }
  };

  const GetWaitDeviceCount = async () => {
    const { data, error } = await SharedService.GetWaitDeviceCount();
    if (error) {
      toast.error(error);
    } else {
      setWaitingPrinterCount(data || "0");
    }
  };

  const handleDeleteConfirmation = async () => {
    setState((prevState) => ({ ...prevState, fetchingDevice: true }));
    const { data, error } = await Service.DeleteDevice({
      dt1: "",
      deviceInfoId: match.params.deviceId,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, fetchingDevice: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingDevice: false,
        isDeleting: false,
      }));
      GetUnassignDeviceCount();
      GetWaitDeviceCount()
      history.push("/summary");
    }
  };

  const fetchUsagePageEntries = async () => {
    setState((prevState) => ({ ...prevState, fetchingPaper: true }));
    const { data, error } = await Service.GetDeviceSimplePaperUsage({
      deviceInfoId: match.params.deviceId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, fetchingPaper: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingPaper: false,
        usagePageEntries: data || defaultState.usagePageEntries,
      }));
    }
  };

  const fetchTrayEntries = async () => {
    setState((prevState) => ({ ...prevState, fetchingTray: true }));
    const { data, error } = await Service.GetDeviceTrayList({
      deviceInfoId: match.params.deviceId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, fetchingTray: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingTray: false,
        trayEntries: data || defaultState.trayEntries,
      }));
    }
  };

  const GetDeviceInfoForWeb = async () => {
    setState((prevState) => ({ ...prevState, fetchingDevice: true }));
    const payload = {
      deviceInfoId: match.params.deviceId,
      dt1: "",
    };
    const { data, error } = await Service.GetDeviceInfoForWeb(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, fetchingDevice: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingDevice: false,
        deviceInfo: data || defaultState.deviceInfo,
      }));
      const updatedDevices = devices.map(device => {
        return {
          ...device,
          printerProfileImage: device.deviceInfoId === match.params.deviceId ? data.printerProfileImage : device.printerProfileImage
        }
      });
      setDevices(updatedDevices);
    }
  };

  const GetDeviceConsumableLevel = async () => {
    setState((prevState) => ({ ...prevState, fetchingConsumable: true }));
    const payload = {
      deviceInfoId: match.params.deviceId,
      dt1: "",
    };
    const { data, error } = await Service.GetDeviceConsumableLevel(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, fetchingConsumable: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        fetchingConsumable: false,
        deviceConsumableLevel: data || defaultState.deviceConsumableLevel,
      }));
    }
  };

  const toggleBookmark = async () => {
    setState((prevState) => ({ ...prevState, fetchingDevice: true }));
    const payload = {
      deviceInfoId: match.params.deviceId,
      dt1: "",
    };
    if (state.deviceInfo.isBookmark == "Y") {
      const { data, error } = await Service.DeleteBookmark(payload);
      if (error) {
        toast.error(error);
        setState((prevState) => ({ ...prevState, fetchingDevice: false }));
      } else {
        setState((prevState) => ({
          ...prevState,
          fetchingDevice: false,
          deviceInfo: {
            ...prevState.deviceInfo,
            isBookmark: "N",
          },
        }));
      }
    } else if (state.deviceInfo.isBookmark == "N") {
      const { data, error } = await Service.AddBookmark(payload);
      if (error) {
        toast.error(error);
        setState((prevState) => ({ ...prevState, fetchingDevice: false }));
      } else {
        setState((prevState) => ({
          ...prevState,
          fetchingDevice: false,
          deviceInfo: {
            ...prevState.deviceInfo,
            isBookmark: "Y",
          },
        }));
      }
    }
  };

  useEffect(() => {
    fetchPartnerSetting();
    GetDeviceInfoForWeb();
    fetchUsagePageEntries();
    fetchTrayEntries();
    GetDeviceConsumableLevel();
  }, []);

  return (
    <>
      <div className={clsx('d-flex f-justify-between', classes.prienter_mainarea)}>
        <div style={{ display: 'flex' }}>
          <Paper
            elevation={4}
            className="mb-6"
            classes={{
              root: classes.starIconPaper,
            }}
          >
            <div className="d-flex f-justify-center p-1">
              <span
                className={clsx(classes.startIcon, "mt-5 c-pointer", {
                  [classes.isBookmark]: state.deviceInfo.isBookmark === "Y",
                })}
                onClick={toggleBookmark}
              >
                {state.deviceInfo.isBookmark === "Y" ? <i class="fas fa-star"></i> : <i class="far fa-star"></i>}
              </span>
            </div>
          </Paper>
          {/* <Paper
            elevation={4}
            className="mb-6 ml-2"
            classes={{
              root: classes.startImagePaper,
            }}
          >
            <div className="d-flex f-justify-center p-1">
              <span>
                <img className={classes.ImageStyle} src={PrinterImage} alt="No Image" />
              </span>
            </div>
          </Paper> */}
          <Paper
            elevation={4}
            className="mb-6 ml-2"
            classes={{
              root: classes.startDigitalScreenPaper,
            }}
          >
            <div className={`${classes.lcdMainBox} p-1`}>
              <p className={classes.lcdDisplay} >LCD Display</p>
              <div className={classes.lcdInnerBox}>
                <p className={classes.lcdMainText}>Hello World Hello World Hello W...</p>
              </div>
            </div>
          </Paper>
        </div>
        <div className="d-flex flex-column f-align-center">
          <Typography variant="h4">
            {state?.deviceInfo?.endCustomerName || ""}
          </Typography>
          <Typography variant="h5" style={{ textAlign: 'center' }}>
            {state?.deviceInfo?.displayName && state?.deviceInfo?.deviceSerial
              ? `${state?.deviceInfo?.displayName}(${state?.deviceInfo?.deviceSerial})`
              : ""}
          </Typography>
        </div>
        <div className="d-flex">
          {state.deviceInfo.printerProfileImage ?
            <Paper
              elevation={4}
              className="mb-6 mr-2"
              classes={{
                root: classes.startImagePaper,
              }}
            >
              <div className="d-flex f-justify-center p-1" style={{ height: '100%' }}>
                <span style={{ display: 'inherit' }}>
                  <img className={classes.ImageCrownStyle} src={`https://app2.okprobe.com/${state.deviceInfo.printerProfileImage}`} alt="No Image" />
                </span>
              </div>
            </Paper> : ''}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant="contained"
              className="pl-1 pr-1 Btn-Color"
              onClick={() => {
                history.push(
                  `/printers/equipment-modification/${match.params.deviceId}`
                );
              }}
            >
              <Typography variant="button" className="pl-8 pr-8">
                {t("summaryModified")}
              </Typography>
            </Button>
            {(userData?.userRole !== "10" || userData?.deleteOwner !== "0") && (
              <Button
                variant="contained"
                className="pl-1 pr-1 mt-2 bg-danger color-white"
                color="secondary"
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    isDeleting: true,
                  }));
                }}
              >
                <Typography variant="button" className="pl-8 pr-8 ">
                  {t("summarydelete")}
                </Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
      {!!state.deviceConsumableLevel.length && (
        <DeviceConsumableLevel
          deviceInfoId={match.params.deviceId}
          lastUpdatedDate={match.params.lastUpdatedDate}
          isFetching={state.fetchingConsumable}
          deviceConsumableLevel={state.deviceConsumableLevel}
          noticeNoEmail={state.partnerSetting?.noticeNoEmail}
          handleDetailClick={() => {
            history.push(
              `/printers/device-consumable-detail/${match.params.deviceId}`
            );
          }}
        />
      )}
      {!!state.usagePageEntries.length && (
        <UsagePageComponent
          lastUpdatedDate={match.params.lastUpdatedDate}
          isFetching={state.fetchingPaper}
          usagePageEntries={state.usagePageEntries}
          noticeNoEmail={state.partnerSetting?.noticeNoEmail}
          handleDetailClick={() => {
            history.push(
              `/printers/usage-page/${match.params.deviceId}/last-updated-at/${match.params.lastUpdatedDate}`
            );
          }}
        />
      )}
      {!!state.trayEntries.length && (
        <TrayComponent
          lastUpdatedDate={match.params.lastUpdatedDate}
          isFetching={state.fetchingTray}
          trayEntries={state.trayEntries}
          partnerSetting={state.partnerSetting}
        />
      )}
      <div className={classes.mobTabg}>
        <Paper
          elevation={4}
          className="mb-6 mr-2 c-pointer"
          classes={{
            root: classes.tabPaper,
          }}
          onClick={() => {
            history.push(`/printers/event-list/${match.params.deviceId}`);
          }}
        >
          <div className="d-flex f-align-center">
            <div
              className={clsx(
                "ml-2 mt-2 d-flex f-justify-around",
                classes.eventbox
              )}
            >
              <span className={classes.whiteIcon}>
                <i class="far fa-bell"></i>
              </span>
            </div>
            <Typography variant="h6" className="Text-Color ml-4 mt-2">
              {t("summaryevent")}
            </Typography>
          </div>
        </Paper>
        <Paper
          elevation={4}
          className="mb-6 mr-2 c-pointer"
          classes={{
            root: classes.tabPaper,
          }}
          onClick={() => {
            history.push(`/printers/memo-list/${match.params.deviceId}`);
          }}
        >
          <div className="d-flex f-align-center">
            <div
              className={clsx(
                "ml-2 mt-2  d-flex f-justify-around",
                classes.memoBox
              )}
            >
              <span className={classes.whiteIcon}>
                <i class="far fa-comments"></i>
              </span>
            </div>
            <Typography variant="h6" className="Text-Color ml-4 mt-2">
              {t("summarymemo")}
            </Typography>
          </div>
        </Paper>
        <Paper
          elevation={4}
          className="mb-6 c-pointer"
          classes={{
            root: classes.tabPaper,
          }}
          onClick={() => {
            history.push(`/printers/report/${match.params.deviceId}`);
          }}
        >
          <div className="d-flex f-align-center">
            <div
              className={clsx(
                "ml-2 mt-2  d-flex f-justify-around",
                classes.reportBox
              )}
            >
              <span className={classes.startIcon}>
                <i class="far fa-chart-bar"></i>
              </span>
            </div>
            <Typography variant="h6" className="Text-Color ml-4 mt-2">
              {t("summaryreport")}
            </Typography>
          </div>
        </Paper>
      </div>
      {state.isDeleting && (
        <Dialog
          onClose={() => {
            setState((prevState) => ({
              ...prevState,
              isDeleting: false,
            }));
          }}
          open={state.isDeleting}
          classes={{
            paper: classes.deleteModal,
          }}
        >
          <DialogTitle>
            <div className="d-flex f-align-center f-justify-between">
              <Typography variant="h5">Confirm deletion</Typography>
              <IconButton
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    isDeleting: false,
                  }));
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <Divider />
          <DialogContent className="mt-4">
            <Typography variant="body1" className="mb-4">
              {t("summaryAre you sure you want to delete it")}
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <div className="d-flex">
              <Button
                variant="outlined"
                className={`mt-2 mb-2 mr-2 ${classes.DeleteButtonSimilarWidth}`}
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    isDeleting: false,
                  }));
                }}
              >
                {t("summaryclose")}
              </Button>
              <Button
                variant="outlined"
                className={`mt-2 mr-2 mb-2 bg-danger color-white ${classes.DeleteButtonSimilarWidth}`}
                onClick={handleDeleteConfirmation}
              >
                {t("summarydelete")}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default EquipmentSummary;