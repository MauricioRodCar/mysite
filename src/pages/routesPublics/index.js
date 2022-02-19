import { Route, Redirect, Switch } from 'react-router-dom';
import React, {useState, Suspense, lazy} from 'react';
import SuspensePage from '../SuspensePage';


const MainPage = lazy( () => import( "../MainPage" ) );
const SkillsPage = lazy( () => import( "../SkillsPage" ) );
const PortfolioPage = lazy( () => import( "../PortfolioPage" ) );
const RecipePage = lazy( () => import( "../Projects/RecipePage" ) );


const RoutesPublics = () => {

  const [routes, updateRoutes] = useState([
   { path: '/', component: MainPage },
   { path: '/skills', component: SkillsPage },
   { path: '/portfolio', component: PortfolioPage },
   { path: '/recipe', component: RecipePage },
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
