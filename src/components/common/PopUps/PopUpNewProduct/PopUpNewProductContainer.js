import * as React from 'react';
import { PopUpNewProduct } from './PopUpNewProduct';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import {  as  } from '@store/modules/registration';

class PopUpNewProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }
}
