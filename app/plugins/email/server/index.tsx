import { EmailRouter } from './email.router'
import { EmailService } from './email.service'

export namespace EmailServer {
  export const service = EmailService

  export const trpcRouter = EmailRouter
}
