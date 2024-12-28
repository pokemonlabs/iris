import { UploadProviderAws } from './providers/aws/upload.provider.aws'
import { UploadProviderLocal } from './providers/local/upload.provider.local'
import {
  GetSignedUrlOptions,
  GetSignedUrlReturn,
  UploadProvider,
} from './providers/upload.provider'
import { UploadFileType } from './upload.type'

class Service {
  private instance: UploadProvider

  constructor() {}

  private async setup(): Promise<void> {
    if (this.instance) {
      return
    }

    try {
      console.log(`Trying using AWS...`)

      const instance = new UploadProviderAws()

      await instance.initialise()

      this.instance = instance
      return
    } catch (error) {
      console.warn(`Could not use AWS: ${error.message}`)
    }

    console.log(
      `Falling back on local provider (not recommended for production)`,
    )

    try {
      const instance = new UploadProviderLocal()

      await instance.initialise()

      this.instance = instance
      return
    } catch (error) {
      console.warn(`Could not use local provider: ${error.message}`)
    }
  }

  async uploadPublic(...files: UploadFileType[]): Promise<{ url: string }[]> {
    await this.setup()

    const responses = []

    for (const file of files) {
      const response = await this.instance.uploadPublic({ file })

      responses.push(response)
    }

    return responses
  }

  async uploadPrivate(...files: UploadFileType[]): Promise<{ url: string }[]> {
    await this.setup()

    const responses = []

    for (const file of files) {
      const response = await this.instance.uploadPrivate({ file })

      responses.push(response)
    }

    return responses
  }

  async fromPrivateToPublicUrl(
    ...items: { url: string; expiresInSeconds?: number }[]
  ): Promise<{ url: string }[]> {
    await this.setup()

    const responses = []

    for (const item of items) {
      const response = await this.instance.fromPrivateToPublicUrl(item)

      responses.push(response)
    }

    return responses
  }

  async getSignedUrl(
    options: GetSignedUrlOptions,
  ): Promise<GetSignedUrlReturn> {
    await this.setup()

    return this.instance.getSignedUrl(options)
  }
}

export const UploadService = new Service()
