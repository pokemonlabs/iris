import Mailjet from 'node-mailjet'
import { Provider, SendOptions } from '../provider'

export class MailjetProvider implements Provider {
  private client: Mailjet

  private templateIds: Record<string, number> = {}

  constructor() {
    this.initialise()
  }

  private initialise(): void {
    const isProduction = process.env.NODE_ENV === 'production'

    if (!isProduction) {
      console.warn(`Mailjet is disabled in development`)
      return
    }

    try {
      const apiKey = process.env.SERVER_EMAIL_MAILJET_API_KEY
      const secretKey = process.env.SERVER_EMAIL_MAILJET_SECRET_KEY

      if (!apiKey || !secretKey) {
        console.warn(
          `Set SERVER_EMAIL_MAILJET_API_KEY and SERVER_EMAIL_MAILJET_SECRET_KEY to activate Mailjet`,
        )
        return
      }

      this.client = new Mailjet({ apiKey, apiSecret: secretKey })

      console.log(`Mailjet service active`)
    } catch (error) {
      console.error(`Could not start Mailjet service`)
      console.error(error)
    }
  }

  async send(options: SendOptions): Promise<void> {
    const message = this.buildMessage(options)

    return this.client
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            ...message,
          },
        ],
      })
      .then(result => {
        console.log(`Emails sent`, result)
      })
      .catch(error => {
        console.error(`Could not send emails (${error.statusCode})`)
      })
  }

  private buildMessage(options: SendOptions): {
    From: { Email: string; Name: string }
    To: { Email: string; Name: string }[]
    Subject: string
    HTMLPart?: string
    Variables?: Record<string, any>
    TemplateLanguage?: boolean
    templateId?: number
  } {
    const from = {
      Email: 'no-reply@tryiris.dev',
      Name: 'Iris',
    }

    const to = options.to.map(item => ({ Email: item.email, Name: item.name }))

    const message = {
      From: from,
      To: to,
      Subject: options.subject,
      HTMLPart: undefined,
      Variables: undefined,
      TemplateLanguage: undefined,
      templateId: undefined,
    }

    if (options.templateId) {
      message.TemplateLanguage = true
      message.templateId = options.templateId
      message.Variables = options.variables
    } else {
      message.HTMLPart = options.content
    }

    return message
  }
}
