import { useEffect, useState }  from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import ProbeNoticeImg from 'assets/images/probe-notice.jpeg';
import OrgImg from 'assets/images/org-logo.png';
import useStyles from './style.js';
import { getTokenData } from 'utils/token.js';
import LastNoticeService from './service.js';

const noop = () => {};

const defaultState = {
  open: true,
  ignore: false,
  fetchingPrinters:false,
  entries:[],
  totalEntries:0,
  pageNumber: 1,
  pageSize: 100,
}

const ProbeNotice = () => {
  const userData = getTokenData();
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(defaultState);

const fetchPrinters = async () => {
  setState((prevState) => ({ ...prevState, fetchingPrinters: true }));
  const { data, error } = await LastNoticeService.post({
      page: state.pageNumber,
      onePageDataCount: state.pageSize
  });
  if (error) {
    setState((prevState) => ({ ...prevState, fetchingPrinters: false }));
  } else {
    setState((prevState) => ({
      ...prevState,
      fetchingPrinters: false,
      entries: data || defaultState.entries,
      totalEntries: data[0] && data[0]?.rowCount || defaultState.totalEntries
    }));
  }
};  
useEffect(() => {
    fetchPrinters();
    if (!state.open) {
      localStorage.setItem('probe-ignore-showed', false);
    }


  }, [
      state.open,state.pageNumber,state.pageSize
      
  ]);
  
  const handleClose = () => {
    setState(prevState => ({
      ...prevState,
      open: false,
    }));
    localStorage.setItem('probe-ignore-notice', state.ignore);
  };

  if (localStorage.getItem('probe-ignore-notice') === 'true' || localStorage.getItem('probe-ignore-showed') === 'true') {
    return null;
  }
  
  return (
    <Dialog className={clsx('d-flex f-justify-between',classes.hidepopup)}
        onClose={handleClose}
        open={state.open}
        classes={{
          paper: classes.probeNotice,
        }}
      >
        <DialogContent className='p-0 m-0' style={{ overflow: 'hidden' }}>
        <img alt='notice' src={OrgImg}  />
          <ul className={clsx('',classes.listpadd)}>
            {state.entries.slice(0, 1).map((post) =>
              <li key={post.id}>
                <h4>{post.writeName}</h4>
                <p>{post.message}</p>
              </li>
            )}
          </ul>
        </DialogContent>
        <Divider />
        <DialogActions>
          <div className="d-flex w-100 f-justify-between">
            <Button
              variant="outlined"
              className="mr-4 mt-2 mb-2"
              onClick={() => {
                handleClose();
                history.push('./notice')
              }}
            >
              {t("noticeReadMore")}
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.ignore}
                  onChange={(evt) => {
                    const { checked } = evt.target;
                    setState(prevState => ({
                      ...prevState,
                      ignore: checked,
                    }));
                  }}
                  color="Primary"
                />
              }
              label={t("noticeNoMoreDisplay")}
            />
          </div>
        </DialogActions>
      </Dialog>
  );
};
export default ProbeNotice;