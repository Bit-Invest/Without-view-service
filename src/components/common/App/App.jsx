import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RegistrationPage } from '@registration/RegistrationPage';
import { ProfilePage } from '@profile/ProfilePage';
import { MarketplacePage } from '@components/marketplace/MarketplacePage';
import { TerminalPage } from '@terminal/TerminalPage';
import 'normalize.css';
import MobileDetect from 'mobile-detect'
import MobileStub from '../MobileStub/MobileStub'

const md = new MobileDetect(window.navigator.userAgent)

export const App = (props) => {
  return (
    <div className={`App`}>
      <main className="App__main">
      { md.mobile() !== null && window.innerWidth <= 500 ?
        <MobileStub /> :
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/marketplace" />} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/marketplace" component={MarketplacePage} />
          <Route path="/terminal" component={TerminalPage} />
        </Switch>
      }
      </main>
    </div>
  );
};
