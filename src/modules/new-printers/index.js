import { Switch, Redirect, Route } from "react-router-dom";
import ViewNewPrinters from "./view";
import AssignPrinters from "./assign-printer";

const noop = () => {};

const NewPrintersModule = ({ match, getUnassignDeviceCount = noop }) => {
  return (
    <Switch>
      <Route exact path={match.path}
        render={props => <ViewNewPrinters getUnassignDeviceCount={getUnassignDeviceCount} {...props} />}
      />
      <Route
        exact
        path={`${match.path}/assign-printers/:id`}
        render={props => <AssignPrinters getUnassignDeviceCount={getUnassignDeviceCount} {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  );
};

export default NewPrintersModule;
