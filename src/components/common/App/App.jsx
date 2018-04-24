import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '@components/home';
import About from '@components/about';
import { RegistrationForm } from '@components/registration/registrationForm';

export const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/registration">Registration</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/registration" component={RegistrationForm} />
    </main>
  </div>
);
