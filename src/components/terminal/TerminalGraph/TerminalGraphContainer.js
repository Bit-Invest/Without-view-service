import * as React from 'react';
import { TerminalGraph } from './TerminalGraph';

export class TerminalGraphContainer extends React.Component {

  render() {
    return (
      <div>
        <TerminalGraph
          {...this.props}
        />
      </div>
    );
  }
}
