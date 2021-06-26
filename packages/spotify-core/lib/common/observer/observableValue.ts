import { Observable } from './Observable'

export default function observableValue() {
  return function (
    target,
    name,
    { enumerable, configurable }: PropertyDescriptor = {}
  ): any {
    function set(value) {
      if (!(this instanceof Observable)) {
        throw new Error('Class with observableValue should extends Observable.')
      }
      Object.defineProperty(this, name, {
        enumerable: enumerable,
        configurable: configurable,
        writable: true,
        value: value,
      })
      this.notify(value)
      return value
    }

    return {
      set,
    }
  }
}
