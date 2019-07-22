import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';
import utils from '@cdx/utils/';

import ParentWrapperPages from './parent-wrapper';
import ProfileComponent from '@cdx/jsx/profile/';

const Provider = Contexts.ProfileContext.Provider;
const Logger = utils.common.logger('profile');

class ProfileContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'profile',
    });
  }

  render() {
    Logger({
      body: {
        reduxState: this.props.reduxState,
      },
    });

    return(
      <Provider value={{
        actions: this.actions,
      }}>
        <ProfileComponent {...this.props} />
      </Provider>
    );
  }
};

const mapStateToProps = state => ({
  reduxState: {
    ...state.common,
    ...state.profile,
  },
  state,
});

export default connect(
  mapStateToProps,
)(ProfileContainer);
