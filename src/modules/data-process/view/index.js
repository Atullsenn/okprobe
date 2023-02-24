import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { ERROR_MESSAGES } from "shared/constants";
import { setToken } from "utils";
import Service from "../service";
import isEmail from "validator/es/lib/isEmail";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import OrgImg from "assets/images/org-logo.png";
import KakaoImg from "assets/images/kakao-cta.png";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import useStyles from "./style";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import $ from 'jquery';
import { Grid } from "shared/components";
import { useTranslation } from "react-i18next";

let timeout = null;

const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 10,
  search: "",
  isFetching: false,
  orderBy: "insert_dt",
  order: "D",
};




const left="left";
const right="right";
const center="center";



const ViewDataProcess = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState(defaultState);

  const fetchEntries = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.post({
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      searchKeyword: state.search,
      sortField: state.orderBy,
      sortOrder: state.order,
    });

    if (error) {
      //alert(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data?.MailLog || defaultState.entries,
        totalEntries: data?.TotalPage || defaultState.totalEntries,
      }));
    }
  };



  useEffect(() => {
    fetchEntries();
  }, [
    state.pageSize,
    state.pageNumber,
    state.search,
    state.order,
    state.orderBy,
  ]);

  const columnConfig = [
    {
      id: "insert_dt",
      fieldName: "insert_dt",
      label: t('processDate'),
      canSort: true,
      render: row => (
        <Typography variant='body1'
        style={{ textAlign: center}}
        >
          {row.insertDt}
        </Typography>
      ),
    },
    {
      id: "type_id",
      fieldName: "type_id",
      label: t('processType'),
      canSort: true,
      render: row => (
        <Typography variant='body1'
        style={{ textAlign: center}}>
          {row.systemProcessTypeId}
        </Typography>
      ),
    },
    {
      id: "message",
      field: "message",
      label: t('processMessage'),
      canSort: true,
    },
    {
      id: "end_customer_name",
      fieldName: "end_customer_name",
      label: t('processCustomer name'),
      canSort: true,
      render: row => (
        <Typography variant='body1'>
          {row.endCustomerName}
        </Typography>
      ),
    },
    {
      id: "display_name",
      fieldName: "display_name",
      label: t('processPrinter name'),
      canSort: true,
      render: row => (
        <Typography variant='body1'>
          {row.displayName}
        </Typography>
      ),
    },
  ];

  const handlePageSizeChange = (evt) => {
    setState((prevState) => ({
      ...prevState,
      pageSize: evt,
      pageNumber: defaultState.pageNumber,
    }));
  };

  const handlePageNumberChange = (evt) => {
    setState((prevState) => ({
      ...prevState,
      pageNumber: evt,
    }));
  };

  const handleSortChange = useCallback((fieldObj, order) => {
    setState((prevState) => ({
      ...prevState,
      order: order,
      orderBy: fieldObj.field || fieldObj.fieldName,
    }));
  }, []);

  const handleSeacrh = (search) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        search,
        pageNumber: defaultState.pageNumber,
      }));
    }, 1000);
  };

  setTimeout(() => 
  {
 // alert("p")
 
  $(".MuiTableContainer-root").css("min-height",'100px')

  }, 200);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">{t('processData/Email process history')}</Typography>
      </div>
      <Paper elevation={4}>
        <div className="d-flex p-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder={t('processSearch')}
            InputProps={{ endAdornment: <SearchIcon /> }}
            onChange={(evt) => handleSeacrh(evt.currentTarget.value)}
          />
        </div>
        <Divider />
        <Grid

          rows={state.entries}
          columns={columnConfig}
          pageSize={state.pageSize}
          pageNumber={state.pageNumber}
          totalRows={state.totalEntries}
          hasSelection={false}
          isLoading={state.isFetching}
          onPageSizeChange={handlePageSizeChange}
          onPageNumberChange={handlePageNumberChange}
          onSortChange={handleSortChange}
          order={state.order}
          orderBy={state.orderBy}
        />
      </Paper>
    </>
  );
};

export default ViewDataProcess;
