import * as React from 'react';
import { Page } from '@common/Page';
import { TerminalGraph } from '@terminal/TerminalGraph';
import { TerminalForm } from '@terminal/TerminalForm';
const ROOT_CLASS = 'terminal-page';

export const TerminalPage = (props) => (
  <Page isLoaded={true}>
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__graph-wrap`}>
        <TerminalGraph />
        <TerminalForm />
      </div>
    </div>
  </Page>
);
