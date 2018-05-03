import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RegistrationPage } from '@registration/RegistrationPage';
import { ProfilePage } from '@profile/ProfilePage';
import { MarketplacePage } from '@components/marketplace/MarketplacePage/MarketplacePage';
import { Menu } from '@common/Menu';
import 'normalize.css';


export const App = (props) => {
  return (
    <div className={`App_${props.page}`}>
      <main>
        <Switch>
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/marketplace" component={MarketplacePage} />
        </Switch>
        <Menu push={props.push} page={props.page} />
      </main>
    </div>
  );
};
