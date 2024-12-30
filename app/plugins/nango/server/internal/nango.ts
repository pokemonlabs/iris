import { Nango, ProxyConfiguration } from '@nangohq/node'
import { AxiosResponse } from 'axios'

export class NangoApi {
  private api: Nango

  constructor() {
    this.initialize()
  }

  private initialize(): void {
    try {
      const apiKey = process.env.SERVER_NANGO_SECRET_KEY as string

      if (!apiKey) {
        console.log(
          `Set SERVER_NANGO_SECRET_KEY and PUBLIC_NANGO_KEY in your .env to activate Nango`,
        )
        return
      }

      this.api = new Nango({ secretKey: apiKey })

      console.log(`Nango is active`)
    } catch (error) {
      console.error(`Nango failed to start`)
    }
  }

  isActive(): boolean {
    if (this.api) {
      return true
    } else {
      return false
    }
  }

  async proxy(config: ProxyConfiguration): Promise<AxiosResponse<any, any>> {
    return this.api.proxy(config)
  }
}
