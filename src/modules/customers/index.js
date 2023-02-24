import { Switch, Redirect, Route } from 'react-router-dom';
import ViewCustomers from './view';
import EditCustomer from './edit';

const NoticeModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewCustomers} />
      <Route exact path={`${match.path}/endCustomerId/:endCustomerId`} component={ViewCustomers} />
      <Route exact path={`${match.path}/:id`} component={EditCustomer} />
    </Switch>
  );
};

export default NoticeModule;