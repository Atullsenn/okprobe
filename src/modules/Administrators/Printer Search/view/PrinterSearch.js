import React, { useState } from "react";
import "../view/PrinterSearchstyle.css";
import IPAddress from "../Components/IPAddress";
import SearchResult from "../Components/SearchResult";
import RegisterPrinter from "../Components/RegisterPrinter";
import PrintersDetail from "../Components/PrintersDetail";
import { Route, Redirect, Switch } from "react-router-dom";

const noop = () => { };
const PrinterSearch = ({ match, getUnassignDeviceCount = noop }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.path} render={props => <IPAddress getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
        <Route exact path={`${match.path}/search-result`} render={props => <SearchResult getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
        <Route exact path={`${match.path}/search-result/register-printer`} render={props => <RegisterPrinter getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
        <Route exact path={`${match.path}/search-result/printers-detail`} render={props => <PrintersDetail getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default PrinterSearch;
