import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import CDX from '@cdx/containers/app'

import './index.css'
import './index.scss'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CDX />
    </ConnectedRouter>
  </Provider>,
  target
)