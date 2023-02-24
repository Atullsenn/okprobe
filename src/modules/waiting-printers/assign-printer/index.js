import { useEffect, useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Service from "../service";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./style";
import { Dialog } from "@material-ui/core";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { getTokenData } from "utils";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../../../shared/Shared.css";

let timeout = null;
const defaultState = {
  companyName: "",
  equipmentLocation: "",
  printerInformation: "",
  displayName: "",
  deviceSerial: "",
  endCustomerId: "",
  isFormOpen: false,
  name: "",
  companyList: [],
  isCompanyFetching: false,
};
const noop = () => { };
const AssignPrinters = ({ match, getWaitDeviceCount = noop }) => {
  const { t } = useTranslation();
  const [state, setState] = useState(defaultState);
  const [optionCompanyList, setOptionCompanyList] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
      },
    }));
  };

  const handleAddCompanyName = async () => {
    const { data, error } = await Service.AddCustomer({
      customerName: state.name,
    });
    if (error) {
      toast.error(error);
    } else {
      setState((prevState) => ({
        ...prevState,
        isFormOpen: false,
        name: "",
      }));
    }
  };

  const GetDeviceInfoForWeb = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.GetDeviceInfoForWeb({
      deviceInfoId: match.params.id,
      dt1: "",
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        companyName: data?.endCustomerName,
        equipmentLocation: data?.location,
        printerInformation: data?.productName,
        displayName: data?.displayName,
        deviceSerial: data?.deviceSerial,
        endCustomerId: data?.endCustomerId,
      }));
      GetEndCustomerSearchList(data?.endCustomerName);
    }
  };

  const GetEndCustomerSearchList = async (searchKeyword = '') => {
    setState((prevState) => ({ ...prevState, isFetching: true, isCompanyFetching: true, }));
    const { data, error } = await Service.GetEndCustomerSearchList({
      dt1: "",
      onePageDataCount: "10",
      page: "1",
      searchKeyword,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false, isCompanyFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        isCompanyFetching: false,
        companyList: data || defaultState.companyList,
      }));
    }
  };

  const handleAssignPrinter = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.AssignWaitDevice({
      deviceInfoId: match.params.id,
      deviceSerial: state.deviceSerial,
      displayName: state.displayName,
      dt1: "",
      endCustomerId: state.endCustomerId,
      endCustomerName: state.companyName,
      location: state.equipmentLocation,
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
      getWaitDeviceCount();
      history.goBack();
    }
  };

  useEffect(() => {
    GetDeviceInfoForWeb();
    GetEndCustomerSearchList();
  }, []);

  useEffect(() => {
    if (state.companyList.length === 1) {
    } else {
      setOptionCompanyList(state.companyList)
    }
  }, [state.companyList])

  const handleSearch = (search) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      GetEndCustomerSearchList(search)
    }, 1000);
  };

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">
          {t("summaryEquipment modification")}
        </Typography>
      </div>
      <Paper elevation={4}>
        <div className="ml-8 mr-8">
          <div className={clsx("d-flex f-align-center pr-2 pl-2 f-justify-end")}>
            <IconButton
              onClick={() =>
                setState((prevState) => ({ ...prevState, isFormOpen: true }))
              }
            >
              <AddCircleIcon className={`${classes.colorLink} Add-Btn`} />
            </IconButton>
            <Typography variant="body1">{t("summaryAdd")}</Typography>
          </div>
          <Autocomplete
            freeSolo
            disableClearable
            value={{ endCustomerName: state.companyName, endCustomerId: state.endCustomerId }}
            classes={{
              listbox: classes.companySearch
            }}
            options={[{ endCustomerName: `${state.companyName} (으)로 검색합니다.` }, ...state.companyList]}
            getOptionLabel={option => option.endCustomerName || ''}
            getOptionDisabled={(option) => (option?.endCustomerName || '').includes('(으)로 검색합니다.')}
            loading={state.isCompanyFetching}
            renderOption={(option) => (
              <>
                {(option?.endCustomerName || '').includes('(으)로 검색합니다.')
                  ? (<><div className='pb-4'>{option?.endCustomerName}</div></>)
                  : option?.endCustomerName
                }
              </>
            )}
            onChange={(evt, value) => {
              setState(prevState => ({
                ...prevState,
                companyName: value?.endCustomerName,
                endCustomerId: value?.endCustomerId,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("summarycompany name")}
                margin="normal"
                variant="outlined"
                onChange={(evt) => {
                  const { value } = evt.currentTarget;
                  setState(prevState => ({
                    ...prevState,
                    companyName: value,
                  }));
                  handleSearch(value);
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {state.isCompanyFetching ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <Typography variant="body1" className="mt-4">
            {state.displayName || " "}
          </Typography>
          <Typography variant="body1" className="mb-4">
            {state.deviceSerial || " "}
          </Typography>
          <TextField
            fullWidth
            label={t("summaryEquipment location")}
            name="equipmentLocation"
            variant="outlined"
            value={state.equipmentLocation}
            className="mb-8"
            //   error={state.errors.email.trim()}
            //   helperText={state.errors.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label={t("summaryPrinter information")}
            name="printerInformation"
            variant="outlined"
            value={state.printerInformation}
            className="mb-8"
            //   error={state.errors.email.trim()}
            //   helperText={state.errors.email}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex ml-8 mr-8">
          <Button
            className={`mb-8 mr-4 ${classes.ButtonSimilarWidth}`}
            variant="contained"
            onClick={() => {
              history.goBack();
            }}
          >
            {t("summarycancel")}
          </Button>
          <Button
            variant="contained"
            className={`mb-8 Btn-Color ${classes.ButtonSimilarWidth}`}
            onClick={handleAssignPrinter}
          >
            {t("summarySave")}
          </Button>
        </div>
      </Paper>
      <Dialog
        onClose={() => {
          setState((prevState) => ({
            ...prevState,
            isFormOpen: false,
          }));
        }}
        open={state.isFormOpen}
        classes={{
          paper: classes.waitingModal,
        }}
      >
        <DialogTitle>
          <div className="d-flex f-align-center f-justify-between">
            <Typography variant="h5">{t("summaryAdd company")}</Typography>
            <IconButton
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isFormOpen: false,
                  name: "",
                }));
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '0px 24px' }}>
          <Autocomplete
            freeSolo
            disableClearable
            value={state.newCompany}
            classes={{
              listbox: classes.companySearch
            }}
            options={optionCompanyList.map(item => item.endCustomerName)}
            getOptionDisabled={(option) => (option || '')}
            loading={state.isCompanyFetching}
            renderOption={(option) => (
              <>
                {(option || '') ? (<><div className='pb-4'>{option}</div></>) : option}
              </>
            )}
            onChange={(evt, newCompany) => {
              setState(prevState => ({
                ...prevState,
                newCompany,
              }));
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                type="text"
                label={t("addNewCompany")}
                name="newCompany"
                className="mb-4"
                variant="outlined"
                value={state.newCompany}
                {...params}
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {state.isCompanyFetching ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
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
                  isFormOpen: false,
                  name: "",
                }));
              }}
            >
              {t("newPrinterclose")}
            </Button>
            <Button
              variant="contained"
              className="mr-2 mt-2 mb-2 Btn-Color"
              onClick={handleAddCompanyName}
            >
              {t("summaryAdd")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignPrinters;
