import { injectable } from 'inversify'
import { LinkingService } from 'spotify-core'

@injectable()
export default class WebLinkingService implements LinkingService {
  private initialUrl: string = window.location.href

  getInitialUrl(): Promise<string | null> {
    return Promise.resolve(this.initialUrl)
  }

  onRedirectResult(
    onRedirectCallback: (result: { url: string }) => void
  ): void {}

  async openUrl(url: string): Promise<void> {
    window.location.href = url
  }
}
