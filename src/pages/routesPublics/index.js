import { Route, Redirect, Switch } from 'react-router-dom';
import React, {useState, Suspense, lazy} from 'react';
import SuspensePage from '../SuspensePage';


const MainPage = lazy( () => import( "../MainPage" ) );
const SecondPage = lazy( () => import( "../SecondPage" ) );

const RoutesPublics = () => {

  const [routes, updateRoutes] = useState([
   { path: '/', component: MainPage },
   { path: '/b', component: SecondPage },
 ]);


  return (
    <Suspense fallback={<SuspensePage />}>
      <Switch>

        {routes.map((route, i) => {
          return (
            <Route
              key={i}
              exact
              path={route.path}
              component={route.component}
            />
          );
        })}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  )
}

export default RoutesPublics;
