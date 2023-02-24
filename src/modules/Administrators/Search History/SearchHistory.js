import React from "react";
import SearchResult from "../Printer Search/Components/SearchResult";
import Tabel from "./Components/Table";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import PrintersDetail from "../Printer Search/Components/PrintersDetail";
import RegisterPrinter from "../Printer Search/Components/RegisterPrinter";

const noop = () => {};
const SearchHistory = ({ match, getUnassignDeviceCount = noop }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.path} render={props => <Tabel getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
        <Route exact path={`${match.path}/search-result`}render={props => <SearchResult getUnassignDeviceCount={getUnassignDeviceCount} {...props} />}/>
        <Route exact path={`${match.path}/search-result/register-printer`}render={props => <RegisterPrinter getUnassignDeviceCount={getUnassignDeviceCount} {...props} />}/>
        <Route exact path={`${match.path}/search-result/printers-detail`}render={props => <PrintersDetail getUnassignDeviceCount={getUnassignDeviceCount} {...props} />}/>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default SearchHistory;
