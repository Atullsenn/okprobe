import React from "react";
import ModelTable from '../Components/ModelTable';
import MoreDetailInfo from "../Components/MoreDetailInfo";
import { Route, Redirect, Switch } from "react-router-dom";

const noop = () => { };
const Model = ({ match, getUnassignDeviceCount = noop }) => {
    return (
        <>
            <Switch>
                <Route exact path={match.path} render={props => <ModelTable getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Route exact path={`${match.path}/model-detailed-info`} render={props => <MoreDetailInfo getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default Model;
