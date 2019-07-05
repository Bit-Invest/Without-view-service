import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';

import ParentWrapperPages from './parent-wrapper';
import AuthComponent from '@cdx/jsx/auth/';

const Provider = Contexts.AuthContext.Provider;

class AuthContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'auth',
    });
  }

  render() {
    console.log('#AuthContainer', this.props.reduxState);
    
    return(
      <Provider value={{actions: this.actions}}>
        <AuthComponent {...this.props} />
      </Provider>
    );
  }
};

const mapStateToProps = state => ({
  reduxState: {
    ...state.auth,
    ...state.common,
  },
  state,
});

export default connect(
  mapStateToProps,
)(AuthContainer);
