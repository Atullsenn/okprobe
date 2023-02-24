import { Switch, Redirect, Route } from 'react-router-dom';
import ViewNotice from './view';

const NoticeModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewNotice} />
    </Switch>
  );
};

export default NoticeModule;