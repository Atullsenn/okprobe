import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Service from "../service";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import useStyles from "./style";
import { Grid } from "shared/components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTranslation } from 'react-i18next';

const defaultState = {
  details: {
    "Pages left (approximately)": 0,
    "Serial Number": "",
    "Printed page": "",
    "Initial installation date": "",
    "Last use date": "",
  },
  description: "",
  history: [],
  isFetchingDetail: false,
  isFetchingConsumable:false,
};

const UsagePage = ({ match }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    ...defaultState,
  });
  const { t } = useTranslation();
  const GetDeviceConsumableDetail = async () => {
    setState((prevState) => ({ ...prevState, isFetchingDetail: true }));

    const { data, error } = await Service.GetDeviceConsumableDetail({
      consumableModelId: match.params.modelId,
      deviceInfoId: match.params.deviceId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetchingDetail: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetchingDetail: false,
        description: data.description || "",
        details: {
          "Pages left (approximately)": data?.estimateRemainingPage || "",
          "Serial Number": data?.serialNumber || "",
          "Printed page": data?.pagePrinted || "",
          "Initial installation date": data?.firstInstallDate || "",
          "Last use date": data?.lastUseDate || "",
        },
      }));
    }
  };
  const GetDeviceConsumableChangeHistory = async () => {
    setState((prevState) => ({ ...prevState, isFetchingConsumable: true }));

    const { data, error } = await Service.GetDeviceConsumableChangeHistory({
      consumableModelId: match.params.modelId,
      deviceInfoId: match.params.deviceId,
      dt1: "",
    });
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetchingConsumable: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetchingConsumable: false,
        history: data || defaultState.history,
      }));
    }
  };
  useEffect(() => {
    GetDeviceConsumableDetail();
    GetDeviceConsumableChangeHistory();
  }, []);

  return (
    <>
      <div className="d-flex f-align-center f-justify-between mb-8">
        <Typography variant="h4">
          {t('summaryConsumable details and replacement history')}
        </Typography>
      </div>
      <Paper
        elevation={4}
        className="mb-6"
        classes={{
          root: classes.paper,
        }}
      >
        {state.description && (
          <>
            <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
              <Typography variant="h6" className="mt-4">
                {state.description}
              </Typography>
            </div>
            <Divider />
          </>
        )}
        <Divider />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
           
            <TableBody>
              {Object.keys(state.details).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row"  className={classes.tableRightBorder}>
                    <Typography variant="h6" className="text-bold d-flex f-justify-center">
                      {row}
                    </Typography>
                  </TableCell>
                
                  <TableCell align="right"   className={classes.tableRightBorder} >
                    <Typography variant="body1" className="d-flex f-justify-center">
                      {state.details[row]}
                    </Typography>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {!!state.history.length && (
        <Paper
          elevation={4}
          className="mb-6 mt-10"
          classes={{
            root: classes.paper,
          }}
        >
          <div className="d-flex f-align-center f-justify-between mb-4 ml-4">
            <Typography variant="h5" className="mt-4">
            {t('summaryReplacement history')}
            </Typography>
          </div>
          <Divider />
          {state.history.map((item) => {
            return (
              <>
                <Typography variant="h6" className="mt-4 mb-4 ml-4">
                  {item.insertDt}
                </Typography>
                <Divider />
              </>
            );
          })}
        </Paper>
      )}
    </>
  );
};
export default UsagePage;
