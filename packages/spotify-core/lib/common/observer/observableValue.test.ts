import { Observable, observableValue } from './index'

describe('Observable value test', () => {
  class TestObservableClass extends Observable<string> {
    @observableValue()
    public observableValue: string
  }

  class TestNonObservableClass {
    @observableValue()
    public observableValue: string
  }

  it('should throw an Exception if class does not inherit Observable', () => {
    const testNonObservableClass = new TestNonObservableClass()
    expect(() => (testNonObservableClass.observableValue = 'foo')).toThrow(
      new Error('Class with observableValue should extends Observable.')
    )
  })

  it('should call notify on wrapped property set', () => {
    const testObservableClass = new TestObservableClass()
    const testObservableValue = 'observableValue'
    const subscriber = jest.fn()
    testObservableClass.subscribe(subscriber)
    testObservableClass.observableValue = testObservableValue
    expect(subscriber).toBeCalledWith(testObservableValue)
    expect(testObservableClass.observableValue).toEqual(testObservableValue)
  })
})
