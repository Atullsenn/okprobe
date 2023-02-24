import React from 'react';
import RemainingAllConsumables from '../Components/RemainingAllConsumables';
import { Switch, Redirect, Route } from "react-router-dom";

const noop = () => { };
const RemainingAll = ({ broadcastMessage = noop, match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={RemainingAllConsumables} />
            <Redirect to="/" />
        </Switch>
    );
};

export default RemainingAll;