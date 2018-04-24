import * as React from 'react';
import { PopUpManager } from './PopUpManager'

const ROOT_CLASS = 'pop-up-container';

export class PopUpManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowed: false
    };
  }

  render() {
    return (
      <div className={ROOT_CLASS}>
        <div className={`${ROOT_CLASS}__content`}>

        </div>
        <div className={`${ROOT_CLASS}__undercover`}>

        </div>
      </div>
    );
  }
}
