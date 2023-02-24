import clsx from "clsx";
import { useEffect, useState, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Service from "../service";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { getTokenData } from "utils";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { Grid } from "shared/components";
import { Dialog } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AppContext } from "shared/contexts";
import { SharedService } from "../../../services";
import "../../../shared/Shared.css";
import $ from "jquery";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
  pageSize: 100,
  status: printerState[0].value,
  isFetching: false,
  isWaitingModalOpen: false,
  reason: "",
  rowBeingEdited: null,
  isDeleting: false,
  orderBy: null,
  order: null,
  errors: {
    reason: "",
  },
};

const ViewNewPrinters = ({ match }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);
  const { setNewPrinterCount, setWaitingPrinterCount } = useContext(AppContext);
  const userData = getTokenData();

  const fetchUnassignDeviceList = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.GetWaitDeviceList({
      status: state.status,
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      dt1: "",
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
        totalEntries:
          (data[0] && data[0]?.rowcount) || defaultState.totalEntries,
      }));
    }
  };

  const handleSortChange = (fieldObj, order) => {
    const data = [...state.entries];
    data.sort((a, b) => {
      if (a[fieldObj.field] > b[fieldObj.field]) return order === "A" ? 1 : -1;
      else return order === "A" ? -1 : 1;
    });

    setState((prevState) => ({
      ...prevState,
      entries: data,
      order: order,
      orderBy: fieldObj.field || fieldObj.fieldName,
    }));
  };
  // const handleSortChange = useCallback((fieldObj, order) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     order: order,
  //     orderBy: fieldObj.field || fieldObj.fieldName,
  //   }));
  // }, []);

  useEffect(() => {
    fetchUnassignDeviceList();
  }, [
    state.pageNumber,
    state.pageSize,
    state.status,
  ]);
  const columnConfig = [
    {
      id: "displayName",
      field: "displayName",
      label: t("printerModel"),
      canSort: true,
    },
    {
      id: "deviceSerial",
      field: "deviceSerial",
      label: t("summarySerial Number"),
      canSort: true,
    },
    {
      id: "insertDt",
      field: "insertDt",
      label: t("newPrinterRegistered date"),
      canSort: true,
      render: (row) => {
        return <div style={{ textAlign: "center" }}>{row.insertDt}</div>;
      },
    },
    {
      id: "customField1",
      field: "customField1",
      label: t("newPrinterNote"),
      canSort: true,
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
              <Tooltip title={t("newPrinterAssignment")} placement='top-start'>
                <Button
                  variant="contained"
                  className={clsx("mr-2 Btn-Color", classes.btnprinter)}
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
                  className={clsx(
                    "bg-danger color-white",
                    classes.btnprinter
                  )}
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
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.DeleteDevice({
      dt1: "",
      deviceInfoId: state.rowBeingEdited.deviceInfoId,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isDeleting: false,
        rowBeingEdited: null,
        isFetching: false,
      }));
      fetchUnassignDeviceList();
      GetUnassignDeviceCount();
      GetWaitDeviceCount();
    }
  };
  setTimeout(() => {
    //  alert("p")

    $(".MuiTableContainer-root").css("min-height", "535px");
  }, 200);
  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t("sidebarWaitingPrinters")}</Typography>
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
              className={`mr-4 mt-2 mb-2 ${classes.DeleteButtonSimilarWidth}`}
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
              className={`mr-2 mt-2 mb-2 bg-danger color-white ${classes.DeleteButtonSimilarWidth}`}
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
