import { Switch, Redirect, Route } from 'react-router-dom';
import ViewSettings from './view';

const SettingsModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewSettings} />
    </Switch>
  );
};

export default SettingsModule;