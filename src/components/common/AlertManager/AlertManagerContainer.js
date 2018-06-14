import * as React from 'react';
import { AlertManager } from './AlertManager';
import { connect } from 'react-redux';

class AlertManagerContainer extends React.Component {
  render() {
    return <AlertManager alerts={this.props.alerts} />
  }
}

const mapStateToProps = state => {
  return state.common.alerts;
}

const connectedContainer =
  connect(mapStateToProps, null)(AlertManagerContainer);
export { connectedContainer as AlertManagerContainer };
