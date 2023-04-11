import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

import { App } from './app'
import { Provider } from '../src/context'
import { InjectedConnector } from '../src'

const root = ReactDOMClient.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider connectors={[new InjectedConnector()]}>
      <App />
    </Provider>
  </React.StrictMode>,
)
