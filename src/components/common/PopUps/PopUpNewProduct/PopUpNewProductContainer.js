import * as React from 'react';
import { PopUpNewProduct } from './PopUpNewProduct';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addExchange } from '@store/modules/user';
import { hidePopUp, socketSubscribe } from '@store/modules/common';
import { getKeys, getMyProducts } from '@store/modules/user';

class PopUpNewProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 'binance',
      ApiKey: '',
      secretKey: '',
      info: '',
      nameProduct: 'My product',
      error: {
        isError: false,
        errorMessage: ''
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      key: {
        name: this.state.select,
        key: this.state.ApiKey,
        apiSecret: this.state.secretKey,
        info: this.state.info,
        nameProduct: this.state.nameProduct
      }
    };
    if (this.checkData(data)) {
      this.sendData(data);
    }
  };

  checkData(data) {
    if (data.key.nameProduct.length > 50) {
      this.setState({
        error: {
          isError: true,
          errorMessage: 'Name is longer than 50 symbols'
        }
      });
      return false;
    } else if (data.key.info.length > 250) {
      this.setState({
        error: {
          isError: true,
          errorMessage: 'Product description is longer than 250 symbols'
        }
      })
      return false;
    } else {
      return true;
    }
  }

  sendData(data) {
    const { addExchange } = this.props;
    this.props.socketSubscribe({
      message: 'keyChecked',
      callback: () => {
        this.props.getKeys();
        this.props.getMyProducts();
      }
    })
    addExchange(data);
    this.props.hidePopUp();
  }

  handleNameChange(event) {
    this.setState({ nameProduct: event.target.value });
  }

  handleSelectChange(event) {
    this.setState({ select: event.payload.value });
  }

  handleAPIChange(event) {
    this.setState({ ApiKey: event.target.value });
  }

  handleSecretKeyChange(event) {
    this.setState({ secretKey: event.target.value });
  }

  handleAreaChange(event) {
    this.setState({ info: event.target.value });
  }

  render() {
    const {
      handleSubmit,
      handleSelectChange,
      handleAPIChange,
      handleSecretKeyChange,
      handleAreaChange,
      handleNameChange
    } = this;
    return <PopUpNewProduct
      handleSubmit={handleSubmit.bind(this)}
      handleSelectChange={handleSelectChange.bind(this)}
      handleAPIChange={handleAPIChange.bind(this)}
      handleSecretKeyChange={handleSecretKeyChange.bind(this)}
      handleAreaChange={handleAreaChange.bind(this)}
      handleNameChange={handleNameChange.bind(this)}
      role={this.props.role}
      isError={this.state.error.isError}
      errorMessage={this.state.error.errorMessage}
    />;
  }
}

const mapStateToProps = state => {
  return {role: state.user.personalInfo.role};
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {addExchange, hidePopUp, getKeys, socketSubscribe, getMyProducts}, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(PopUpNewProductContainer);

export {connectedContainer as PopUpNewProductContainer};
