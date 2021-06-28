export default function byLazy<ArgsType, ResultType>(
  fn: (...args: ArgsType[]) => ResultType
) {
  let result: ResultType
  return (...args: ArgsType[]) => {
    result = result || fn(...args)
    return result
  }
}
