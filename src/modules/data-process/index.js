import { Switch, Redirect, Route } from 'react-router-dom';
import ViewDataProcess from './view';

const NoticeModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewDataProcess} />
    </Switch>
  );
};

export default NoticeModule;