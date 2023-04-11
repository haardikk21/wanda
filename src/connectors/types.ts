import { ModelID } from '../types'
import { WindowAiProvider } from '../types/declarations'

export type Data = {
  model?: ModelID
  provider?: WindowAiProvider
}

export abstract class Connector {
  abstract name: string

  abstract activate(): Promise<Data>
  abstract deactivate(): void
  abstract getModel(): Promise<ModelID>
  abstract getProvider(): Promise<WindowAiProvider>
}
