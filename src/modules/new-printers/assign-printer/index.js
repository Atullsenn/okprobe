import { useEffect, useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getDateObject, getTokenData } from "utils";
import Service from "../service";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./style";
import { Datepicker } from "shared/components";
import { Dialog } from "@material-ui/core";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Term from "modules/printers/equipment-modification/term";
import "../../../shared/Shared.css";
let timeout = null;
const defaultState = {
  companyName: "",
  equipmentLocation: "",
  printerInformation: "",
  displayName: "",
  deviceSerial: "",
  memo: "",
  contractEndDate: "",
  contractStartDate: "",
  endCustomerId: "",
  restData: {},
  isFormOpen: false,
  name: "",
  companyList: [],
  isCompanyFetching: false,
  showTerm: false,
  contractEndDateActual: '',
  isContractAdd: 0,
};

const noop = () => { };

const AssignPrinters = ({ match, getUnassignDeviceCount = noop }) => {
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

  const GetDeviceInfoForWeb = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.GetDeviceInfoForWeb({
      deviceInfoId: match.params.id,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      const today = moment().format("YYYY-MM-DD");
      const afterThreeYears = moment().add(3, 'y').format("YYYY-MM-DD");
      const {
        endCustomerName,
        location,
        productName,
        displayName,
        deviceSerial,
        contractEndDate,
        contractStartDate,
        endCustomerId,
        contractDescription,
        ...remainingData
      } = data || {};
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        companyName: endCustomerName,
        equipmentLocation: location,
        printerInformation: productName,
        displayName: displayName,
        deviceSerial: deviceSerial,
        contractEndDate: contractEndDate || afterThreeYears,
        contractStartDate: contractStartDate || today,
        endCustomerId: endCustomerId,
        restData: remainingData,
        memo: contractDescription,
        contractEndDateActual: contractEndDate
      }));
      GetEndCustomerSearchList(endCustomerName);
    }
  };

  const GetEndCustomerSearchList = async (searchKeyword = '') => {
    setState((prevState) => ({ ...prevState, isFetching: true, isCompanyFetching: true }));
    const { data, error } = await Service.GetEndCustomerSearchList({
      dt1: "",
      onePageDataCount: "10",
      page: "1",
      searchKeyword,
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false, isCompanyFetching: false, }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        isCompanyFetching: false,
        companyList: data || defaultState.companyList,
      }));
    }
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

  const handleAssignPrinter = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const { data, error } = await Service.UpdateDeviceForWeb({
      deviceInfoId: match.params.id,
      deviceSerial: state.deviceSerial,
      displayName: state.displayName,
      dt1: "",
      endCustomerId: state.endCustomerId,
      endCustomerName: state.companyName,
      location: state.equipmentLocation || "",
      contractEndDate: state.contractEndDate,
      contractStartDate: state.contractStartDate,
      isContractAdd: state.isContractAdd,
      contractDescription: state.memo
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
      getUnassignDeviceCount();
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
          <div className={clsx("d-flex f-align-center pl-2 pr-2 f-justify-end")}>
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
            {state.displayName || "display name"}
          </Typography>
          <Typography variant="body1" className="mb-4">
            {state.deviceSerial || "serial numb"}
          </Typography>
          <TextField
            fullWidth
            label={t("summaryEquipment location")}
            name="equipmentLocation"
            variant="outlined"
            value={state.equipmentLocation}
            className="mb-8"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label={t("summaryPrinter information")}
            name="printerInformation"
            variant="outlined"
            value={state.printerInformation}
            className="mb-8"
            onChange={handleChange}
          />
          <div className='pb-4'>
            <Typography variant='body1' className='text-bold'>{t('summaryPrinterContract')}</Typography>
          </div>
          <div className='d-flex f-align-center w-100 f-justify-between'>
            <Datepicker
              showYearDropdown
              size='small'
              label={t("summaryStart of contract")}
              selected={
                typeof state.contractStartDate === "string"
                  ? getDateObject(state.contractStartDate)
                  : state.contractStartDate
              }
              className="mb-8"
              classes={{
                mainWrapper: 'w-50 mr-4'
              }}
              onChange={(date) => {
                setState((prevState) => ({
                  ...prevState,
                  contractStartDate: date,
                }));
              }}
            />
            <Datepicker
              showYearDropdown
              size='small'
              label={t("summaryContract termination")}
              selected={
                typeof state.contractEndDate === "string"
                  ? getDateObject(state.contractEndDate)
                  : state.contractEndDate
              }
              className="mb-8"
              classes={{
                mainWrapper: 'w-50 ml-4'
              }}
              onChange={(date) => {
                setState((prevState) => ({
                  ...prevState,
                  contractEndDate: date,
                }));
              }}
            />
            <div className={clsx("d-flex f-align-center mb-8 c-pointer ml-2")}>
              {new Date() > new Date(state.contractEndDateActual) && (
                <Button
                  variant="text"
                  className={classes.colorLink}
                  style={{ wordBreak: 'keep-all' }}
                  startIcon={<AddCircleSharpIcon className={classes.colorLink} />}
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      contractStartDate: '',
                      startDate: '',
                      contractEndDate: '',
                      endDate: '',
                      isContractAdd: 1,
                      contractDescription: '',
                      memo: ''
                    }))
                  }
                >
                  {t('usersAdd')}
                </Button>
              )}
              <Button
                style={{ wordBreak: 'keep-all' }}
                variant="text"
                className={`${classes.colorLink} Text-Color`}
                startIcon={<FormatListBulletedIcon className={`${classes.colorLink} Text-Color`} />}
                onClick={() =>
                  setState((prevState) => ({ ...prevState, showTerm: true }))
                }
              >
                {t('breakDown')}
              </Button>
            </div>
          </div>
          <TextField
            fullWidth
            size='small'
            label={t("contractFomrMemo")}
            name="memo"
            variant="outlined"
            value={state.memo}
            className="mb-8"
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
          paper: classes.deleteModal,
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
                label={t("Add New company")}
                name="name"
                variant="outlined"
                value={state.name}
                className="mb-8"
                onChange={handleChange}
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
              className={`mr-4 mt-2 mb-2 ${classes.ButtonSimilarWidth}`}
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
              className={`mr-2 mt-2 mb-2 Btn-Color ${classes.ButtonSimilarWidth}`}
              onClick={handleAddCompanyName}
            >
              {t("summaryAdd")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Term
        open={state.showTerm}
        deviceInfoId={match.params.id}
        onClose={() => setState(prevState => ({ ...prevState, showTerm: false }))}
      />
    </>
  );
};

export default AssignPrinters;
