import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import useStyles from "./style";
import { Grid } from "shared/components";
import { useTranslation } from "react-i18next";

const defaultState = {
  endCustomerSearchList: [],
  deviceSearchList: [],
  isFetching: false,
};
const UsagePage = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState({
    ...defaultState,
  });
  const GetDeviceSearchList = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.GetDeviceSearchList({
      dt1: "",
      onePageDataCount: "10",
      page: "1",
      searchKeyword: match.params.searchValue,
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        deviceSearchList: data || defaultState.deviceSearchList,
      }));
    }
  };
  const GetEndCustomerSearchList = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.GetEndCustomerSearchList({
      dt1: "",
      onePageDataCount: "10",
      page: "1",
      searchKeyword: match.params.searchValue,
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        endCustomerSearchList: data || defaultState.endCustomerSearchList,
      }));
    }
  };
  useEffect(() => {
    GetEndCustomerSearchList();
    GetDeviceSearchList();
  }, [match.params.searchValue]);

  const columnConfig1 = [
    {
      id: "endCustomerName",
      field: "endCustomerName",
      label: t('searchCompany'),
      canSort: true,
      render:(row)=>{
        return(
          <Typography
          variant="body2"
          className="color-text-link c-pointer text-bold"
          onClick={()=>{
           history.push(`/customers/endCustomerId/${row.endCustomerId}`)
          }}> 
            {row.endCustomerName}
          </Typography>
        )
      }
    },
  ];

  const columnConfig2 = [
    {
      id: "endCustomerName",
      field: "endCustomerName",
      label: t('processCustomer name'),
      canSort: true,
    },
    {
      id: "displayName",
      field: "displayName",
      label: t('processDisplay name'),
      canSort: true,
      render: (row) => {
        return (
          <Typography
            variant="body2"
            className="color-text-link c-pointer text-bold"
            onClick={() => {
              history.push(
                `/printers/${row.endCustomerId}/device/${row?.deviceInfoId}/last-updated-at/${row?.lastUpdateDt}`
              );
            }}
          >
            {row.displayName}
          </Typography>
        );
      },
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
      label: t('dashboardLocation'),
      canSort: true,
    },
  ];

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">
          {`${t('processSearch')} : ${match.params.searchValue}`}
        </Typography>
      </div>
      <Paper
        elevation={4}
        className="mb-6 mt-10"
        classes={{
          root: classes.paper,
        }}
      >
        <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
          <Typography variant="h5" className="mt-4">
          {t('searchCompany')}
          </Typography>
        </div>
        <Divider />
        <Grid
          rows={state.endCustomerSearchList}
          columns={columnConfig1}
          isLoading={state.isFetching}
          hidePagination
          hasSelection={false}
        />
      </Paper>
      <Paper
        elevation={4}
        className="mb-6 mt-10"
        classes={{
          root: classes.paper2,
        }}
      >
        <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
          <Typography variant="h5" className="mt-4">
            {t('sidebarPrinters')}
          </Typography>
        </div>
        <Divider />
        <Grid
          rows={state.deviceSearchList}
          columns={columnConfig2}
          isLoading={state.isFetching}
          hidePagination
          hasSelection={false}
        />
      </Paper>
    </>
  );
};
export default UsagePage;
