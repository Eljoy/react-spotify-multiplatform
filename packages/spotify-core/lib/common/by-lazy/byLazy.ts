export default function byLazy<ArgsType, ResultType>(
  fn: (...args: ArgsType[]) => ResultType
): typeof fn {
  let result: ResultType
  return (...args: ArgsType[]) => {
    result ||= fn(...args)
    return result
  }
}
