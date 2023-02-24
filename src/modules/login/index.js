import { Switch, Route } from 'react-router-dom';
import ViewLogin from './view';

const LoginModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewLogin} />
    </Switch>
  );
};

export default LoginModule;