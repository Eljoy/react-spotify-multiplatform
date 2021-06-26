import required from './required'

describe('required', () => {
  class Test {
    @required()
    requiredProperty: string
  }

  it('should throw an Error if it is empty by the time of get', () => {
    const test = new Test()
    expect(() => test.requiredProperty).toThrow()
  })

  it('should return a value if it is defined', () => {
    const test = new Test()
    const testValue = 'testValue'
    test.requiredProperty = testValue
    expect(test.requiredProperty).toEqual(testValue)
  })
})
