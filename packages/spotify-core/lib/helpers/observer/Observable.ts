export type Observer<T> = (value: T) => void

export default class Observable<T> {
  protected subscribers: Set<Observer<T>> = new Set()

  public subscribe(observer: Observer<T>): void {
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
