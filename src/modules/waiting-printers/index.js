import { Switch, Redirect, Route } from "react-router-dom";
import ViewWaitingPrinters from "./view";
import AssignPrinters from "./assign-printer";

const noop = () => {};

const WaitingPrintersModule = ({ match, getWaitDeviceCount = noop }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewWaitingPrinters} />
      <Route
        exact
        path={`${match.path}/assign-printers/:id`}
        render={props => <AssignPrinters getWaitDeviceCount={getWaitDeviceCount} {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  );
};

export default WaitingPrintersModule;
