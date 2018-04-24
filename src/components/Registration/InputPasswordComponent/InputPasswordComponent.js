import React, { Component } from 'react';
import './InputPasswordComponent.css';

class InputPasswordComponent extends Component {
  PasswordChange = e => {
    const { onChange } = this.props;

    onChange && onChange(e);
  };

  render() {
    return (
      <input
        type="password"
        placeholder="Password (min 6 characters)"
        onChange={this.PasswordChange}
        className="inputPassword"
      />
    );
  }
}

export default InputPasswordComponent;
