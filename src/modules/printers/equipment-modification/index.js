import { useEffect, useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { formatDate, getDateObject } from "utils";
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, Datepicker } from "shared/components";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";
import { useTranslation } from 'react-i18next';
import Avatar from "@material-ui/core/Avatar";
import Term from "./term";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from 'config';
import "../../../shared/Shared.css";

let timeout = null;
const defaultState = {
  isDeleting: false,
  isAdding: false,
  companyName: "",
  equipmentLocation: "",
  printerInformation: "",
  displayName: "",
  deviceSerial: "",
  contractDescription: "",
  contractEndDate: "",
  contractStartDate: "",
  endCustomerId: '',
  isBookmark: '',
  lastUpdateDt: '',
  restData: {},
  isFetching: false,
  startDate: '',
  endDate: '',
  selectedFile: null,
  profileImage: "",
  showTerm: false,
  isContractAdd: 0,
  contractEndDateActual: '',
  companyList: [],
  isCompanyFetching: false,
};
const UsagePage = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [state, setState] = useState({
    ...defaultState,
  });
  const [optionCompanyList, setOptionCompanyList] = useState([]);

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
      deviceInfoId: match.params.deviceId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      const {
        endCustomerName,
        location,
        productName,
        displayName,
        deviceSerial,
        contractEndDate,
        contractStartDate,
        endCustomerId,
        isBookmark,
        lastUpdateDt,
        contractDescription,
        printerProfileImage
      } = data || {};
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        companyName: endCustomerName,
        equipmentLocation: location,
        printerInformation: productName,
        endCustomerId: endCustomerId,
        displayName: displayName,
        deviceSerial: deviceSerial,
        contractDescription,
        contractEndDate,
        contractStartDate,
        isBookmark,
        lastUpdateDt,
        startDate: contractStartDate ? formatDate(new Date(contractStartDate)) : '',
        endDate: contractEndDate ? formatDate(new Date(contractEndDate)) : '',
        profileImage: `${config.frontendUrl}/${printerProfileImage}`,
        contractEndDateActual: contractEndDate,
        lastProfileImage: printerProfileImage
      }));
      GetEndCustomerSearchList(endCustomerName);
    }
  };

  const handleSubmit = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true, companyName: state.newCompany }));
    const { data, error } = await Service.AddCustomer({
      customerName: state.newCompany,
      dt1: "",
    });
    if (error) {
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
      handleModalClose();
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('type', 'printer');
    formData.append('deviceInfoId', match.params.deviceId);
    formData.append("file", file);
    const { data } = await Service.uploadAvtar(formData);
    return data;
  };

  const handleSave = async () => {
    let imageUrl = state.lastProfileImage;
    setState((prevState) => ({ ...prevState, isFetching: true }));
    if (state.selectedFile) {
      const response = await handleUpload(state.selectedFile);
      if (response.error) {
        setState((prevState) => ({ ...prevState, isFetching: false }));
        return toast.error(t('popupSomethingWrong'));
      }
      imageUrl = response?.filePath;
    }

    const { data, error } = await Service.UpdateDeviceForWeb({
      deviceInfoId: match.params.deviceId,
      deviceSerial: state.deviceSerial,
      displayName: state.displayName,
      dt1: "",
      endCustomerId: state.endCustomerId,
      endCustomerName: state.companyName,
      location: state.equipmentLocation,
      contractEndDate: state.endDate,
      contractStartDate: state.startDate,
      contractDescription: state.contractDescription,
      isContractAdd: state.isContractAdd,
      printerProfileImage: imageUrl
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
      history.goBack();
    }
  };

  const handleModalClose = () => {
    setState((prevState) => ({
      ...prevState,
      isAdding: defaultState.isAdding,
      newCompany: '',
    }));
  };

  const handleFileSelection = async (event) => {
    let selectedFile = null;
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      selectedFile = event.currentTarget.files[0];
      event.target.value = "";
    }
    let profileImage = URL.createObjectURL(selectedFile);
    setState((prevState) => ({
      ...prevState,
      selectedFile,
      profileImage,
    }));
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
        <Typography variant="h4">{t('summaryEquipment modification')}</Typography>
      </div>
      <div className={clsx("d-flex f-align-center p-2 f-justify-end", classes.divider)}>
        <IconButton
          onClick={() =>
            setState((prevState) => ({ ...prevState, isAdding: true }))
          }
        >
          <AddCircleIcon className={`${classes.colorLink} Add-Btn`} />
        </IconButton>
        <Typography variant="body1">{t('summaryAdd')}</Typography>
      </div>
      <Paper elevation={4}>
        <div className="ml-8 mr-8">
          <div className="d-flex flex-column p-4 f-align-center">
            <div className="d-flex f-justify-center">
              <Avatar
                id="printers-image"
                className={classes.avtarImage}
                src={state.profileImage}
              />
            </div>
            <Button
              component="label"
              htmlFor="printers-input-field"
              variant="text"
              className="bold-font mt-1 Logout-Color"
            >
              {t("Edit")}
            </Button>
            <input
              id="printers-input-field"
              type="file"
              onChange={handleFileSelection}
              accept="image/x-png,image/gif,image/jpeg"
              className="d-none"
            />
          </div>
          <Autocomplete
            freeSolo
            disableClearable
            value={state.companyName}
            classes={{
              listbox: classes.companySearch
            }}
            options={[{ endCustomerName: `${state.companyName} (으)로 검색합니다.` }, ...state.companyList].map(item => item.endCustomerName)}
            getOptionDisabled={(option) => (option || '').includes('(으)로 검색합니다.')}
            loading={state.isCompanyFetching}
            renderOption={(option) => (
              <>
                {(option || '').includes('(으)로 검색합니다.')
                  ? (<><div className='pb-4'>{option}</div></>)
                  : option
                }
              </>
            )}
            onChange={(evt, companyName) => {
              setState(prevState => ({
                ...prevState,
                companyName,
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
            size='small'
            label={t('summaryEquipment location')}
            name="equipmentLocation"
            variant="outlined"
            value={state.equipmentLocation}
            className="mb-8"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size='small'
            label={t('summaryPrinter information')}
            name="printerInformation"
            variant="outlined"
            value={state.printerInformation}
            className="mb-8"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size='small'
            label={t('IpAddress')}
            name="IPAddress"
            variant="outlined"
            defaultValue='192.10.10.10'
            className="mb-8"
          />
          <TextField
            fullWidth
            size='small'
            label={t('processHostName')}
            name="IPAddress"
            variant="outlined"
            value="Admin"
            className="mb-8"
          />
          <div className='pb-4'>
            <Typography variant='body1' className='text-bold'>{t('summaryPrinterContract')}</Typography>
          </div>
          <div className='d-flex f-align-center w-100 f-justify-between'>
            <Datepicker
              showYearDropdown
              size='small'
              label={t('summaryFrom')}
              selected={
                typeof state.contractStartDate === "string"
                  ? getDateObject(state.contractStartDate)
                  : state.contractStartDate
              }
              className={`mb-8`}
              classes={{
                mainWrapper: 'w-50 mr-4'
              }}
              onChange={(date) => {
                setState((prevState) => ({
                  ...prevState,
                  contractStartDate: date,
                  startDate: formatDate(date)
                }));
              }}
            />
            <Datepicker
              showYearDropdown
              size='small'
              label={t('summaryTo')}
              selected={
                typeof state.contractEndDate === "string"
                  ? getDateObject(state.contractEndDate)
                  : state.contractEndDate
              }
              className={`mb-8`}
              classes={{
                mainWrapper: 'w-50 ml-4'
              }}
              onChange={(date) => {
                setState((prevState) => ({
                  ...prevState,
                  contractEndDate: date,
                  endDate: formatDate(date)
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
              </Button>``
            </div>
          </div>
          <TextField
            fullWidth
            size='small'
            label={t('contractFomrMemo')}
            name="contractDescription"
            variant="outlined"
            value={state.contractDescription}
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
            style={{ height: '36px' }}
          >
            {t('summarycancel')}
          </Button>
          <Button
            variant="contained"
            className={`mb-8 Btn-Color ${classes.ButtonSimilarWidth}`}
            onClick={handleSave}
          >
            {t('summarySave')}
          </Button>
        </div>
      </Paper>
      {state.isAdding && (
        <Dialog
          onClose={handleModalClose}
          open={state.isAdding}
          classes={{
            paper: classes.waitingModal,
          }}
        >
          <DialogTitle >
            <div className="d-flex f-align-center f-justify-between">
              <Typography variant="h5">{t('summaryAdd company')}</Typography>
              <IconButton onClick={handleModalClose}>
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
                onClick={handleModalClose}
              >
                {t('summaryclose')}
              </Button>
              <Button
                variant="contained"
                className={`mr-2 mt-2 mb-2 Btn-Color ${classes.ButtonSimilarWidth}`}
                onClick={handleSubmit}
              >
                {t('summarySave')}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
      <Term
        open={state.showTerm}
        deviceInfoId={match.params.deviceId}
        onClose={() => setState(prevState => ({ ...prevState, showTerm: false }))}
      />
    </>
  );
};


export default UsagePage;
