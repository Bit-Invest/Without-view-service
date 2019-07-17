import React from 'react';
import { Route } from "react-router-dom";
import { 
  ProfileContainer,
  AuthContainer,
  MyProductContainer,
  MarketplaceContainer,
  MarketProductContainer,
  Redirect,
} from './';

const CDX = () => (
  <div className="app">
    <Route path="/" exact component={() => <Redirect to="/im" />} />
    <Route path="/im" exact component={ProfileContainer} />
    <Route path="/auth" component={AuthContainer} />
    <Route path="/myproduct/:productId?" exact component={MyProductContainer} />
    <Route path="/marketplace" exact component={MarketplaceContainer} />
    <Route path="/marketproduct/:productId?" exact component={MarketProductContainer} />
  </div>
);

export default CDX;
