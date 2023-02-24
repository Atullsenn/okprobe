import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import useStyles from './style';
import { useEffect, useState } from 'react';
import { Grid } from "shared/components";
import Service from "../../service";
import { toast } from "react-toastify";
import "../../../../shared/Shared.css";

const noop = () => {};

const defaultState = {
  isFetching: false,
  entries: [],
};

const Term = ({
  open = false,
  deviceInfoId = null,
  onClose = noop
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState(defaultState);

  const fetchTerms = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));

    const { data, error } = await Service.GetDeviceContractHistory({
      deviceInfoId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  useEffect(() => {
    if (open) {
      fetchTerms();
    }
  }, [open]);

  const columnConfig = [
    {
      id: "startDt",
      field: "startDt",
      label: t('contractStart'),
      headerClasss: classes.headerClass
    },
    {
      id: "endDt",
      field: "endDt",
      label: t('contractTermination'),
      headerClasss: classes.headerClass
    },
    {
      id: "description",
      field: "description",
      label: t('contractMemo'),
      headerClasss: classes.headerClass
    },
    {
      id: "insertDt",
      field: "insertDt",
      label: t('contractDate'),
      headerClasss: classes.headerClass
    },
    {
      id: "updateDt",
      field: "updateDt",
      label: t('contractVersion'),
      headerClasss: classes.headerClass
    },
  ];

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{
        paper: classes.termModal,
      }}
    >
      <DialogTitle>
        <div className="d-flex f-align-center f-justify-between w-100">
          <Typography variant="h5">{t('contractHeader')}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent className="mt-4">
        <Grid
          rows={state.entries}
          columns={columnConfig}
          isLoading={state.isFetching}
          hidePagination
          hasSelection={false}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <div className="d-flex f-justify-start">
          <Button
            variant="outlined"
            className={`mr-4 mt-2 mb-2 color-white Btn-Color ${classes.ButtonSimilarWidth}`}
            onClick={onClose}
          >
            {t('summaryclose')}
          </Button>
        </div>
      </DialogActions>
    </Dialog> 
  )
};

export default Term;