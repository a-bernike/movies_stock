import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from 'configs/routes';
import {assetUrl} from 'helpers/asset';
import { Loader } from 'views/components/widgets';
import Header from 'views/components/Header';

const App = props => {
  return (
    <div className="app">
      <Header />
      <BrowserRouter>
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? 
              <Route key={idx} path={route.path} exact={route.exact} render={props => (
                <Suspense fallback={<Loader />}>
                  <route.component {...props} />
                </Suspense>
              )} /> 
              : null
          })}
        </Switch>
      </BrowserRouter>
      <div className="back-to-top">
        <img
          alt="to top"
          src={assetUrl('/chevron-up.svg')}
          onClick={() => window.scrollTo(0,0)}
        />
      </div>
    </div>
  );
}

export default App;
