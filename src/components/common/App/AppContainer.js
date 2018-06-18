import * as React from 'react';
import { App } from './App';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { checkJWT } from '@store/modules/common';
import { bindActionCreators } from 'redux';
import { LocalStorage } from '@common/Utils';
import { push } from 'react-router-redux';
import { userLogIn } from '@store/modules/user';

class AppContainer extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

const mapStateToProps = (state) => {
  return {user: state.user};
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({checkJWT, push}, dispatch);
const connectedContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
export { connectedContainer as AppContainer };
