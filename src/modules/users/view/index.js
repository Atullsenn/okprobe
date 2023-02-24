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
import { Grid } from 'shared/components';
import Form from '../form';
import { useTranslation } from 'react-i18next';
import "../../../shared/Shared.css";

const defaultState = {
  entries: [],
  totalEntries: 0,
  pageNumber: 1,
  pageSize: 100,
  totalEntries: 0,
  isFetching: false,
  isFormOpen: false,
  rowBeingEdited: null,
};

const ViewUsers = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);

  const fetchEntries = async () => {
    setState(prevState => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.post({
      page: state.pageNumber,
      onePageDataCount: state.pageSize
    });


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

  const statusText =(value) =>{
    let statusText = '';
    if (value == '0') {
        statusText = '활성';
    } else if (value == '1') {
        statusText = '휴면';
    } else if (value == '2') {
        statusText = '삭제';
    } else if (value == '3') {
        statusText = '신규';
    } else if (value == '4') {
        statusText = '승인요청';
    }
    return statusText;
}

  useEffect(() => {
    fetchEntries();
  }, [
    state.pageNumber,
    state.pageSize,
  ]);

  const columnConfig = [
    {
      id: 'email',
      fieldName: 'email',
      label: t('usersemail'),
      render: row => (
        <Typography
          variant='body1' className={clsx('text-bold c-pointer Text-Color', classes.colorLink)}
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              isFormOpen: true,
              rowBeingEdited: row,
            }))
          }}
        >
          {row.email}
        </Typography>
      ),
      // canSort: true
    },
    {
      id: 'name',
      field: 'name',
      label: t('usersName'),
      // canSort: true
    },
    {
      id: 'createDt',
      field: 'createDt',
      label: t('usersJoin date'),
      // canSort: true
    },
    {
      id: 'status',
      field: 'status',
      label: t('usersStatus'),
      render:(row)=>(
        <Typography variant='body2'>
          {statusText(row.status)}
        </Typography>
      )
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
         {t('sidebargUsers')}
        </Typography>
      </div>
      <Paper elevation={4}>
        <div className={clsx('d-flex f-align-center p-2 f-justify-end', classes.divider)}>
          <IconButton
            onClick={() => setState(prevState => ({ ...prevState, isFormOpen: true, }))}
          >
            <AddCircleIcon className={`${classes.colorLink} Add-Btn`} />
          </IconButton>
          <Typography variant='body1' >
            {t('usersAdd')}
          </Typography>
        </div>
        <Grid
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          onPageSizeChange={handlePageSizeChange}
          onPageNumberChange={handlePageNumberChange}
          hasSelection={false}
          pageSize={state.pageSize}
          pageNumber={state.pageNumber}
          totalRows={state.totalEntries}
        />
      </Paper>
      {state.isFormOpen && (
        <Form
          open={state.isFormOpen}
          entry={state.rowBeingEdited}
          onClose={(isSubmitted = false) => {
            setState(prevState => ({ ...prevState, isFormOpen: false, rowBeingEdited: null }));
            if (isSubmitted) {
              fetchEntries();
            }
          }}
        />
      )}
    </>
  );
};

export default ViewUsers;