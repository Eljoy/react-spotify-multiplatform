import range from 'lodash.range'

export function multiple<ArgsType, ResultType>(
  n: number,
  fn: (...args: ArgsType[]) => ResultType,
  ...args: ArgsType[]
): ResultType[] {
  return range(0, 3).map(() => fn(...args))
}
