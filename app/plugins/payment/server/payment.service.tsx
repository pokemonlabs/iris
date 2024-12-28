import { User } from '@prisma/client'
import {
  Payment,
  Product,
  StripeWebhookResponse,
  Subscription,
} from './payment.type'
import { Provider } from './providers/provider'
import { StripeProvider } from './providers/stripe/stripe.provider'

import { Organization } from '@prisma/client'

class Service {

  async findProductsByIds(ids: string[]): Promise<Product[]> {
    return this.provider.findProductsByIds(ids)
  }

  private provider: Provider = new StripeProvider()

  isActive(): boolean {
    if (this.provider) {
      return this.provider?.isActive()
    }

    return false
  }

  getCustomerId(user: User | Organization): string {
    return user.stripeCustomerId
  }

  async findManyProducts(): Promise<Product[]> {
    return this.provider.findManyProducts()
  }

  async findManySubscriptions(
    customer: User | Organization,
  ): Promise<Subscription[]> {
    return this.provider.findManySubscriptions(this.getCustomerId(customer))
  }

  async findManyPayments(user: User): Promise<Payment[]> {
    return this.provider.findManyPayments(this.getCustomerId(user))
  }

  async createPaymentLink(options: {
    user: User

    organization: Organization

    productId: string
    metadata?: Record<string, string>
    urlRedirection?: string
  }): Promise<string> {
    const optionsPayment = {
      ...options,

      customerId: this.getCustomerId(options.organization ?? options.user),
    }

    return this.provider.createPaymentLink(optionsPayment)
  }

  async onPayment(body: Buffer, sig: string): Promise<StripeWebhookResponse> {
    return this.provider.onPayment(body, sig)
  }

  async createCustomer(
    customer: User,

    organization?: Organization,
  ): Promise<string> {
    return this.provider.createCustomer({
      name: organization?.name ?? customer.name ?? customer.email,

      email: customer.email,
    })
  }
}

class Singleton {
  static service = new Service()
}

export const PaymentService = Singleton.service
