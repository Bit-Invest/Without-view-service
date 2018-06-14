import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RegistrationPage } from '@registration/RegistrationPage';
import { ProfilePage } from '@profile/ProfilePage';
import { MarketplacePage } from '@components/marketplace/MarketplacePage';
import { TerminalPage } from '@terminal/TerminalPage';
import 'normalize.css';


export const App = (props) => {
  return (
    <div className={`App App_${props.page}`}>
      <div className={`App__preloader ${props.isLoaded ? 'App__preloader_hidden': ''}`}></div>
      <main className={`App__main ${props.isLoaded ? '' : 'App__main_hidden'}`}>
        <Switch>
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/marketplace" component={MarketplacePage} />
          <Route path="/terminal" component={TerminalPage} />
        </Switch>
      </main>
    </div>
  );
};
