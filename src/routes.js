import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RoutesPublics from './pages/routesPublics';
import { withRouter } from 'react-router-dom';

const Routes = ({ history }) => {

  return(

    <Switch>
      <RoutesPublics />
    </Switch>

  )
}
export default withRouter(Routes);
