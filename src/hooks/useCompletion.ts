import { useContext } from './useContext'
import { CompletionOptions, Input } from '../types'

export const useCompletion = () => {
  const [state] = useContext()

  const getCompletion = async <T extends Input>(
    input: T,
    options?: CompletionOptions<T>,
  ) => {
    const provider = await state.connector?.getProvider()

    if (!provider) {
      throw Error('No provider found')
    }

    return provider.getCompletion(input, options)
  }

  return { getCompletion }
}
