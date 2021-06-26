export default function byLazy<ArgsType, ResultType>(
  fn: (...args: ArgsType[]) => ResultType
) {
  let result: ResultType
  return () => {
    result = result || fn()
    return result
  }
}
