import { DateHelper } from '@/core/helpers/date'
import { UploadFileType } from '../upload.type'

export type UploadPrivateOptions = {
  file: UploadFileType
}

export type UploadPrivateReturn = {
  url: string
}

export type GetSignedUrlOptions = {
  key: string
  lifetimeSeconds?: number
}

export type GetSignedUrlReturn = {
  url: string
}

export type UploadPublicOptions = UploadPrivateOptions

export type UploadPublicReturn = UploadPrivateReturn

export type FromPrivateToPublicUrlOptions = {
  url: string
  expiresInSeconds?: number
}

export type FromPrivateToPublicUrlReturn = UploadPrivateReturn

export abstract class UploadProvider {
  abstract uploadPublic(
    options: UploadPublicOptions,
  ): Promise<UploadPublicReturn>
  abstract uploadPrivate(
    options: UploadPrivateOptions,
  ): Promise<UploadPrivateReturn>

  abstract fromPrivateToPublicUrl(
    options: FromPrivateToPublicUrlOptions,
  ): Promise<FromPrivateToPublicUrlReturn>

  abstract getSignedUrl(
    options: GetSignedUrlOptions,
  ): Promise<GetSignedUrlReturn>

  public initialise(): Promise<void> {
    return
  }

  protected ensureFilename(filenameBefore: string): string {
    const filenameClean = filenameBefore.replace(/[^\w.]/gi, '')
    const timestamp = DateHelper.getNow().getTime()

    return `${timestamp}-${filenameClean}`
  }
}
