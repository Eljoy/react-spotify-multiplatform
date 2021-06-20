import 'reflect-metadata'
import { LinkingService } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { Token } from '../../../../entities/token'
import { spotifyAppContainer } from '../../../../inversify.config'
import { AuthRepository, AuthService } from '../../domain'
import AuthCacheService from '../cache/AuthCacheService'
import { SpotifyAuthUrlProvider } from '../providers'

describe('SpotifyAuthRepository ', () => {
  const authService = spotifyAppContainer.get<AuthService>(
    AppDependencies.Auth.Service
  )

  const authCacheService = spotifyAppContainer.get<AuthCacheService>(
    AppDependencies.Auth.CacheService
  )

  const linkingService = spotifyAppContainer.get<LinkingService>(
    AppDependencies.Common.LinkingService
  )

  const spotifyAuthUrlProvider = spotifyAppContainer.get<SpotifyAuthUrlProvider>(
    AppDependencies.Auth.UrlProvider
  )

  const spotifyAuthRepository = spotifyAppContainer.get<AuthRepository>(
    AppDependencies.Auth.Repository
  )

  const authSubscriber = jest.fn()
  spotifyAuthRepository.subscribe(authSubscriber)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('signIn', async () => {
    await spotifyAuthRepository.signIn()
    expect(linkingService.openUrl).toHaveBeenLastCalledWith(
      spotifyAuthUrlProvider.getAuthUrl()
    )
  })

  test('signOut', async () => {
    const removeTokenSpy = spyOn(authCacheService, 'removeToken').and.stub()
    await spotifyAuthRepository.signOut()

    expect(authSubscriber).toHaveBeenLastCalledWith({
      name: AuthRepository.EventNames.SignedOut,
      value: null,
    })
    expect(removeTokenSpy).toHaveBeenCalled()
    expect(await spotifyAuthRepository.isSignedIn()).toBeFalsy()
  })

  describe('isSignedIn', () => {
    it('should be truthy when there is a token', async () => {
      spyOn(spotifyAuthRepository, 'getAuthToken').and.returnValue({})
      expect(await spotifyAuthRepository.isSignedIn()).toBeTruthy()
    })

    it('should be falsy when there is no token', async () => {
      spyOn(spotifyAuthRepository, 'getAuthToken').and.returnValue(null)
      expect(await spotifyAuthRepository.isSignedIn()).toBeFalsy()
    })
  })

  describe('getAuthToken', () => {
    test('valid cacheToken', async () => {
      const token = new Token()
      spyOn(authService, 'validateToken').and.returnValue(true)
      spyOn(authCacheService, 'getToken').and.returnValue(
        Promise.resolve(token)
      )
      expect(await spotifyAuthRepository.getAuthToken()).toEqual(token)
    })

    test('stale cacheToken', async () => {
      const staleToken = new Token()
      const refreshedToken = new Token()
      const spyRefreshToken = spyOn(
        authService,
        'refreshToken'
      ).and.returnValue(Promise.resolve(refreshedToken))

      spyOn(authCacheService, 'getToken').and.returnValue(
        Promise.resolve(staleToken)
      )
      spyOn(authService, 'validateToken').and.returnValue(false)

      expect(await spotifyAuthRepository.getAuthToken()).toEqual(staleToken)
      expect(spyRefreshToken).toHaveBeenCalledWith(staleToken)
      expect(authSubscriber).toHaveBeenCalledWith({
        name: AuthRepository.EventNames.TokenRefreshed,
        value: refreshedToken,
      })
    })

    test('token from redirect', async () => {
      const tokenFromRedirect = new Token()
      const code = 'NApCCg'
      const urlWithRequestCode = `https://example.com/callback?code=${code}`

      spyOn(linkingService, 'getInitialUrl').and.returnValue(
        Promise.resolve(urlWithRequestCode)
      )
      spyOn(authService, 'requestToken').and.returnValue(
        Promise.resolve(tokenFromRedirect)
      )
      spyOn(authService, 'validateToken').and.returnValue(true)

      await spotifyAuthRepository.signOut()
      expect(await spotifyAuthRepository.getAuthToken()).toStrictEqual(
        tokenFromRedirect
      )
      expect(authSubscriber).toHaveBeenLastCalledWith({
        name: AuthRepository.EventNames.SignedIn,
        value: tokenFromRedirect,
      })
    })
  })
})
