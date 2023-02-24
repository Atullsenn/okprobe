import { useEffect, useState,useCallback } from 'react';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import { ERROR_MESSAGES } from 'shared/constants';
import { setToken } from 'utils';
import Service from '../service';
import isEmail from 'validator/es/lib/isEmail';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import OrgImg from 'assets/images/org-logo.png';
import KakaoImg from 'assets/images/kakao-cta.png';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './style';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid } from 'shared/components';
import $ from 'jquery';
import { useTranslation } from 'react-i18next'
import "../../../shared/Shared.css";

const defaultState = {
  entries: [],
  totalEntries: 20,
  pageNumber: 1,
  pageSize: 100,
  isFetching: false,
  orderBy: null,
  order: null,
};



function getAlign(x)
{
  const typ=typeof x;
  if(typ=="string")
  {
    return "center";
  }
  else
  {
    return "left";
  }
  
 
}



const ViewCustomers = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();

  const getRowCount = async (totalPage) => {
    const { data } = await Service.post({
      page: totalPage,
      onePageDataCount: state.pageSize,
      sortField: state.orderBy,
      sortOrder: state.order
    });

    setState(prevState => ({
      ...prevState,
      totalEntries: (((totalPage - 1) * state.pageSize) + data?.EndCustomer?.length) || defaultState.totalEntries,
    }));
  };

  const fetchEntries = async () => {
    setState(prevState => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.post({
      page: state.pageNumber,
      onePageDataCount: state.pageSize,
      sortField: state.orderBy,
      sortOrder: state.order,
      partnerId: match.params.endCustomerId
    });


    if (error) {
      //alert(error);
      setState(prevState => ({ ...prevState, isFetching: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        isFetching: false,
        entries: data?.EndCustomer || defaultState.entries,
      }));
      getRowCount(data.TotalPage);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [state.orderBy,state.order,state.pageNumber,state.pageSize, match.params.endCustomerId]);

  const columnConfig = [
    {
      id: 'company_name',
      fieldName: 'company_name',
      label: t('customerrCustomer Name'),
      render: row => (
        <Typography variant='body1' className={clsx('text-bold c-pointer Text-Color', classes.colorLink)}
        onClick={() => {
          history.push(`/customers/${row.endCustomerId}`);
        }}
        style={{ textAlign: getAlign(row.endCustomerName)}}
        >
          {row.endCustomerName}
        </Typography>
      ),
      canSort: true
    },
    {
      id: 'device_count',
      fieldName: 'device_count',
      label: t('customerrDevice count'),
      canSort: true,
      render: (row) => (
        <Typography variant="body1" className={("align-right")}>
          {row.deviceCount ? new Intl.NumberFormat('en-US').format(row.deviceCount) : ''}
        </Typography>
      ),
    },
  ];

  const handleSortChange = useCallback((fieldObj, order) => {
    setState((prevState) => ({
      ...prevState,
      order: order,
      orderBy: fieldObj.field || fieldObj.fieldName,
    }));
  }, []);

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
  setTimeout(() => {
    $(".MuiTableContainer-root").css("min-height",'535px')
    $(".MuiTable-root").css("width",'500px')
    $(".MuiTypography-root").css("white-space","nowrap");
     
  }, 100);
  return (
    <>
      <div className='d-flex f-align-center f-justify-between mb-8 customer_table'>
        <Typography variant='h4'>
        {t('customerrNo of device per customer')}
        </Typography>
      </div>
      <Paper elevation={4}>
        {/* <div className={clsx('d-flex f-align-center p-2', classes.divider)}>
          <IconButton
            onClick={() => setState(prevState => ({ ...prevState, isFormOpen: true, }))}
          >
            <AddCircleIcon className={classes.colorLink} />
          </IconButton>
        </div> */}
        
        <Grid className={clsx('d-flex f-justify-between',classes.hideon_mobiletop)}
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          hasSelection={false}
          pageSize={state.pageSize}
          pageNumber={state.pageNumber}
          totalRows={state.totalEntries}
          onSortChange={handleSortChange}
          order={state.order}
          orderBy={state.orderBy}
          onPageSizeChange={handlePageSizeChange}
          onPageNumberChange={handlePageNumberChange}
        />
      </Paper>
    </>
  );
};




export default ViewCustomers;