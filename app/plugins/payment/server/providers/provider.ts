import {
  Payment,
  Product,
  StripeWebhookResponse,
  Subscription,
} from '../payment.type'

export type ProviderCreatePaymentLinkOptions = {
  customerId: string
  productId: string
  metadata?: Record<string, string>
  urlRedirection?: string
}

export interface Provider {
  findProductsByIds(ids: string[]): Product[] | PromiseLike<Product[]>
  createCustomer(customer: { email: string; name: string }): Promise<string>
  createPaymentLink(options: ProviderCreatePaymentLinkOptions): Promise<string>
  findManySubscriptions(customerId: string): Promise<Subscription[]>
  findManyPayments(customerId: string): Promise<Payment[]>
  findManyProducts(): Promise<Product[]>
  onPayment(body: Buffer, sig: string): Promise<StripeWebhookResponse>
  isActive(): boolean
}
