export type Observer<T> = (value: T) => void

export class Observable<T> {
  protected subscribers: Set<Observer<T>> = new Set()

  subscribe(observer: Observer<T>): void {
    this.subscribers.add(observer)
  }

  public unsubscribe(observer: Observer<T>): void {
    this.subscribers.delete(observer)
  }

  protected notify(data: T): void {
    this.subscribers.forEach((subscriber) => {
      subscriber(data)
    })
  }
}

export namespace Observable {
  export type Event<N, V> = {
    name: N
    value: V
  }
}
