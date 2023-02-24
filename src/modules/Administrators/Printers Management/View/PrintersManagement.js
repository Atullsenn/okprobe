import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PrinterManagementList from "../Components/PrinterManagementList";

const noop = () => { };
const PrintersManagement = ({ match, getUnassignDeviceCount = noop }) => {
    return (
        <>
            <Switch>
                <Route exact path={match.path} render={props => <PrinterManagementList getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default PrintersManagement;