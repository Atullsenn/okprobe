import { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ERROR_MESSAGES } from "shared/constants";
import { setToken } from "utils";
import Service from "../service";
import isEmail from "validator/es/lib/isEmail";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import OrgImg from "assets/images/org-logo.png";
import KakaoImg from "assets/images/kakao-cta.png";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Dialog } from "@material-ui/core";
import useStyles from "./style";
import $ from 'jquery';
import { Grid } from "shared/components";
import {useTranslation} from 'react-i18next';
import { AppContext } from 'shared/contexts';
import "../../../shared/Shared.css";

const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 100,
  isFetching: false,
  customerName: "",
  isDeleting: false,
};




const ViewCustomers = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();
  const { lang } = useContext(AppContext);
  const left="left";
  const right="right";
  const center="center";
  
  const fetchEntries = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.GetEndCustomerDeviceList({
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      dt1: "",
      endCustomerId: match.params.id,
    });

    if (error) {
      //alert(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
        customerName: data[0].endCustomerName,
      }));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [match.params.id]);

  const columnConfig = [
    {
      id: "displayName",
      fieldName: "displayName",
      label: t('customerrCustomer Name'),
      render: (row) => (
        <Typography
          variant="body1"
          className={clsx("text-bold c-pointer Text-Color")}
          onClick={() => {
            history.push(
              `/printers/${row.endCustomerId}/device/${row?.deviceInfoId}/last-updated-at/${row?.lastUpdateDt}`
            );
          }}
          style={{ textAlign: left}}
          >
          {row.displayName}
        </Typography>
      ),
      canSort: true,
    },
    {
      id: "deviceSerial",
      field: "deviceSerial",
      label: t('summarySerial Number'),
      canSort: true,
    },
    {
      id: "location",
      field: "location",
      label: t('summaryEquipment location'),
      canSort: true,
    },
  ];

  const handleSave = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.EditEndCustomerName({
      dt1: "",
      endCustomerId: match.params.id,
      endCustomerName: state.customerName,
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      toast.success(t('popupSaved'));
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
    }
  };

  const handleDeleteConfirmation = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.DeleteCustomer({
      dt1: "",
      endCustomerId: match.params.id,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
      setState(defaultState);
      history.goBack();
    }
  };


  setTimeout(() => {
     $(".MuiTypography-root").css("white-space","nowrap");
     
  }, 100);





  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t('customerCustomer modification')}</Typography>
      </div>
      <div className="d-flex f-align-center">
        <Typography variant="h5">{t('customerrCustomer Name')}:</Typography>
        <TextField 
          name="customerName"
          variant="outlined"
          className="mt-8 mb-8 w-50 ml-2 "
          value={state.customerName}
          onChange={(evt) => {
            const { name, value } = evt.target;
            setState((prevState) => ({
              ...prevState,
              [name]: value,
            }));
          }}
        />
      
      </div>
      <Paper elevation={4}>
        <Grid
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          hidePagination
          hasSelection={false}
          classes={{
            root: classes.MuiTableCellroot,
          }}
        />
      </Paper>
      <div className="d-flex f-justify-end mt-4">
        <Button
          className={`bg-danger color-white ${classes.ButtonSimilarWidth}`}
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              isDeleting: true,
            }));
          }}
        >
          {t('summarydelete')}
        </Button>
        <Button
          variant="contained"
          className={`ml-4 Btn-Color ${classes.ButtonSimilarWidth}`}
          onClick={() => {
            handleSave();
          }}
        >
          {t('summarySave')}
        </Button>
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
              <Typography variant="h5">{t('summaryConfirm deletion')}</Typography>
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
              {t('summaryAre you sure you want to delete it')}?
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
                    isDeleting: false,
                  }));
                }}
              >
                {t('summaryclose')}
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="mr-2 mt-2 mb-2 bg-danger color-white"
                onClick={handleDeleteConfirmation}
              >
                {t('summarydelete')}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ViewCustomers;
