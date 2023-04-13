import { ErrorCode, EventType, ModelID } from '../types'
import { WindowAiProvider } from '../types/declarations'
import { Connector, Data } from './types'

export class InjectedConnector extends Connector {
  name = 'injected'

  constructor() {
    super()

    this.handleEvent = this.handleEvent.bind(this)
  }

  async activate(): Promise<Data> {
    if (!window.ai) throw Error(`window.ai not found`)

    if (window.ai.addEventListener) {
      window.ai.addEventListener(this.handleEvent)
    }

    try {
      const model = await window.ai.getCurrentModel()
      return { model, provider: window.ai }
    } catch (error) {
      throw Error(`activate failed`)
    }
  }

  deactivate(): void {
    // no-op
    // Disconnect event listeners here once window.ai upstream has removeEventListener
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

  private handleEvent(event: EventType, data: unknown) {
    if (event === EventType.ModelChanged) {
      this.emit('change', { model: (<{ model: ModelID }>data).model })
    } else if (event === EventType.Error) {
      this.emit('error', Error(data as ErrorCode))
    }
  }
}
