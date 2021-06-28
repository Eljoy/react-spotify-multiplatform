import { byLazy } from './index'

describe('byLazy', () => {
  it('should call fn only once ', () => {
    const fn = jest.fn().mockReturnValue('resultValue')
    const byLazyFn = byLazy(fn)
    byLazyFn()
    byLazyFn()
    expect(fn).toBeCalledTimes(1)
  })

  it('should call fn with args ', () => {
    const fn = jest.fn().mockReturnValue('resultValue')
    const byLazyFn = byLazy(fn)
    byLazyFn(1, 'test')
    expect(fn).toBeCalledWith(1, 'test')
  })

  it('should return lazy fn result ', () => {
    const resultValue = 'resultValue'
    const fn = jest.fn().mockReturnValue('resultValue')
    const byLazyFn = byLazy(fn)
    expect(byLazyFn()).toEqual(resultValue)
  })
})
