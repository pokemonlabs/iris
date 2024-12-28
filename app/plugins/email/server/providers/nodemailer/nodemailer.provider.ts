import * as NodemailerSDK from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { Provider, SendOptions } from '../provider'

export class NodemailerProvider implements Provider {
  private client: Mail

  constructor() {
    this.initialise()
  }

  private initialise() {
    try {
      const host = process.env.SERVER_EMAIL_MAILPIT_HOST ?? 'localhost'

      const port = Number(process.env.SERVER_EMAIL_MAILPIT_PORT ?? 1022)

      this.client = NodemailerSDK.createTransport({
        host,
        port,
      })

      console.log(`Nodemailer is active (${host}:${port})`)
    } catch (error) {
      console.error(`Nodemailer failed to start: ${error.message}`)
    }
  }

  async send(options: SendOptions): Promise<void> {
    for (const to of options.to) {
      await this.client
        .sendMail({
          from: `Iris <no-reply@tryiris.dev>`,
          to: to.email,
          subject: options.subject,
          html: options.content,
        })
        .then(result => {
          console.log(`Emails sent`)
        })
        .catch(error => {
          console.error(`Could not send emails (${error.statusCode})`)
          console.error(error)
        })
    }
  }
}
