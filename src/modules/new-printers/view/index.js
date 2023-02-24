import { useEffect, useState, useContext,useCallback} from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Service from "../service";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useTranslation } from "react-i18next";
import { getTokenData } from 'utils';
import { Grid } from "shared/components";
import { Dialog } from "@material-ui/core";
import { AppContext } from "shared/contexts";
import { SharedService } from "../../../services";
import { SortingState } from '@devexpress/dx-react-grid';
import $ from 'jquery';
import "../../../shared/Shared.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Tooltip from '@material-ui/core/Tooltip';

const printerState = [
  { label: "All", value: "A" },
  { label: "Normal", value: "N" },
  { label: "Caution", value: "C" },
  { label: "Check", value: "W" },
];
const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 200,
  status: printerState[0].value,
  isFetching: false,
  isWaitingModalOpen: false,
  reason: "",
  rowBeingEdited: null,
  isDeleting: false,
  errors: {
    reason: "",
  },
};

const left="left";
const right="right";
const center="center";

const noop = () => {};
const ViewNewPrinters = ({ match, getUnassignDeviceCount = noop }) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();
  const { setNewPrinterCount, setWaitingPrinterCount } = useContext(AppContext);
  const userData = getTokenData();

  const fetchUnassignDeviceList = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.GetUnassignDeviceList({
      status: state.status,
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      insertDateSortOrder: "a",
      displayNameSortOrder: "a",
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
        totalEntries: data[0] && data[0]?.rowcount || defaultState.entries,
      }));
    }
  };

  useEffect(() => {
    fetchUnassignDeviceList();
  }, []);

  const columnConfig = [
    {
      id: "displayName",
      field: "displayName",
      label: t("printerModel"),
       canSort: true,
       sortable: true,
       animateRows: true,
    },
    {
      id: "deviceSerial",
      field: "deviceSerial",
      label: t("dashboardSerial Number"),
       canSort: true,
       sortable: true,
       animateRows: true,
    },
    {
      id: "insertDt",
      field: "insertDt",
      label: t("newPrinterRegistered date"),
       canSort: true,
       sortable: true,
       animateRows: true,
      render: (row) =>
      {
        return (
            <div style={{textAlign:"center"}}>
           {row.insertDt}
          </div>
        )

      },
    },
    {
      id: "action",
      fieldName: "action",
      label: t("newPrinterAction"),
      // canSort: true,
      render: (row) => {
        if (userData?.userRole === "10" && userData?.deleteOwner === "0") {
          return false;
        } else {
          return (
            <div className="d-flex f-justify-center">
              <Tooltip title={t("newPrinterWaiting")} placement='top-start'>
                <Button
                  style={{ margin: '0px 3px', padding: '0px', minWidth: '38px' }}
                  variant="contained"
                  className="mr-2"
                  color=""
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      isWaitingModalOpen: true,
                      rowBeingEdited: row,
                    }));
                  }}
                >
                <HourglassTopIcon/>
                </Button>
              </Tooltip>
              <Tooltip title={t("newPrinterAssignment")} placement='top-start'>
                <Button
                  variant="contained"
                  className="mr-2 Btn-Color"
                  style={{ margin: '0px 3px', padding: '0px', minWidth: '38px' }}
                  onClick={() => {
                    history.push(
                      `${match.path}/assign-printers/${row.deviceInfoId}`
                    );
                  }}
                >
                  <SupervisorAccountIcon/>
                </Button>
              </Tooltip>
              <Tooltip title={t("newPrinterdelete")} placement='top-start'>
                <Button
                  variant="contained"
                  className="bg-danger color-white"
                  style={{ margin: '0px 3px', padding: '0px', minWidth: '38px' }}
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      isDeleting: true,
                      rowBeingEdited: row,
                    }));
                  }}
                >
                  <DeleteForeverIcon/>
                </Button>
              </Tooltip>
            </div>
          );
        }
      },
    },
  ];

  const handleSortChange = (fieldObj, order) => {
    const data = [...state.entries]
    data.sort((a,b)=>{
      if(a[fieldObj.field] > b[fieldObj.field])
        return order ==='A' ? 1 : -1
      else return order ==='A' ? -1 : 1
    })

    setState((prevState) => ({
      ...prevState,
        entries: data,
        order: order,
        orderBy: fieldObj.field || fieldObj.fieldName,
    }));
  };

  const handleModalClose = () => {
    setState((prevState) => ({
      ...prevState,
      isWaitingModalOpen: defaultState.isWaitingModalOpen,
      reason: defaultState.reason,
      errors: defaultState.errors,
      rowBeingEdited: null,
    }));
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

  const handleWaitingConfirm = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.UpdateDeviceStatus({
      deviceStatus: "4",
      dt1: "",
      memo: state.reason,
      deviceInfoId: state.rowBeingEdited.deviceInfoId,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        isDeleting: false,
      }));
      handleModalClose();
      fetchUnassignDeviceList();
      GetUnassignDeviceCount();
      GetWaitDeviceCount();
    }
  };

  const handleDeleteConfirmation = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.DeleteDevice({
      dt1: "",
      deviceInfoId: state.rowBeingEdited?.deviceInfoId,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        isDeleting: false,
        rowBeingEdited: null,
      }));
      handleModalClose();
      fetchUnassignDeviceList();
      GetUnassignDeviceCount();
      GetWaitDeviceCount();
    }
  };
  setTimeout(() =>
  {
  //  alert("p")

  $(".MuiTableContainer-root").css("min-height",'535px')

  }, 200);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("newPrinterNew printer")}</Typography>
      </div>
      <Paper elevation={4}>
        <Grid
          hasSelection={false}
          isLoading={state.isFetching}
          rows={state.entries}
          columns={columnConfig}
          totalRows={state.totalEntries}
          pageSize={state.pageSize}
          pageNumber={state.pageNumber}
          onPageNumberChange={(pageNumber) => {
            setState((prevState) => ({
              ...prevState,
              pageNumber,
            }));
          }}
          onPageSizeChange={(pageSize) => {
            setState((prevState) => ({
              ...prevState,
              pageSize,
            }));
          }}
          onSortChange={handleSortChange}
          order={state.order}
          orderBy={state.orderBy}
        />

      </Paper>
      <Dialog
        onClose={handleModalClose}
        open={state.isWaitingModalOpen}
        classes={{
          paper: classes.waitingModal,
        }}
      >
        <DialogTitle>
          <div className="d-flex f-align-center f-justify-between">
            <Typography variant="h5">
              {t("newPrinterWaiting reason")}
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="mt-4">
          <TextField
            fullWidth
            type="text"
            name="reason"
            className="mb-4"
            variant="outlined"
            value={state.reason}
            error={state.errors.reason.trim()}
            helperText={state.errors.reason}
            onChange={(evt) => {
              const { name, value } = evt.target;
              setState((prevState) => ({
                ...prevState,
                [name]: value,
                errors: {
                  ...prevState.errors,
                },
              }));
            }}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <div className="d-flex">
            <Button
              variant="outlined"
              className={`mr-4 mt-2 mb-2 ${classes.ButtonSimilarWidth}`}
              onClick={handleModalClose}
            >
              {t("newPrinterclose")}
            </Button>
            <Button
              variant="contained"
              className={`mr-2 mt-2 mb-2 Btn-Color ${classes.ButtonSimilarWidth}`}
              onClick={handleWaitingConfirm}
            >
              {t("newPrinterStandby")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={() => {
          setState((prevState) => ({
            ...prevState,
            isDeleting: false,
            rowBeingEdited: null,
          }));
        }}
        open={state.isDeleting}
        classes={{
          paper: classes.deleteModal,
        }}
      >
        <DialogTitle>
          <div className="d-flex f-align-center f-justify-between">
            <Typography variant="h5">
              {t("newPrinterConfirm deletion")}
            </Typography>
            <IconButton
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isDeleting: false,
                  rowBeingEdited: null,
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
            {t("newPrinterAre you sure you want to delete it?")}
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <div className="d-flex">
            <Button
              variant="outlined"
              className={`mr-4 mt-2 mb-2 ${classes.ButtonSimilarWidth}`}
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isDeleting: false,
                  rowBeingEdited: null,
                }));
              }}
            >
              {t("newPrinterclose")}
            </Button>
            <Button
              variant="outlined"
              className={`mr-2 mt-2 mb-2 bg-danger color-white ${classes.ButtonSimilarWidth}`}
              onClick={handleDeleteConfirmation}
            >
              {t("newPrinterdelete")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewNewPrinters;
