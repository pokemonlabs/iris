import { UploadRouter } from './upload.router'
import { uploadPrivateAction, uploadPublicAction } from './upload.routes'
import { UploadService } from './upload.service'
import { UploadFileType } from './upload.type'

export namespace UploadServer {
  export type FileType = UploadFileType

  export const service = UploadService

  export const actionPrivate = uploadPrivateAction

  export const actionPublic = uploadPublicAction

  export const trpcRouter = UploadRouter
}
