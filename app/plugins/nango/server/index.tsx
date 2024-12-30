import { NangoRouter } from './nango.router'
import { NangoService } from './nango.service'

export namespace NangoServer {
  export const service = NangoService

  export const trpcRouter = NangoRouter
}
