import * as React from 'react';
import { AddProduct } from './AddProduct';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showPopUp } from '@store/modules/common';

class AddProductContainer extends React.Component {

  onClick = () => {
    this.props.showPopUp('newProduct');
  }

  render() {
    return (<AddProduct onClick={this.onClick} />);
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({showPopUp}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(AddProductContainer);
export { connectedContainer as AddProductContainer };
