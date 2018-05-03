import * as React from 'react';
import { App } from './App';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class AppContainer extends React.Component {
  render() {
    return (
      <App push={this.props.push} page={this.props.page} />
    );
  }
}

const mapStateToProps = state => {
  return {page: state.router.location.pathname.substring(1)};
}
const mapDispatchToProps = dispatch => bindActionCreators({push}, dispatch);
const connectedContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
export { connectedContainer as AppContainer };
