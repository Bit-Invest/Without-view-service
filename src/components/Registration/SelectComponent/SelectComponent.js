import React, { Component } from 'react';
import './SelectComponent.css';

class SelectComponent extends Component {
  handleSelectChange = e => {
    const { onChange } = this.props;

    onChange && onChange(e);
  };

  render() {
    return (
      <select onChange={this.handleSelectChange} className="selectInput">
        <option>Trader</option>
        <option>Investor</option>
      </select>
    );
  }
}

export default SelectComponent;
