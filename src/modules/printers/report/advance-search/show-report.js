import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Service from "../../service";
import {Typography,Button,Paper,DialogActions,DialogContent,DialogTitle, Dialog,IconButton,Divider,} from "@material-ui/core";
import { Grid } from "shared/components";
import { writeXLSFile, getToday, getTime } from "utils";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";
import "../../../../shared/Shared.css";

const defaultState = {
  entries: [],
  isFetching: false,
  email: "",
  isSendingEmail: false,
};
const ShowSaveReport = ({ deviceInfoId }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);

  const columnConfig = [
    {
      id: "typeText",
      field: "typeText",
      label: t("userPageequipment"),
    },
    {
      id: "start",
      field: "start",
      label: t("userPagestart"),
    },
    {
      id: "end",
      field: "end",
      label: t("userPageEnd"),
    },
    {
      id: "save",
      field: "save",
      label: t("userPageSave"),
    },
  ];

  const sendEmail = async () => {
    let errorList = [];
    setState((prevState) => ({ ...prevState, isFetching: true }));
    for (let reportIndex in state.entries) {
      let reportId = state.entries[reportIndex]?.reportId || null;
      let postBody = {
        reportId: reportId,
        email: state.email,
        dt1: "",
      };
      const { data, error } = await Service.SendReport(postBody);
      if (error) {
        errorList.push(error);
      } else {
        //do Notthing
      }
    }
    if (errorList.length) {
      toast.error(errorList[0]);
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
    }
    else{
      setState((prevState) => ({
        ...prevState,
        isSendingEmail: false,
        isFetching: false,
      }));
      toast.success(t('popupSent'));
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const exportToExcel = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      deviceInfoId,
      dt1: "",
    };

    const { data, error } = await Service.GetSaveReport(payload);

    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
      let dataToBeWrite = data;
      dataToBeWrite = dataToBeWrite.map((row) => {
        let updatedRow = { ...row };
        Object.keys(updatedRow).map((key) => {
          if (typeof updatedRow[key] === "object") {
            updatedRow[key] =
              updatedRow[key]?.label ||
              updatedRow[key]?.name ||
              updatedRow[key]?.friendlyName ||
              updatedRow[key];

            if (Array.isArray(updatedRow[key])) {
              updatedRow[key] = updatedRow[key].join(",") || updatedRow[key];
            }
          }
          if (typeof updatedRow[key] === "boolean") {
            updatedRow[key] = updatedRow[key] ? "Y" : "N";
          }
          if (key == "rowIndexId") {
            delete updatedRow[key];
          }
        });
        return updatedRow;
      });
      let today = getToday();
      let time = getTime();
      const sheetName = 'report' + '_' + today + '_' + time;
      writeXLSFile("reportTable1", sheetName);
    }
  };

  const GetSaveReport = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      deviceInfoId,
      dt1: "",
    };
    const { data, error } = await Service.GetSaveReport(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  useEffect(() => {
    GetSaveReport();
  }, [deviceInfoId]);

  console.log(state);
  return (
    <>
      <div className="d-flex f-justify-end">
        <Button
          variant="contained"
          onClick={() => exportToExcel()}
          className="mb-4 mr-4 Btn-Color"
        >
          {t("userPageexport")}
        </Button>
        <div className="d-flex">
          <TextField
            fullWidth
            name="email"
            variant="outlined"
            size="small"
            className="mb-4 mr-4"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="contained"
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              isSendingEmail: true,
            }))
          }
          className="mb-4 Btn-Color"
        >
          {t("userPageSend report mail")}
        </Button>
      </div>

      <Paper
        elevation={4}
        className="mb-6"
        classes={{
          root: classes.reportGrid,
        }}
      >
        <Grid
          tableId="reportTable1"
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          hidePagination
          hasSelection={false}
        />
      </Paper>
      <Dialog
        onClose={() => {
          setState((prevState) => ({
            ...prevState,
            isSendingEmail: false,
          }));
        }}
        open={state.isSendingEmail}
        classes={{
          paper: classes.deleteModal,
        }}
      >
        <DialogTitle>
          <div className="d-flex f-align-center f-justify-between">
            <Typography variant="h5">확인</Typography>
            <IconButton
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isSendingEmail: false,
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
            '이메일을 보내시겠습니까?'
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <div className="d-flex">
            <Button
              variant="outlined"
              className="mr-4 mt-2 mb-2"
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isSendingEmail: false,
                }));
              }}
            >
              {t("summaryclose")}
            </Button>
            <Button
              variant="contained"
              className="mr-2 mt-2 mb-2 Btn-Color"
              onClick={sendEmail}
            >
              {t("settingSave")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ShowSaveReport;
