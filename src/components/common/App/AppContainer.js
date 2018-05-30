import * as React from 'react';
import { App } from './App';
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
  return {page: state.router.location.pathname.split('/')[1]};
}
const connectedContainer =
  withRouter(connect(mapStateToProps, null)(AppContainer));
export { connectedContainer as AppContainer };
