import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '@components/home';
import About from '@components/about';
import { RegistrationPage } from '@registration/RegistrationPage';
import { ProfilePage } from '@profile/ProfilePage';
import { MarketplacePage } from '@components/marketplace/MarketplacePage/MarketplacePage';

export const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/registration" component={RegistrationPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/marketplace" component={MarketplacePage} />
    </main>
  </div>
);
