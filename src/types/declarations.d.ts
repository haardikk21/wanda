import {
  CompletionOptions,
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
}

declare global {
  interface Window {
    ai?: WindowAiProvider
  }
}
