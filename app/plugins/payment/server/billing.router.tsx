import { Configuration } from '@/core/configuration'
import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { PaymentService } from './payment.service'

import { Organization } from '@prisma/client'

/**
 * @provider BillingApi
 * @description A api to query the billing API
 * @function {() => Promise<BillingProduct[]>} findManyProducts - Find many products
 * @function {() => Promise<BillingSubscription[]>} findManySubscriptions - Find many subscriptions
 * @function {() => Promise<BillingPayment[]>} findManyPayments - Find many payments
 * @function {(options: {productId: string}) => Promise<string>} createPaymentLink - Create a payment link for a product
 * @usage `const {data: products, isLoading} = api.billing.findManyProducts.useQuery({}); `
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */

export const BillingRouter = Trpc.createRouter({
  findManyProducts: Trpc.procedurePublic.input(z.object({})).query(async () => {
    checkStripeNotActive()

    return PaymentService.findManyProducts()
  }),

  findProductsByIds: Trpc.procedurePublic.input(z.object({ ids: z.array(z.string()) })).query(async ({ ctx, input }) => {
    checkStripeNotActive()

    return PaymentService.findProductsByIds(input.ids)
  }),

  findManyPayments: Trpc.procedure
    .input(
      z.object({
        organizationId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      checkStripeNotActive()

      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      let organization: Organization

      if (input.organizationId) {
        organization = await ctx.database.organization.findUniqueOrThrow({
          where: { id: input.organizationId },
        })
      }

      checkCustomerId(organization ?? user)

      return PaymentService.findManyPayments(user)
    }),

  findManySubscriptions: Trpc.procedure
    .input(
      z.object({
        organizationId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      checkStripeNotActive()

      const userId = ctx.session?.user?.id
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      let organization: Organization

      if (input.organizationId) {
        organization = await ctx.database.organization.findUniqueOrThrow({
          where: { id: input.organizationId },
        })
      }

      checkCustomerId(organization ?? user)

      return PaymentService.findManySubscriptions(organization ?? user)
    }),

  createPaymentLink: Trpc.procedure
    .input(
      z.object({
        productId: z.string(),

        organizationId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      checkStripeNotActive()
      const userId = ctx.session?.user?.id

      let user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
      })

      let organization: Organization

      if (input.organizationId) {
        organization = await ctx.database.organization.findUniqueOrThrow({
          where: { id: input.organizationId },
        })
      }

      let stripeCustomerId = PaymentService.getCustomerId(organization ?? user)

      if (!stripeCustomerId) {
        stripeCustomerId = await PaymentService.createCustomer(
          user,

          organization,
        )

        if (organization) {
          organization = await ctx.database.organization.update({
            where: { id: organization.id },
            data: { stripeCustomerId },
          })
        } else {
          user = await ctx.database.user.update({
            where: { id: user.id },
            data: { stripeCustomerId },
          })
        }
      }

      const urlRedirection = Configuration.getBaseUrl()

      const url = await PaymentService.createPaymentLink({
        user,

        organization,

        productId: input.productId,
        metadata: {
          userId: user.id,

          organizationId: organization?.id,
        },
        urlRedirection,
      })

      return { url }
    }),
})

const checkStripeNotActive = () => {
  if (!PaymentService.isActive()) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Stripe is not active',
    })
  }
}

const checkCustomerId = (customer: User | Organization) => {
  if (!PaymentService.getCustomerId(customer)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'No customer id',
    })
  }
}
