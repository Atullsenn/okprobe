import { Switch, Redirect, Route } from "react-router-dom";
import ViewPrinters from "./view";
import EquipmentSummary from "./equipment-summary";
import UsagePage from "./usage";
import MemoComponent from './memo';
import EventComponent from './events';
import ReportComponent from './report';
import DeviceConsumableDetail from'./device-consumption-detail';
import DetailReplacementHistory from './detail-replacement-history';
import EquipmentModification  from './equipment-modification';
import SearchHistory from './search-history';

const noop = () => {};
const PrintersModule = ({ broadcastMessage = noop, match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ViewPrinters} />
      <Route exact path={`${match.path}/search/:searchValue`} component={SearchHistory} />
      <Route exact path={`${match.path}/status/:status`} component={ViewPrinters} />
      <Route
        exact
        path={`${match.path}/:id/device/:deviceId/last-updated-at/:lastUpdatedDate`}
        component={EquipmentSummary}
      />
      <Route
        exact
        path={`${match.path}/usage-page/:deviceId/last-updated-at/:lastUpdatedDate`}
        component={UsagePage}
      />
       <Route
          exact
          path={`${match.path}/memo-list/:deviceId`}
          render={props => <MemoComponent broadcastMessage={broadcastMessage} {...props} />}
        />
       <Route exact path={`${match.path}/report/:deviceId`} component={ReportComponent} />
       <Route exact path={`${match.path}/event-list/:deviceId`} component={EventComponent} />
       <Route exact path={`${match.path}/device-consumable-detail/:deviceId`} component={DeviceConsumableDetail} />
       <Route exact path={`${match.path}/device-consumable-detail/:deviceId/consumable-modal/:modelId`} component={DetailReplacementHistory} />
       <Route exact path={`${match.path}/equipment-modification/:deviceId`} component={EquipmentModification} />
      <Redirect to="/" />
    </Switch>
  );
};

export default PrintersModule;
