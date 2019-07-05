import React from 'react';
import { Route } from "react-router-dom";
import { 
  ProfileContainer,
  AuthContainer,
  MyProductContainer,
  MarketplaceContainer,
  MarketProductContainer,
} from './';

const CDX = () => (
  <div className="app">
    <Route path="/im" component={ProfileContainer} />
    <Route path="/auth" component={AuthContainer} />
    <Route path="/myproduct/:productId?" component={MyProductContainer} />
    <Route path="/marketplace" component={MarketplaceContainer} />
    <Route path="/marketproduct/:productId?" component={MarketProductContainer} />
  </div>
);

export default CDX;
