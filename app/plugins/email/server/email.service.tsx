import { NodemailerProvider } from './providers/nodemailer/nodemailer.provider'
import { Provider } from './providers/provider'
import { ResendProvider } from './providers/resend/resend.provider'
import { TemplateBase } from './templates/base'
import { TemplateComponents } from './templates/components'
import { TemplateInvitationToOrganization } from './templates/invitationToOrganization'
import { TemplateResetPassword } from './templates/resetPassword'
import { TemplateStyle } from './templates/style'
import { TemplateVerificationCode } from './templates/verificationCode'
import { TemplateWelcome } from './templates/welcome'

const templates = {
  resetPassword: TemplateResetPassword,
  verificationCode: TemplateVerificationCode,
  welcome: TemplateWelcome,
  invitationToOrganization: TemplateInvitationToOrganization,
}

export type EmailTemplateKey = keyof typeof templates

type SendOptions = {
  name?: string
  email: string
  subject: string
  templateKey?: EmailTemplateKey
  content?: string
  variables?: Record<string, string>
}

export class Service {
  private provider: Provider

  public templates = templates

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production'

    if (isProduction) {
      this.provider = new ResendProvider()
    } else {
      this.provider = new NodemailerProvider()
    }
  }

  async send(options: SendOptions): Promise<void> {
    const content = templates[options.templateKey] ?? options.content

    const name = options.name ?? options.email

    const contentBuilt = this.getTemplate({
      content,
      variables: options.variables,
    })

    return this.provider
      .send({
        content: contentBuilt,
        to: [
          {
            name: name,
            email: options.email,
          },
        ],
        variables: options.variables,
        subject: options.subject,
      })
      .then(() => {
        console.log(`Email sent to ${options.email}`, options)
      })
  }

  getTemplate(options: {
    content: string
    variables: Record<string, string>
  }): string {
    const values = options.variables ?? { content: options.content }

    const contentBase = TemplateBase

    const contentCSS = TemplateStyle

    const contentTemplate = options.content

    let content = this.buildContent(contentTemplate, values)

    content = this.buildContent(contentBase, { style: contentCSS, content })

    content = this.buildComponents(content)

    return content
  }

  private buildContent(content: string, values: Record<string, any>): string {
    let contentBuilt = content

    for (const [key, value] of Object.entries(values)) {
      const token = new RegExp(`{{ ${key} }}`, 'g')

      contentBuilt = contentBuilt.replace(token, value)
    }

    return contentBuilt
  }

  private buildComponents(content: string): string {
    let contentUpdated = content

    for (const [key, value] of Object.entries(TemplateComponents)) {
      const tag = new RegExp(`${key}`, 'g')
      contentUpdated = contentUpdated.replace(tag, value)
    }

    return contentUpdated
  }
}

class Singleton {
  static service = new Service()
}

export const EmailService = Singleton.service
