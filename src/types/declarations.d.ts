import {
  CompletionOptions,
  ErrorCode,
  EventType,
  Input,
  MessageOutput,
  ModelID,
  PromptInput,
  TextOutput,
} from '.'

interface WindowAiProvider {
  getCurrentModel: () => Promise<ModelID>
  getCompletion<T extends Input>(
    input: T,
    options?: CompletionOptions<T>,
  ): Promise<T extends PromptInput ? TextOutput : MessageOutput>
  addEventListener?<T>(
    handler: (event: EventType, data: T | ErrorCode) => void,
  ): string
}

declare global {
  interface Window {
    ai?: WindowAiProvider
  }
}
