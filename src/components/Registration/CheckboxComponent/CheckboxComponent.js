import React, { Component } from 'react';
import './CheckboxComponent.css';

class CheckboxComponent extends Component {
  handleCheckboxChange = e => {
    const { onChange } = this.props;

    onChange && onChange(e);
  };

  render() {
    return (
      <input
        checked={this.props.checked}
        type="checkbox"
        onChange={this.handleCheckboxChange}
        className="checkbox"
      />
    );
  }
}

export default CheckboxComponent;
