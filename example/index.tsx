import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

import { App } from './app'
import { InjectedConnector, Provider } from '@wanda-dev/react'

const root = ReactDOMClient.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider connectors={[new InjectedConnector()]}>
      <App />
    </Provider>
  </React.StrictMode>,
)
