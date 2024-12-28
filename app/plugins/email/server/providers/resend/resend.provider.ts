import { Resend } from 'resend'
import { Provider, SendOptions } from '../provider'

export class ResendProvider implements Provider {
    private client: Resend

    constructor() {
        this.initialise()
    }

    private initialise() {
        try {
            const apiKey = process.env.RESEND_API_KEY

            if (!apiKey) {
                throw new Error('RESEND_API_KEY is not set in the environment variables')
            }

            this.client = new Resend(apiKey)

            console.log('Resend client is initialized')
        } catch (error) {
            console.error(`Resend failed to initialize: ${error.message}`)
        }
    }

    async send(options: SendOptions): Promise<void> {
        for (const to of options.to) {
            try {
                await this.client.emails.send({
                    from: `Iris <no-reply@tryiris.dev>`,
                    to: to.email,
                    subject: options.subject,
                    html: options.content,
                })
                console.log(`Email sent to ${to.email}`)
            } catch (error) {
                console.error(`Could not send email to ${to.email}`)
                console.error(error)
            }
        }
    }
}