export type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type PromptInput = {
  prompt: string
}

export type MessagesInput = {
  messages: Message[]
}

export type Input = PromptInput | MessagesInput

export type TextOutput = {
  text: string
}

export type MessageOutput = {
  message: Message
}

export enum ErrorCode {
  NotAuthenticated = 'NOT_AUTHENTICATED',
  PermissionDenied = 'PERMISSION_DENIED',
  RequestNotFound = 'REQUEST_NOT_FOUND',
  InvalidRequest = 'INVALID_REQUEST',
  ModelRejectedRequest = 'MODEL_REJECTED_REQUEST',
}

export enum ModelID {
  GPT3 = 'openai/gpt3.5',
  GPT4 = 'openai/gpt4',
  GPTNeo = 'together/gpt-neoxt-20B',
  Cohere = 'cohere/xlarge',
  Local = 'local',
}

export interface CompletionOptions<T extends Input> {
  temperature?: number
  numOutputs?: number
  maxTokens?: number
  stopSequences?: string[]
  model?: ModelID

  onStreamResult?: (
    result: T extends PromptInput ? TextOutput : MessageOutput,
    error: string | null,
  ) => unknown
}
