import * as React from 'react';
import { App } from './App';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { checkJWT } from '@store/modules/common';
import { bindActionCreators } from 'redux';
import { LocalStorage } from '@common/Utils';
import { push } from 'react-router-redux';
import { userLogIn, unauthorized } from '@store/modules/user';

class AppContainer extends React.Component {
  componentWillMount() {
    let token = LocalStorage.getItem('token');
    if (token) {
      this.props.checkJWT()
        .then(this.onJWTConfirm.bind(this))
        .catch(this.onJWTError.bind(this))
    } else {
      this.onJWTError();
    }
  }

  onJWTConfirm() {
    this.props.userLogIn();
    this.props.push('/profile');
  }

  onJWTError() {
    this.props.push('/marketplace');
  }

  render() {
    return (
      <App push={this.props.push} page={this.props.page} />
    );
  }
}

const mapStateToProps = state => {
  return {page: state.router.location.pathname.split('/')[1]};
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({checkJWT, push, userLogIn, unauthorized}, dispatch);
const connectedContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
export { connectedContainer as AppContainer };
