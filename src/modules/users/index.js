import { Switch, Redirect, Route } from 'react-router-dom';
import ViewUsers from './view';

const UserModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewUsers} />
    </Switch>
  );
};

export default UserModule;