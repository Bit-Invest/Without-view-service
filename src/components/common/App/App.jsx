import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RegistrationPage } from '@registration/RegistrationPage';
import { ProfilePage } from '@profile/ProfilePage';
import { MarketplacePage } from '@components/marketplace/MarketplacePage';
import { ProductPage } from '@components/product/ProductPage';
import { Menu } from '../Menu';
import { KycPage } from '@components/kyc/KycPage';
import 'normalize.css';


export const App = (props) => {
  return (
    <div className={`App_${props.page}`}>
      <main>
        <Switch>
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/marketplace" component={MarketplacePage} />
          <Route path="/product/:id" component={ProductPage} />
        </Switch>
        <Menu page={props.page} />
      </main>
    </div>
  );
};
