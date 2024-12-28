export type SendOptions = {
  subject: string
  content: string
  variables?: Record<string, any>
  templateId?: number // You can setup your template on mailjet directly and use it here
  to: {
    email: string
    name: string
  }[]
}

export interface Provider {
  send(options: SendOptions): Promise<void>
}
