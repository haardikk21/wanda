import React from 'react'
import { Connector, Data, InjectedConnector } from './connectors'

type State = {
  connector?: Connector
  data?: Data
  error?: Error
}

type ContextValue = [
  {
    connectors: Connector[]
    connector?: State['connector']
    data?: State['data']
  },
  React.Dispatch<React.SetStateAction<State>>,
]

export const Context = React.createContext<ContextValue | null>(null)

type Props = {
  connectors: Connector[]
}

export const Provider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  connectors = [new InjectedConnector()],
}) => {
  const [state, setState] = React.useState<State>({})

  React.useEffect(() => {
    if (!state.connector) return

    const handleChange = (data: Data) => {
      setState((state) => ({ ...state, data }))
    }

    state.connector.on('change', handleChange)

    return () => {
      if (!state.connector) return
      state.connector.off('change', handleChange)
    }
  }, [state.connector])

  // Close connectors when unmounting
  React.useEffect(() => {
    return () => {
      if (!state.connector) return
      state.connector.deactivate()
    }
  }, [state.connector])

  const value = [
    {
      connectors,
      connector: state.connector,
      data: state.data,
    },
    setState,
  ] as ContextValue

  return React.createElement(Context.Provider, { value }, children)
}
