import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from '@components/home';
import About from '@components/about';
import { RegistrationPage } from '@registration/RegistrationPage';
import { ProfilePage } from '@profile/ProfilePage';
import { MarketplacePage } from '@components/marketplace/MarketplacePage/MarketplacePage';
import { Menu } from '../Menu';
import 'normalize.css';


export const App = (props) => {
  return (
    <div className={`App_${props.page}`}>
      <main>
        <Switch>
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/about-us" component={About} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/marketplace" component={MarketplacePage} />
        </Switch>
      </main>
    </div>
  );
};

// <Menu push={props.push : react-router-redux push} page={props.page : string} />
