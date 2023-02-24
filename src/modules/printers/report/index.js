import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Service from "../service";
import { Typography, Button,} from "@material-ui/core";
import {  BarChart } from "shared/components";
import AdvanveSearch from "./advance-search";
import { useTranslation } from 'react-i18next';
import "../../../shared/Shared.css";

const defaultState = {
  entries: [],
  isFetching: false,
  isSearching: false,
  deviceInfo: {},
};
const ReportComponent = ({ match }) => {
  let barChartLabel = [];
  let barChartTotal = [];
  let barChartMono = [];
  let barChartColor = [];
  const [state, setState] = useState(defaultState);
  const { t } = useTranslation();

  const GetDeviceGraphData = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      deviceInfoId: match.params.deviceId,
      selectMonth: "3",
    };
    const { data, error } = await Service.GetDeviceGraphData(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      let total = 0;
      data.map((reportData) => {
        barChartLabel.push(reportData.yearMonthText);
        barChartMono.push(reportData.mono);
        barChartColor.push(reportData.color);
        total += parseInt(reportData.mono);
        total += parseInt(reportData.color);
        barChartTotal.push(total);
      });

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        entries: data || defaultState.entries,
      }));
    }
  };

  const GetDeviceInfoForWeb = async () => {
    setState((prevState) => ({ ...prevState, isFetching: true }));
    const payload = {
      deviceInfoId: match.params.deviceId,
      dt1: "",
    };
    const { data, error } = await Service.GetDeviceInfoForWeb(payload);
    if (error) {
      toast.error(error);
      setState((prevState) => ({ ...prevState, isFetching: false }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        deviceInfo: data || defaultState.deviceInfo,
      }));
    }
  };

  useEffect(() => {
    GetDeviceGraphData();
    GetDeviceInfoForWeb();
  }, [match.params.deviceId]);
  //JSX
  return (
    <>
      {state.isSearching ? (
        <>
          <div className="d-flex f-align-center f-justify-between mb-8">
            <Typography variant="h4">{`${
              state.deviceInfo?.endCustomerName || ""
            } ${state.deviceInfo?.displayName || ""}`}</Typography>
          </div>
          <AdvanveSearch
            deviceInfo={state.deviceInfo}
            deviceInfoId={match.params.deviceId}
            endCustomerName={state.deviceInfo?.endCustomerName}
            displayName={state.deviceInfo?.displayName}
          />
        </>
      ) : (
        <>
          <div className="d-flex f-align-center f-justify-between mb-8">
            <Typography variant="h4">{`${
              state.deviceInfo?.endCustomerName || ""
            } ${state.deviceInfo?.displayName || ""}`}</Typography>
          </div>
          <div>
            <BarChart
              barChartLabel={barChartLabel}
              barChartTotal={barChartTotal}
              barChartMono={barChartMono}
              barChartColor={barChartColor}
              deviceInfoId={match.params.deviceId}
            />
          </div>
          <div className="d-flex f-justify-center mt-4">
            <Button
              variant="contained"
              size='large'
              className='pl-10 pr-10 Btn-Color'
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isSearching: true,
                }));
              }}
            >
              {t('summaryContract details')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};
export default ReportComponent;
