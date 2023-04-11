import React from 'react'
import { Context } from '../context'

export const useContext = () => {
  const context = React.useContext(Context)
  if (!context) throw Error(`useContext must be used within a Provider`)

  return context
}
