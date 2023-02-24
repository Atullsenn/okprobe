import { Switch, Redirect, Route } from "react-router-dom";
import ViewSummary from "./view";
import DeviceList from "./device-list";

const SummaryModule = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewSummary} />
      <Route
        exact
        path={`${match.path}/device-list/:id`}
        component={DeviceList}
      />
    </Switch>
  );
};

export default SummaryModule;
