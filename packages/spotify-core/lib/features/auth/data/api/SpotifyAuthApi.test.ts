import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ApiClientBuilder } from '../../../../api'
import { byLazy } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { Token } from '../../../../entities/token'
import { spotifyAppContainer } from '../../../../inversify.config'
import { AuthApi } from '../../domain'
import { SpotifyAuthApi } from './index'

describe('SpotifyAuthApi', () => {
  const client = axios.create()
  const clientMock = new MockAdapter(client)
  const authApi = byLazy(() =>
    spotifyAppContainer.get<AuthApi>(AppDependencies.Auth.Api)
  )

  class ApiClientBuilderMock extends ApiClientBuilder {
    build(config: AxiosRequestConfig = {}): AxiosInstance {
      return client
    }
  }

  beforeAll(() => {
    spotifyAppContainer
      .bind<AuthApi>(AppDependencies.Auth.Api)
      .to(SpotifyAuthApi)

    spotifyAppContainer
      .bind<ApiClientBuilder>(AppDependencies.Common.ApiClientBuilder)
      .to(ApiClientBuilderMock)
  })

  beforeEach(() => {
    clientMock.reset()
  })

  test('refreshToken', async () => {
    const tokenJson = {
      access_token: '234dewwf',
      refresh_token: '2fed2oekio2',
      expires_in: 3600,
      token_type: 'Bearer',
    }
    const token = Token.deserialize(tokenJson)
    clientMock
      .onPost('https://accounts.spotify.com/api/token', {
        grant_type: 'refresh_token',
        refresh_token: tokenJson.refresh_token,
      })
      .reply(() => [200, token.serialize()])
    const refreshedToken = await authApi().refreshToken(token)
    expect(refreshedToken).toEqual(token)
  })

  test('requestToken', async () => {
    const tokenJson = {
      access_token: '234dewwf',
      refresh_token: '2fed2oekio2',
      expires_in: 3600,
      token_type: 'Bearer',
    }
    const redirectUri = 'redirectUri'
    const code = 'code'
    const token = Token.deserialize(tokenJson)
    clientMock
      .onPost('https://accounts.spotify.com/api/token', {
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      })
      .reply(() => [200, token.serialize()])
    const refreshedToken = await authApi().requestToken(code, redirectUri)
    expect(refreshedToken).toEqual(token)
  })
})
