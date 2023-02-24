import React from "react";
import Paper from "@material-ui/core/Paper";
import ServerSettings from "../Components/ServerSettings";
import SMPTSettings from "../Components/SMPTSettings";
import SystemErrorNotificationSetting from "../Components/SystemErrorNotificationSetting";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ServerStyle.css";
import Typography from "@material-ui/core/Typography";

const noop = () => { };
const ServerConfiguration = ({ match, getUnassignDeviceCount = noop }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="d-flex f-align-center f-justify-between mb-8">
                <Typography variant="h4">{t("server")}</Typography>
            </div>
            <Paper className="GroupPaper" elevation={4} style={{ backgroundColor: '#fafafa' }}>
                <ul className='ServerTab'>
                    <li >
                        <Link className={window.location.pathname === `${match.path}` ? 'active ellipsis' : 'ellipsis'} to={`${match.path}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            {t('ServerSettings')}
                        </Link>
                    </li>
                    <li >
                        <Link className={window.location.pathname === `${match.path}/smpt-Settings` ? 'active ellipsis' : 'ellipsis'} to={`${match.path}/smpt-Settings`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            {t('SMTPSettings')}
                        </Link>
                    </li>
                    <li >
                        <Link className={window.location.pathname === `${match.path}/system-error-notification-setting` ? 'active ellipsis' : 'ellipsis'} to={`${match.path}/system-error-notification-setting`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {t('SystemErrorNotificationSettings')}
                        </Link>
                    </li>
                </ul>
            </Paper>
            <Switch>
                <Route exact path={match.path} render={props => <ServerSettings getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Route exact path={`${match.path}/smpt-Settings`} render={props => <SMPTSettings getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Route exact path={`${match.path}/system-error-notification-setting`} render={props => <SystemErrorNotificationSetting getUnassignDeviceCount={getUnassignDeviceCount} {...props} />} />
                <Redirect to="/" />
            </Switch>
        </>
    )
};

export default ServerConfiguration;