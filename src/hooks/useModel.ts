import { useContext } from './useContext'

export const useModel = () => {
  const [state] = useContext()
  return state.data?.model
}
