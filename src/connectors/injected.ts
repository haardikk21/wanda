import { ModelID } from '../types'
import { WindowAiProvider } from '../types/declarations'
import { Connector, Data } from './types'

export class InjectedConnector extends Connector {
  name = 'injected'

  constructor() {
    super()

    // no-op
    // Connect event listeners here once window.ai upstream changes to emit events
  }

  async activate(): Promise<Data> {
    if (!window.ai) throw Error(`window.ai not found`)

    try {
      const model = await window.ai.getCurrentModel()
      return { model, provider: window.ai }
    } catch (error) {
      throw Error(`activate failed`)
    }
  }

  deactivate(): void {
    // no-op
    // Disconnect event listeners here once window.ai upstream changes to emit events
  }

  async getModel(): Promise<ModelID> {
    if (!window.ai) throw Error(`window.ai not found`)

    try {
      return await window.ai.getCurrentModel()
    } catch {
      throw Error('model not found')
    }
  }

  async getProvider(): Promise<WindowAiProvider> {
    if (!window.ai) throw Error(`window.ai not found`)

    return window.ai
  }
}
