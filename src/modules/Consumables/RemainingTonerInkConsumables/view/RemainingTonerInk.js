import React from 'react';
import RemainingTonerInkConsumables from '../Components/RemainingTonerInkConsumables';
import { Switch, Redirect, Route } from "react-router-dom";

const noop = () => { };
const RemainingTonerInk = ({ broadcastMessage = noop, match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={RemainingTonerInkConsumables} />
            <Redirect to="/" />
        </Switch>
    );
};

export default RemainingTonerInk;