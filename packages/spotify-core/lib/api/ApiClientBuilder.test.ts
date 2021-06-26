import MockAdapter from 'axios-mock-adapter'
import { ApiClientBuilder } from './index'

describe('ApiClientBuilder', () => {
  describe('withRetryRequest', () => {
    it('should make subsequent request after predefined timeout', async () => {
      const retryDelayMs = 100
      const retryClient = new ApiClientBuilder()
        .withRetryRequest({ retryDelay: () => retryDelayMs })
        .build()

      let firstRequestTimestamp = null
      let secondRequestTimestamp = null
      const retryClientMock = new MockAdapter(retryClient)
      retryClientMock.onAny().replyOnce(() => {
        firstRequestTimestamp = +new Date()
        return [500, {}]
      })
      retryClientMock.onAny().replyOnce(() => {
        secondRequestTimestamp = +new Date()
        return [200, {}]
      })
      const { status } = await retryClient.get('retryTest')
      expect(status).toEqual(200)

      const actualRetryDelay = secondRequestTimestamp - firstRequestTimestamp
      expect(actualRetryDelay).toBeGreaterThanOrEqual(retryDelayMs)
    })

    it('should make limited predefined number of requests, before give up completely', async () => {
      const retries = 3
      const retryClient = new ApiClientBuilder()
        .withRetryRequest({
          retries,
          retryDelay: () => 100,
        })
        .build()

      const retryClientMock = new MockAdapter(retryClient)
      const replyCallback = jest.fn(() => [500, {}])
      retryClientMock.onAny().reply(replyCallback)

      await expect(retryClient.get('retryTest')).rejects.toThrow(
        'Request failed with status code 500'
      )

      const numberOfRetriesIncludingFirstAttempt = retries + 1
      expect(replyCallback.mock.calls.length).toEqual(
        numberOfRetriesIncludingFirstAttempt
      )
    })
  })
})
