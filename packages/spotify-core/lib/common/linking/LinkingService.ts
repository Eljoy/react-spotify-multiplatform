export interface LinkingService {
  getInitialUrl(): Promise<string | null>
  onRedirectResult(onRedirectCallback: (result: { url: string }) => void): void
  openUrl(url: string): Promise<void>
}
