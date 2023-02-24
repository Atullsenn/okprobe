import { useEffect, useState } from 'react';
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
import { useTranslation } from "react-i18next";
import $ from 'jquery';
import { Grid } from 'shared/components';

const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 100,
  isFetching: false,
};

const ViewNotice = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState(defaultState);

  const fetchEntries = async () => {
    setState(prevState => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.post({
      page: state.pageNumber,
      onePageDataCount: state.pageSize
    });

    setTimeout(() => 
    {
    //  alert("p")
   
    $(".MuiTableContainer-root").css("min-height",'500px')
  
    }, 200);




    if (error) {
      //alert(error);
      setState(prevState => ({ ...prevState, isFetching: false }));
    } else {
      setState(prevState => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
        totalEntries: data[0] && data[0]?.rowCount || defaultState.totalEntries
      }));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [
    state.pageNumber,
    state.pageSize
  ]);

  const columnConfig = [
    {
      id: 'writeName',
      field: 'writeName',
      label: t('noticeWriter'),
      // canSort: true
    },
    {
      id: 'message',
      field: 'message',
      label: t('noticeContents'),
      // canSort: true
    },
    {
      id: 'createDt',
      field: 'createDt',
      label: t('noticeRegistered date'),
      // canSort: true
    },
  ];

  const  handlePageSizeChange = evt => {
    setState(prevState => ({
      ...prevState,
      pageSize: evt,
      pageNumber: defaultState.pageNumber
    }));
  };
  
  const  handlePageNumberChange = evt => {
    setState(prevState => ({
      ...prevState,
      pageNumber: evt,
    }));
  };

  return (
    <>
      <div className='d-flex f-align-center f-justify-between mb-8'>
      

        <Typography variant='h4'>
          {t('noticeNotice')}
        </Typography>
      </div>
      <Paper elevation={4} className={clsx('d-flex f-justify-between',classes.hodeee)}>
        {/* <div className={clsx('d-flex f-align-center p-2', classes.divider)}>
          <IconButton
            onClick={() => setState(prevState => ({ ...prevState, isFormOpen: true, }))}
          >
            <AddCircleIcon className={classes.colorLink} />
          </IconButton>
        </div> */}
        <Grid 
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          pageSize={state.pageSize}
          pageNumber={state.pageNumber}
          totalRows={state.totalEntries}
          onPageSizeChange={handlePageSizeChange}
          onPageNumberChange={handlePageNumberChange}
          hasSelection={false}
        />
      </Paper>
    </>
  );
};

export default ViewNotice;