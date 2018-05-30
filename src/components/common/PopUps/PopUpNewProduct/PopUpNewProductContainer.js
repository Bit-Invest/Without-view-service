import * as React from 'react';
import { PopUpNewProduct } from './PopUpNewProduct';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addExchange } from '@store/modules/user';

class PopUpNewProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 'Choose your stock exchange',
      ApiKey: '',
      secretKey: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      key: {
        name: this.state.select,
        key: this.state.ApiKey,
        apiSecret: this.state.secretKey
      }
    };
    const { addExchange } = this.props;
    addExchange(data)
      .then(this.onSuccessSubmit.bind(this))
      .catch(this.onErrorSubmit.bind(this));
  };

  onSuccessSubmit() {}

  onErrorSubmit() {}

  handleSelectChange(event) {
    this.setState({ select: event.target.value });
  }

  handleAPIChange(event) {
    this.setState({ ApiKey: event.target.value });
  }

  handleSecretKeyChange(event) {
    this.setState({ secretKey: event.target.value });
  }

  render() {
    const {
      handleSubmit,
      handleSelectChange,
      handleAPIChange,
      handleSecretKeyChange
    } = this;
    return <PopUpNewProduct
      handleSubmit={handleSubmit.bind(this)}
      handleSelectChange={handleSelectChange.bind(this)}
      handleAPIChange={handleAPIChange.bind(this)}
      handleSecretKeyChange={handleSecretKeyChange.bind(this)}
    />;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({addExchange}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(PopUpNewProductContainer);

export {connectedContainer as PopUpNewProductContainer};
