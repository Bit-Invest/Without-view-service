import * as React from 'react';
import { Page } from '@common/Page';
import { RadioButton } from '@components/common/RadioButton';
import { TerminalForm } from '@terminal/TerminalForm';
const ROOT_CLASS = 'terminal-page';

export const TerminalPage = (props) => (
  <Page isLoaded={true}>
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__graph-wrap`}>
        <div className={`${ROOT_CLASS}__caption`}>PLACE ORDER</div>
        <div className={`${ROOT_CLASS}__radio-button-block`}>
          <RadioButton
            title='Limit'
          />
          <RadioButton
            title='Market'
          />
        </div>
        <div className={`${ROOT_CLASS}__form-block`}>
          <div className={`${ROOT_CLASS}__form`}>
            <TerminalForm />
          </div>
          <div className={`${ROOT_CLASS}__form`}>
            <TerminalForm />
          </div>
        </div>
      </div>
    </div>
  </Page>
);
