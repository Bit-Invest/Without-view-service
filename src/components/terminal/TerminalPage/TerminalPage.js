import * as React from 'react';
import { Page } from '@common/Page';
import { TerminalGraph } from '@terminal/TerminalGraph';

const ROOT_CLASS = 'terminal-page';

export const TerminalPage = (props) => (
  <Page isLoaded={true}>
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__graph-wrap`}>
        <TerminalGraph />
      </div>
    </div>
  </Page>
);
