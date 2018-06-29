import * as React from 'react';
import { TerminalHead } from './TerminalHead';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TerminalHeadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPair: props.currentPair
    };
  }

  onSelectPair = (event) => {
    console.log(event);
  }

  onSelectStock = (event) => {
    console.log(event);
  }

  render() {
    return (
      <TerminalHead
        onSelectPair={this.onSelectPair}
        onSelectStock={this.onSelectStock}
        currentPair={this.state.currentPair}
        pairs={this.props.pairs.map(pair =>
          {
            value: pair.symbol,
            label: `${pair.baseAsset} / ${pair.quoteAsset}`
          }
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPair: state.terminal.currentPair,
    pairs: state.terminal.pairs
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(TerminalHeadContainer);

export { connectedContainer as TerminalHeadContainer };
