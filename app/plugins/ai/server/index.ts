import { AiRouter } from './ai.router'
import { AiService } from './ai.service'

export namespace AiServer {
  export const service = AiService

  export const trpcRouter = AiRouter
}
