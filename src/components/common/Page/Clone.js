import * as React from 'react';
import { Page } from './Page'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class CloneContainer extends React.Component {
  render() {
    console.log('!@@',this.props)
    return (
      <div>
        123
        {this.props.children}
      </div>
    );
  }
}
