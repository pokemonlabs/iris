import { Stripe as StripeSDK } from 'stripe'

export type Subscription = {
  productId: string
  dateExpired: string
  status: string
}

export type Payment = {
  productId: string
  amount: number
  currency: string
  date: string
}

export enum ProductType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  ONE_TIME = 'ONE_TIME',
}

export type Product = {
  id: string
  type: ProductType
  name: string
  price: number
  description: string
  interval?: string
  coverUrl?: string
  currency: string
  metadata: Record<string, string>
}

export type StripeWebhookResponse = {
  userId: string

  organizationId?: string

  stripeCustomerId: string
  metadata: Record<string, string>
  customerDetails?: StripeSDK.Checkout.Session.CustomerDetails
}
