import EventEmitter from 'events'
import { ModelID } from '../types'
import { WindowAiProvider } from '../types/declarations'

export type Data = {
  model?: ModelID
  provider?: WindowAiProvider
}

type EventMap = {
  change: Data
  disconnect: undefined
  error: Error
}

type EventKey<T extends EventMap> = string & keyof T
type EventReceiver<T> = (params: T) => void

interface IEmitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  emit<K extends EventKey<T>>(
    eventName: K,
    ...params: T[K] extends undefined ? [undefined?] : [T[K]]
  ): void
}

export abstract class Emitter implements IEmitter<EventMap> {
  private emitter = new EventEmitter()

  on<K extends EventKey<EventMap>>(
    eventName: K,
    fn: EventReceiver<EventMap[K]>,
  ): void {
    this.emitter.on(eventName, fn)
  }

  off<K extends EventKey<EventMap>>(
    eventName: K,
    fn: EventReceiver<EventMap[K]>,
  ): void {
    this.emitter.off(eventName, fn)
  }

  emit<K extends EventKey<EventMap>>(
    eventName: K,
    ...params: EventMap[K] extends undefined ? [undefined?] : [EventMap[K]]
  ): void {
    this.emitter.emit(eventName, ...params)
  }
}

export abstract class Connector extends Emitter {
  abstract name: string

  abstract activate(): Promise<Data>
  abstract deactivate(): void
  abstract getModel(): Promise<ModelID>
  abstract getProvider(): Promise<WindowAiProvider>
}
