import { Switch, Redirect, Route } from 'react-router-dom';
import ViewOKTalk from './view';

const OKTalkModule = ({
  broadcastMessage,
  match,
}) => {
  return (
    <Switch>
      <Route exact path={match.path} render={props => <ViewOKTalk
        broadcastMessage={broadcastMessage}
        {...props} />}
      />
    </Switch>
  );
};

export default OKTalkModule;