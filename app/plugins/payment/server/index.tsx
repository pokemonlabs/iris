import { BillingRouter } from './billing.router'
import { webhookStripeAction } from './payment.routes'

export namespace PaymentServer {
  export const trpcRouter = BillingRouter

  export const actionWebhookStripe = webhookStripeAction
}

export * from './payment.type'
