import React from "react";
import Paper from "@material-ui/core/Paper";
import AgentInformation from "../Components/AgentInformation";
import AssignGroup from "../Components/AssignGroup";
import { useTranslation } from "react-i18next";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import "./AgentStyle.css";

const noop = () => { };
const Agent = ({ match, getUnassignDeviceCount = noop }) => {
    const { t } = useTranslation();
    return (
        <>
            <Paper className="GroupPaper" elevation={4} style={{ backgroundColor: '#fafafa' }}>
                <ul className='AgentTabBtn'>
                    <li >
                        <Link className={window.location.pathname === `${match.path}` ? 'active' : ''} to={`${match.path}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {t('AgentList')}
                        </Link>
                    </li>
                    <li >
                        <Link className={window.location.pathname === `${match.path}/assignment` ? 'active' : ''} to={`${match.path}/assignment`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {t('Assignment')}
                        </Link>
                    </li>
                </ul>
            </Paper>
            <Switch>
                <Route exact path={match.path} render={props => <AgentInformation getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Route exact path={`${match.path}/assignment`} render={props => <AssignGroup getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default Agent;