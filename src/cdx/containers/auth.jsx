import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';
import utils from '@cdx/utils/';

import ParentWrapperPages from './parent-wrapper';
import AuthComponent from '@cdx/jsx/auth/';

const Provider = Contexts.AuthContext.Provider;
const Logger = utils.common.logger('marketproduct');

class AuthContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'auth',
    });
  }

  render() {
    Logger({
      body: {
        reduxState: this.props.reduxState,
      }
    });
    
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
