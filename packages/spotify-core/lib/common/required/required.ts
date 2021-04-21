export default function required() {
  return function (
    target,
    name,
    { enumerable, configurable, writable }: PropertyDescriptor = {}
  ): any {
    function get(value) {
      if (value === null || value === undefined) {
        throw Error(`${name} is required.`)
      }
      return value
    }

    function set(value) {
      Object.defineProperty(this, name, {
        enumerable: enumerable,
        configurable: configurable,
        writable: writable,
        value: value,
      })
      return value
    }

    return {
      get,
      set,
    }
  }
}
